#parser.py 
#Parse cs2 demo files to get scoreboard stats
#uvicorn backend.parser:app --reload

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from demoparser2 import DemoParser
import pandas as pd
import os
import mysql.connector
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload/")
async def upload_demo(file: UploadFile = File(...)):
    #Create temp file to store demo file
    file_location = f"./cstemp/{file.filename}"
    os.makedirs("./cstemp", exist_ok=True)

    try:
        content = await file.read()

        await file.close()

        with open(file_location, "wb") as f:
            f.write(content)

        
        parser = DemoParser(file_location)

        event_names = parser.list_game_events()

        max_tick = parser.parse_event("round_end")["tick"].max()
        #Extract fields we want for our scoreboard
        fields = ["player_name", "kills_total", "deaths_total", "mvps", "headshot_kills_total", "3k_rounds_total", "4k_rounds_total", "ace_rounds_total", "team_name"]
        scoreboard_df = parser.parse_ticks(fields, ticks=[max_tick])
        result = scoreboard_df.to_dict(orient="records")

        #Cleanup
        if hasattr(parser, 'close'):
            parser.close()
        elif hasattr(parser, '__del__'):
            parser.__del__()
        del parser

        import gc
        gc.collect()

        import time
        time.sleep(0.5)

    finally:
        if os.path.exists(file_location):
            try:
                os.remove(file_location)
            except PermissionError:
                time.sleep(1)
                try:
                    os.remove(file_location)
                except PermissionError as e:
                    print(f"Failed to remove temporary file {file_location}: {e}")
                    with open("cleanup_files.txt", "a") as f:
                        f.write(f"{file_location}\n")

    return {"scoreboard": result}
