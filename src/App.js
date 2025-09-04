// src/App.js
import React, { useState } from 'react';
import FarmerWelcome from './components/FarmerWelcome';
import PhotoUpload from './components/PhotoUpload';
import Dashboard from './components/Dashboard';
import FarmMap from './components/FarmMap';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('welcome');

  const showWelcome = () => setCurrentPage('welcome');
  const showPhotoUpload = () => setCurrentPage('photo');
  const showDashboard = () => setCurrentPage('dashboard');
  const showMap = () => setCurrentPage('map');

  return (
    <div className="App">
      {/* Navigation */}
      <div style={{
        backgroundColor: '#2e7d32',
        padding: '15px',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <button 
          onClick={showWelcome}
          style={{
            padding: '10px 15px',
            backgroundColor: currentPage === 'welcome' ? '#4caf50' : 'white',
            color: currentPage === 'welcome' ? 'white' : '#2e7d32',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          🏠 Home
        </button>
        
        <button 
          onClick={showMap}
          style={{
            padding: '10px 15px',
            backgroundColor: currentPage === 'map' ? '#4caf50' : 'white',
            color: currentPage === 'map' ? 'white' : '#2e7d32',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          🗺️ Draw Farm
        </button>
        
        <button 
          onClick={showPhotoUpload}
          style={{
            padding: '10px 15px',
            backgroundColor: currentPage === 'photo' ? '#4caf50' : 'white',
            color: currentPage === 'photo' ? 'white' : '#2e7d32',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          📸 Upload Photo
        </button>

        <button 
          onClick={showDashboard}
          style={{
            padding: '10px 15px',
            backgroundColor: currentPage === 'dashboard' ? '#4caf50' : 'white',
            color: currentPage === 'dashboard' ? 'white' : '#2e7d32',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          📊 Dashboard
        </button>
      </div>

      {/* Content */}
      <div style={{backgroundColor: '#f0f8ff', minHeight: '100vh', padding: '20px'}}>
        {/* Debug info - remove this later */}
        
        
        {currentPage === 'welcome' && <FarmerWelcome />}
        {currentPage === 'map' && <FarmMap />}
        {currentPage === 'photo' && <PhotoUpload />}
        {currentPage === 'dashboard' && <Dashboard />}
        
        {/* Fallback - if no page matches */}
        {!['welcome', 'map', 'photo', 'dashboard'].includes(currentPage) && (
          <div style={{textAlign: 'center', padding: '50px'}}>
            <h2>Page not found: {currentPage}</h2>
            <button onClick={showWelcome}>Go to Home</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;