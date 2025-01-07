// App.js
import React from 'react';
import './index.css';
import UploadComponent from './UploadComponent';

function App() {

  return (
    <div className="min-h-screen bg-gray-100">
    <header className="bg-gray-800 text-white py-4 mb-8">
      <h1 className="text-3xl font-bold text-center">CS2 Match Parser</h1>
    </header>
    <UploadComponent />
  </div>
  );
}

export default App;