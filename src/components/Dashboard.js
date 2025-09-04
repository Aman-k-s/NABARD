// src/components/Dashboard.js
import React, { useState } from 'react';

function Dashboard() {
  // Sample data - later this will come from Rakshit's backend
  const [farmerData, setFarmerData] = useState({
    farmerName: "राम सिंह / Ram Singh",
    farmArea: "2.5 hectares",
    awdStatus: "detected", // "detected" or "not-detected" 
    waterSaved: 1250, // liters
    methaneReduced: 45, // kg CO2 equivalent
    creditsEarned: 75, // carbon credits
    lastUpdated: "Today, 2:30 PM"
  });

  const getStatusColor = (status) => {
    return status === "detected" ? "#4caf50" : "#f44336";
  };

  const getStatusText = (status) => {
    if (status === "detected") {
      return {
        english: "✅ AWD Detected",
        hindi: "✅ AWD का पता चला"
      };
    } else {
      return {
        english: "❌ AWD Not Detected", 
        hindi: "❌ AWD का पता नहीं चला"
      };
    }
  };

  const downloadReport = () => {
    alert("Report download feature coming soon! / रिपोर्ट डाउनलोड फीचर जल्द आ रहा है!");
    // Later this will generate and download PDF report
  };

  return (
    <div style={{
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '20px'
    }}>
      
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '15px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        marginBottom: '25px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '32px',
          color: '#2e7d32',
          marginBottom: '10px'
        }}>
          🌾 Farm Dashboard
        </h1>
        <h2 style={{
          fontSize: '26px',
          color: '#2e7d32',
          marginBottom: '15px'
        }}>
          खेत का डैशबोर्ड
        </h2>
        <p style={{
          fontSize: '18px',
          color: '#666',
          marginBottom: '10px'
        }}>
          <strong>Farmer:</strong> {farmerData.farmerName}
        </p>
        <p style={{
          fontSize: '16px',
          color: '#666'
        }}>
          <strong>Farm Area:</strong> {farmerData.farmArea} | <strong>Last Updated:</strong> {farmerData.lastUpdated}
        </p>
      </div>

      {/* AWD Status Card */}
      <div style={{
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '15px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        marginBottom: '25px',
        border: `3px solid ${getStatusColor(farmerData.awdStatus)}`
      }}>
        <div style={{textAlign: 'center'}}>
          <h2 style={{
            fontSize: '28px',
            color: getStatusColor(farmerData.awdStatus),
            marginBottom: '10px'
          }}>
            {getStatusText(farmerData.awdStatus).english}
          </h2>
          <h3 style={{
            fontSize: '22px',
            color: getStatusColor(farmerData.awdStatus),
            marginBottom: '20px'
          }}>
            {getStatusText(farmerData.awdStatus).hindi}
          </h3>
          
          {farmerData.awdStatus === "detected" ? (
            <p style={{fontSize: '16px', color: '#333'}}>
              Great job! Your alternate wetting and drying practice has been detected by our satellite analysis.
              <br />
              बहुत बढ़िया! हमारे सैटेलाइट विश्लेषण द्वारा आपकी वैकल्पिक गीली और सूखी प्रथा का पता चला है।
            </p>
          ) : (
            <p style={{fontSize: '16px', color: '#333'}}>
              AWD practice not detected. Consider implementing alternate wetting and drying for better results.
              <br />
              AWD प्रथा का पता नहीं चला। बेहतर परिणामों के लिए वैकल्पिक गीली और सूखी प्रथा को लागू करने पर विचार करें।
            </p>
          )}
        </div>
      </div>

      {/* Statistics Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '25px'
      }}>
        
        {/* Water Saved Card */}
        <div style={{
          backgroundColor: 'white',
          padding: '25px',
          borderRadius: '15px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          textAlign: 'center',
          border: '2px solid #2196f3'
        }}>
          <div style={{fontSize: '48px', marginBottom: '15px'}}>💧</div>
          <h3 style={{fontSize: '24px', color: '#2196f3', marginBottom: '10px'}}>
            Water Saved
          </h3>
          <h4 style={{fontSize: '20px', color: '#2196f3', marginBottom: '15px'}}>
            पानी की बचत
          </h4>
          <p style={{fontSize: '32px', fontWeight: 'bold', color: '#333', marginBottom: '10px'}}>
            {farmerData.waterSaved.toLocaleString()} L
          </p>
          <p style={{fontSize: '14px', color: '#666'}}>
            This season / इस सीजन में
          </p>
        </div>

        {/* Methane Reduced Card */}
        <div style={{
          backgroundColor: 'white',
          padding: '25px',
          borderRadius: '15px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          textAlign: 'center',
          border: '2px solid #ff9800'
        }}>
          <div style={{fontSize: '48px', marginBottom: '15px'}}>🌱</div>
          <h3 style={{fontSize: '24px', color: '#ff9800', marginBottom: '10px'}}>
            Methane Reduced
          </h3>
          <h4 style={{fontSize: '20px', color: '#ff9800', marginBottom: '15px'}}>
            मीथेन में कमी
          </h4>
          <p style={{fontSize: '32px', fontWeight: 'bold', color: '#333', marginBottom: '10px'}}>
            {farmerData.methaneReduced} kg
          </p>
          <p style={{fontSize: '14px', color: '#666'}}>
            CO₂ equivalent / CO₂ के बराबर
          </p>
        </div>

        {/* Credits Earned Card */}
        <div style={{
          backgroundColor: 'white',
          padding: '25px',
          borderRadius: '15px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          textAlign: 'center',
          border: '2px solid #4caf50'
        }}>
          <div style={{fontSize: '48px', marginBottom: '15px'}}>💰</div>
          <h3 style={{fontSize: '24px', color: '#4caf50', marginBottom: '10px'}}>
            Credits Earned
          </h3>
          <h4 style={{fontSize: '20px', color: '#4caf50', marginBottom: '15px'}}>
            अर्जित क्रेडिट
          </h4>
          <p style={{fontSize: '32px', fontWeight: 'bold', color: '#333', marginBottom: '10px'}}>
            {farmerData.creditsEarned}
          </p>
          <p style={{fontSize: '14px', color: '#666'}}>
            Carbon credits / कार्बन क्रेडिट
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '15px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h3 style={{fontSize: '22px', color: '#2e7d32', marginBottom: '20px'}}>
          Actions / कार्य
        </h3>
        
        <div style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={downloadReport}
            style={{
              fontSize: '18px',
              padding: '15px 30px',
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            📄 Download Report
            <br />
            रिपोर्ट डाउनलोड करें
          </button>
          
          <button
            onClick={() => alert('Feature coming soon! / फीचर जल्द आ रहा है!')}
            style={{
              fontSize: '18px',
              padding: '15px 30px',
              backgroundColor: '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            📞 Contact Support
            <br />
            सहायता से संपर्क करें
          </button>
          
          <button
            onClick={() => alert('Refresh feature coming soon! / रिफ्रेश फीचर जल्द आ रहा है!')}
            style={{
              fontSize: '18px',
              padding: '15px 30px',
              backgroundColor: '#ff9800',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            🔄 Update Data
            <br />
            डेटा अपडेट करें
          </button>
        </div>
      </div>

      {/* Tips Section */}
      <div style={{
        backgroundColor: '#e8f5e8',
        padding: '20px',
        borderRadius: '10px',
        marginTop: '25px'
      }}>
        <h3 style={{fontSize: '20px', color: '#2e7d32', marginBottom: '15px'}}>
          💡 Tips for Better Results / बेहतर परिणामों के लिए सुझाव
        </h3>
        <ul style={{fontSize: '16px', color: '#333', textAlign: 'left'}}>
          <li>Keep fields dry for 3-5 days between irrigations / सिंचाई के बीच खेतों को 3-5 दिन सूखा रखें</li>
          <li>Take regular photos of your field / अपने खेत की नियमित तस्वीरें लें</li>
          <li>Record your irrigation schedule / अपना सिंचाई कार्यक्रम रिकॉर्ड करें</li>
          <li>Monitor water levels carefully / पानी के स्तर की सावधानी से निगरानी करें</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;