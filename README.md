# Counter-Strike 2 Demo Parser

A web application that parses CS2 demo files (.dem) and displays detailed match statistics in a clean, organized scoreboard format. Built with FastAPI, React, and TailwindCSS.

## Features

- Upload and parse CS2 demo files
- Display comprehensive match statistics including:
  - Kills/Deaths
  - K/D Ratio
  - MVP counts
  - Headshot percentage
  - Multi-kill rounds (3K, 4K, Aces)
- Team-based scoreboard organization
- Responsive design with TailwindCSS
- Real-time parsing status updates

## Prerequisites

### Backend Requirements
- Python 3.7+
- FastAPI
- uvicorn
- demoparser2
- pandas

### Frontend Requirements
- Node.js
- npm or yarn
- React
- Axios
- TailwindCSS

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd cs2-demo-parser
```

2. Install backend dependencies:
```bash
pip install fastapi uvicorn python-multipart demoparser2 pandas mysql-connector-python
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

## Project Structure

```
cs2-demo-parser/
├── backend/
│   └── parser.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── UploadComponent.js
│   │   │   └── Scoreboard.js
│   │   └── ...
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## Running the Application

1. Start the backend server:
```bash
cd backend
uvicorn parser:app --reload --port 8000
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## Usage

1. Open the application in your web browser
2. Click the file input button to select a CS2 demo file (.dem)
3. Click "Parse Demo" to process the file
4. View the parsed statistics in the scoreboard display

## API Endpoints

### POST /upload/
- Accepts multipart form data with a demo file
- Returns JSON containing match statistics:
  ```json
  {
    "scoreboard": [
      {
        "player_name": "string",
        "kills_total": number,
        "deaths_total": number,
        "mvps": number,
        "headshot_kills_total": number,
        "3k_rounds_total": number,
        "4k_rounds_total": number,
        "ace_rounds_total": number,
        "team_name": "string"
      }
    ]
  }
  ```

## Technical Details

### Backend Implementation
- FastAPI framework for API endpoints
- CORS middleware configured for localhost:3000
- Temporary file handling with cleanup
- Memory management for parser objects
- Error handling for file operations

### Frontend Implementation
- React for UI components
- Axios for API requests
- TailwindCSS for styling
- Responsive design
- Loading states and error handling
- Sort functionality for player statistics

### Scoreboard Features
- Team-based organization
- Automatic calculation of:
  - K/D ratio
  - Headshot percentage
- Sorted player list by kills
- Alternating row colors for readability

## Error Handling

The application includes error handling for:
- Missing demo files
- Invalid file formats
- Parser failures
- Network issues
- File system operations

## Performance Considerations

- Temporary file cleanup
- Garbage collection after parsing
- Async file handling
- Efficient memory management

## Known Issues

- Temporary files may occasionally require manual cleanup
- Large demo files may take longer to process

## Future Improvements

- Additional match statistics
- Match timeline visualization
- Round-by-round breakdown
- Player position heatmaps
- Export functionality for statistics
