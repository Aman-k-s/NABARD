// src/components/FarmerWelcome.js
import React from 'react';

function FarmerWelcome() {
  return (
    <div style={{
      textAlign: 'center',
      padding: '30px',
      backgroundColor: '#f0f8ff',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{
        fontSize: '36px',
        color: '#2e7d32',
        marginBottom: '10px'
      }}>
        🌾 Welcome Farmer!
      </h1>
      
      <h2 style={{
        fontSize: '28px',
        color: '#2e7d32',
        marginBottom: '30px'
      }}>
        किसान का स्वागत है!
      </h2>
      
      <p style={{
        fontSize: '20px',
        color: '#333',
        marginBottom: '40px',
        maxWidth: '600px',
        margin: '0 auto 40px auto'
      }}>
        Track your farm's carbon credits and water savings easily!
        <br />
        अपने खेत के कार्बन क्रेडिट और पानी की बचत को आसानी से ट्रैक करें!
      </p>

      <button style={{
        fontSize: '24px',
        padding: '20px 40px',
        backgroundColor: '#4caf50',
        color: 'white',
        border: 'none',
        borderRadius: '15px',
        cursor: 'pointer',
        marginBottom: '20px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
      }}
      onClick={() => alert('Hello Farmer! Button clicked!')}>
        Start Carbon Credit Check
        <br />
        कार्बन क्रेडिट चेक शुरू करें
      </button>

      <div style={{
        marginTop: '40px',
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        maxWidth: '800px',
        margin: '40px auto'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          margin: '10px',
          minWidth: '200px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{color: '#2e7d32'}}>🗺️ Map Your Farm</h3>
          <p>Draw your farm boundaries</p>
        </div>
        
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          margin: '10px',
          minWidth: '200px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{color: '#2e7d32'}}>📸 Upload Photos</h3>
          <p>Share your field pictures</p>
        </div>
        
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          margin: '10px',
          minWidth: '200px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{color: '#2e7d32'}}>💰 Earn Credits</h3>
          <p>Get carbon credit reports</p>
        </div>
      </div>
    </div>
  );
}

export default FarmerWelcome;