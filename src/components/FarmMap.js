// src/components/FarmMap.js
import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Polyline,
  CircleMarker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as turf from "@turf/turf";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import L from "leaflet";


// Component to handle map clicks
function MapClickHandler({ onMapClick, isDrawing }) {
  useMapEvents({
    click(e) {
      if (isDrawing) {
        onMapClick(e.latlng);
      }
    },
  });
  return null;
}

// Outside FarmMap
function MapTypeControl({ mapType, setMapType }) {
  const map = useMap();

  React.useEffect(() => {
    const CustomControl = L.Control.extend({
      onAdd: function () {
        const div = L.DomUtil.create("div", "leaflet-bar leaflet-control");
        div.style.backgroundColor = "white";
        div.style.padding = "5px 10px";
        div.style.cursor = "pointer";
        div.style.borderRadius = "5px";
        div.style.fontSize = "14px";
        div.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
        div.style.marginTop = "50px";

        div.innerHTML =
          mapType === "street" ? "🛰️ Satellite View" : "🌍 Street View";
        div.onclick = () => setMapType(mapType === "street" ? "satellite" : "street");
        L.DomEvent.disableClickPropagation(div);
        return div;
      },
      onRemove: function () {},
    });

    const control = new CustomControl({ position: "topleft" });
    map.addControl(control);

    return () => map.removeControl(control);
  }, [map, mapType, setMapType]);

  return null;
}


