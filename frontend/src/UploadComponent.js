// UploadComponent.js
import React, { useState } from 'react';
import axios from 'axios';
import Scoreboard from './components/Scoreboard';

const UploadComponent = () => {
    const [file, setFile] = useState(null);
    const [stats, setStats] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError(null); 
    };

    const handleParse = async () => {
        if (!file) {
            setError("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://127.0.0.1:8000/upload/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setStats(response.data.scoreboard);
        } catch (err) {
            console.error("Error:", err);
            setError("Failed to parse the demo file. " + (err.response?.data?.detail || err.message));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <input 
                    type="file" 
                    onChange={handleFileChange} 
                    accept=".dem"
                    className="bg-white p-2 rounded border"
                />
                <button 
                    onClick={handleParse} 
                    disabled={isLoading || !file}
                    className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed
                        ${isLoading ? 'opacity-50 cursor-wait' : ''}`}
                >
                    {isLoading ? 'Parsing...' : 'Parse Demo'}
                </button>
            </div>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            {stats && <Scoreboard stats={stats} />}
        </div>
    );
};

export default UploadComponent;