function FarmMap() {
  const [farmPolygon, setFarmPolygon] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [farmArea, setFarmArea] = useState(0);
  const [mapType, setMapType] = useState("street");

  // Center map on India (you can change this to your region)
  const centerPosition = [28.6139, 77.209]; // Delhi coordinates

  // Pre-defined demo farm for testing
  const demoFarm = [
    [28.6139, 77.209],
    [28.6149, 77.21],
    [28.6159, 77.209],
    [28.6149, 77.208],
  ];

  const handleMapClick = (latlng) => {
    if (isDrawing) {
      const newPoint = [latlng.lat, latlng.lng];
      const newPolygon = [...farmPolygon, newPoint];
      setFarmPolygon(newPolygon);

      if (newPolygon.length >= 3) {
        const coords = [...newPolygon.map((p) => [p[1], p[0]])];
        coords.push(coords[0]);
        const turfPoly = turf.polygon([coords]);
        const areaSqMeters = turf.area(turfPoly);
        setFarmArea((areaSqMeters / 10000).toFixed(2));
      }
    }
  };

  function SearchControl() {
    const map = useMap();

    React.useEffect(() => {
      const provider = new OpenStreetMapProvider();
      const searchControl = new GeoSearchControl({
        provider,
        style: "bar",
        autoClose: true,
        keepResult: true,
      });
      map.addControl(searchControl);
      return () => map.removeControl(searchControl);
    }, [map]);

    return null;
  }

  const startDrawing = () => {
    setIsDrawing(true);
    setFarmPolygon([]);
    setFarmArea(0);
  };

  const finishDrawing = () => {
    if (farmPolygon.length >= 3) {
      setIsDrawing(false);

      // Convert polygon to [lng, lat] format for turf
      const coords = [...farmPolygon.map((p) => [p[1], p[0]])];
      coords.push(coords[0]); // close polygon

      const turfPoly = turf.polygon([coords]);
      const areaSqMeters = turf.area(turfPoly);

      // Convert to hectares (1 hectare = 10,000 m²)
      const areaHa = (areaSqMeters / 10000).toFixed(2);

      setFarmArea(areaHa);
    } else {
      alert(
        "Please click at least 3 points to create a farm boundary! / कम से कम 3 बिंदु क्लिक करें!"
      );
    }
  };

  const clearFarm = () => {
    setFarmPolygon([]);
    setIsDrawing(false);
    setFarmArea(0);
  };

  const loadDemoFarm = () => {
    setFarmPolygon(demoFarm);
    setIsDrawing(false);
    setFarmArea(2.5);
  };

  const saveFarm = () => {
    if (farmPolygon.length >= 3) {
      const farmData = {
        coordinates: farmPolygon,
        area: farmArea,
        timestamp: new Date().toISOString(),
      };

      console.log("Farm data to send to backend:", farmData);
      alert(
        `Farm boundary saved! Area: ${farmArea} hectares / खेत की सीमा सेव हो गई! क्षेत्रफल: ${farmArea} हेक्टेयर`
      );

      // Here you'll later send to Rakshit's backend
    } else {
      alert("Please draw a farm boundary first! / पहले खेत की सीमा बनाएं!");
    }
  };

  // Remove the last point
  const undoLastPoint = () => {
    if (farmPolygon.length > 0) {
      const newPolygon = farmPolygon.slice(0, -1);
      setFarmPolygon(newPolygon);
    }
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          marginBottom: "25px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            color: "#2e7d32",
            marginBottom: "10px",
          }}
        >
          🗺️ Draw Your Farm
        </h1>
        <h2
          style={{
            fontSize: "26px",
            color: "#2e7d32",
            marginBottom: "15px",
          }}
        >
          अपना खेत बनाएं
        </h2>
        <p
          style={{
            fontSize: "16px",
            color: "#666",
          }}
        >
          Click on the map to draw your farm boundaries / नक्शे पर क्लिक करके
          अपने खेत की सीमा बनाएं
        </p>
      </div>

      {/* Instructions */}
      <div
        style={{
          backgroundColor: "#e3f2fd",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h3
          style={{ fontSize: "18px", color: "#1976d2", marginBottom: "10px" }}
        >
          📋 How to draw your farm / अपना खेत कैसे बनाएं:
        </h3>
        <ol style={{ fontSize: "14px", color: "#333", textAlign: "left" }}>
          <li>
            Click "Start Drawing" button / "ड्रॉइंग शुरू करें" बटन पर क्लिक करें
          </li>
          <li>
            Click on map points to create farm boundary (real-time) / खेत की
            सीमा बनाने के लिए नक्शे पर बिंदु क्लिक करें (वास्तविक समय में)
          </li>
          <li>
            Use "Undo Last Point" to remove mistakes / गलती हटाने के लिए "अंतिम
            बिंदु पूर्ववत करें" का उपयोग करें
          </li>
          <li>
            Click "Finish Drawing" when done / पूरा होने पर "ड्रॉइंग समाप्त
            करें" क्लिक करें
          </li>
          <li>Save your farm boundary / अपने खेत की सीमा सेव करें</li>
        </ol>
      </div>

      {/* Control Buttons */}
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "15px",
          }}
        >
          <button
            onClick={startDrawing}
            disabled={isDrawing}
            style={{
              fontSize: "16px",
              padding: "12px 24px",
              backgroundColor: isDrawing ? "#ccc" : "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: isDrawing ? "not-allowed" : "pointer",
            }}
          >
            🖊️ Start Drawing
            <br />
            ड्रॉइंग शुरू करें
          </button>

          <button
            onClick={undoLastPoint}
            disabled={!isDrawing || farmPolygon.length === 0}
            style={{
              fontSize: "16px",
              padding: "12px 24px",
              backgroundColor:
                !isDrawing || farmPolygon.length === 0 ? "#ccc" : "#2196f3",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor:
                !isDrawing || farmPolygon.length === 0
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            ↶ Undo Last Point
            <br />
            अंतिम बिंदु पूर्ववत करें
          </button>

          <button
            onClick={finishDrawing}
            disabled={!isDrawing || farmPolygon.length < 3}
            style={{
              fontSize: "16px",
              padding: "12px 24px",
              backgroundColor:
                !isDrawing || farmPolygon.length < 3 ? "#ccc" : "#ff9800",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor:
                !isDrawing || farmPolygon.length < 3
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            ✅ Finish Drawing
            <br />
            ड्रॉइंग समाप्त करें
            {farmPolygon.length > 0 && ` (${farmPolygon.length} points)`}
          </button>

          <button
            onClick={clearFarm}
            style={{
              fontSize: "16px",
              padding: "12px 24px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            🗑️ Clear Farm
            <br />
            साफ़ करें
          </button>

          <button
            onClick={loadDemoFarm}
            style={{
              fontSize: "16px",
              padding: "12px 24px",
              backgroundColor: "#9c27b0",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            🌾 Demo Farm
            <br />
            डेमो खेत
          </button>
        </div>

        {/* Status Info */}
        <div style={{ fontSize: "14px", color: "#666" }}>
          <p
            style={{
              padding: "10px",
              backgroundColor: isDrawing ? "#ffebee" : "#e8f5e8",
              borderRadius: "8px",
              border: isDrawing ? "2px solid #ff5722" : "2px solid #4caf50",
            }}
          >
            <strong>Status:</strong>{" "}
            {isDrawing
              ? "🖊️ Drawing Mode Active - Click on map to add points"
              : "✅ Ready to Draw"}{" "}
            |<strong> Points:</strong> {farmPolygon.length} |
            <strong> Area:</strong> {farmArea} hectares
          </p>
          <p
            style={{
              padding: "10px",
              backgroundColor: isDrawing ? "#ffebee" : "#e8f5e8",
              borderRadius: "8px",
              border: isDrawing ? "2px solid #ff5722" : "2px solid #4caf50",
              marginTop: "5px",
            }}
          >
            <strong>स्थिति:</strong>{" "}
            {isDrawing
              ? "🖊️ ड्रॉइंग मोड सक्रिय - बिंदु जोड़ने के लिए नक्शे पर क्लिक करें"
              : "✅ ड्रॉ करने के लिए तैयार"}{" "}
            |<strong> बिंदु:</strong> {farmPolygon.length} |
            <strong> क्षेत्रफल:</strong> {farmArea} हेक्टेयर{" "}
            {farmArea > 0 && `(${(farmArea * 2.47105).toFixed(2)} एकड़)`}
          </p>
        </div>
      </div>

      {/* Map Container */}
      <div
        style={{
          height: "500px",
          width: "100%",
          border: "3px solid #4caf50",
          borderRadius: "10px",
          overflow: "hidden",
          marginBottom: "20px",
        }}
      >
        

        <MapContainer
          center={centerPosition}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <SearchControl />
          <MapTypeControl mapType={mapType} setMapType={setMapType} />


          
          {mapType === "street" ? (
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          ) : (
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles © Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye"
            />
          )}

          <MapClickHandler onMapClick={handleMapClick} isDrawing={isDrawing} />

          {/* Render individual points as markers */}
          {farmPolygon.map((point, index) => (
            <CircleMarker
              key={index}
              center={point}
              radius={6}
              pathOptions={{
                color: "#ffffff",
                fillColor: isDrawing ? "#ff5722" : "#4caf50",
                fillOpacity: 1,
                weight: 2,
              }}
            />
          ))}

          {/* Render connecting lines between points */}
          {farmPolygon.length >= 2 && (
            <Polyline
              positions={farmPolygon}
              pathOptions={{
                color: isDrawing ? "#ff5722" : "#4caf50",
                weight: 3,
                opacity: 0.8,
                dashArray: isDrawing ? "10, 5" : null,
              }}
            />
          )}

          {/* Render filled polygon only when drawing is finished and we have 3+ points */}
          {!isDrawing && farmPolygon.length >= 3 && (
            <Polygon
              positions={farmPolygon}
              pathOptions={{
                color: "#4caf50",
                fillColor: "#4caf50",
                fillOpacity: 0.2,
                weight: 3,
              }}
            />
          )}

          {/* Show a preview line from last point to close the polygon when drawing */}
          {isDrawing && farmPolygon.length >= 3 && (
            <Polyline
              positions={[farmPolygon[farmPolygon.length - 1], farmPolygon[0]]}
              pathOptions={{
                color: "#ff5722",
                weight: 2,
                opacity: 0.5,
                dashArray: "5, 10",
              }}
            />
          )}
        </MapContainer>
      </div>

      {/* Save Button */}
      {farmPolygon.length >= 3 && !isDrawing && (
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <button
            onClick={saveFarm}
            style={{
              fontSize: "20px",
              padding: "15px 40px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            💾 Save Farm Boundary
            <br />
            खेत की सीमा सेव करें
          </button>
        </div>
      )}

      {/* Real-time Drawing Tip */}
      {isDrawing && (
        <div
          style={{
            backgroundColor: "#fff3e0",
            padding: "15px",
            borderRadius: "8px",
            marginTop: "15px",
            border: "2px solid #ff9800",
          }}
        >
          <h4
            style={{ fontSize: "16px", color: "#f57c00", marginBottom: "8px" }}
          >
            🎯 Real-time Drawing Active! / वास्तविक समय ड्रॉइंग सक्रिय!
          </h4>
          <p style={{ fontSize: "14px", color: "#333", margin: 0 }}>
            • Click anywhere on the map to add points instantly / तुरंत बिंदु
            जोड़ने के लिए नक्शे पर कहीं भी क्लिक करें
            <br />
            • Points and lines appear immediately / बिंदु और रेखाएं तुरंत दिखाई
            देती हैं
            <br />
            • Use "Undo" to remove the last point / अंतिम बिंदु हटाने के लिए
            "पूर्ववत करें" का उपयोग करें
            <br />• Need at least 3 points to finish / समाप्त करने के लिए कम से
            कम 3 बिंदुओं की आवश्यकता है
          </p>
        </div>
      )}

      {/* Coordinates Display */}
      {farmPolygon.length > 0 && (
        <div
          style={{
            backgroundColor: "#f5f5f5",
            padding: "15px",
            borderRadius: "8px",
            marginTop: "15px",
          }}
        >
          <h4 style={{ fontSize: "16px", color: "#333", marginBottom: "10px" }}>
            Farm Coordinates / खेत के निर्देशांक: ({farmPolygon.length} points)
          </h4>
          <div
            style={{
              fontSize: "12px",
              color: "#666",
              maxHeight: "120px",
              overflow: "auto",
            }}
          >
            {farmPolygon.map((point, index) => (
              <div
                key={index}
                style={{
                  padding: "2px 0",
                  backgroundColor:
                    index === farmPolygon.length - 1 && isDrawing
                      ? "#ffebee"
                      : "transparent",
                }}
              >
                Point {index + 1}: [{point[0].toFixed(6)}, {point[1].toFixed(6)}
                ]{index === farmPolygon.length - 1 && isDrawing && " ← Latest"}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FarmMap;
