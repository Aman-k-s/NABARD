import React, { useState } from 'react';

function PhotoUpload() {
  const [selectedPhotos, setSelectedPhotos] = useState([]); // store multiple files
  const [previewUrls, setPreviewUrls] = useState([]); // store preview URLs

  const handlePhotoSelect = (event) => {
    const files = Array.from(event.target.files); // get all selected files
    const imageFiles = files.filter(file => file.type.startsWith('image/'));

    if (imageFiles.length === 0) {
      alert('Please select only image files! / कृपया केवल इमेज फाइल चुनें!');
      return;
    }

    setSelectedPhotos(imageFiles);
    const urls = imageFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);

    // Log selected photos to console
    imageFiles.forEach(file => console.log('Photo selected:', file.name));
  };

  const handleUpload = () => {
    if (selectedPhotos.length === 0) {
      alert('Please select a photo first! / पहले फोटो चुनें!');
      return;
    }

    selectedPhotos.forEach(file => {
      console.log('Uploading photo:', file.name); // temporary, frontend-only
    });

    alert(`${selectedPhotos.length} photo(s) uploaded successfully! / फोटो सफलतापूर्वक अपलोड हो गई!`);

    // Reset after upload
    setSelectedPhotos([]);
    setPreviewUrls([]);
  };

  const resetPhotos = () => {
    setSelectedPhotos([]);
    setPreviewUrls([]);
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '30px',
      backgroundColor: 'white',
      borderRadius: '15px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      textAlign: 'center'
    }}>
      <h2 style={{ fontSize: '28px', color: '#2e7d32', marginBottom: '10px' }}>📸 Upload Field Photo</h2>
      <h3 style={{ fontSize: '22px', color: '#2e7d32', marginBottom: '30px' }}>खेत की तस्वीर अपलोड करें</h3>

      {/* Upload Area */}
      <div style={{
        border: '3px dashed #4caf50',
        borderRadius: '15px',
        padding: '40px',
        marginBottom: '20px',
        backgroundColor: '#f9f9f9',
        cursor: 'pointer'
      }}
      onClick={() => document.getElementById('photo-input').click()}>
        {previewUrls.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {previewUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Selected ${index + 1}`}
                style={{ maxWidth: '150px', maxHeight: '150px', borderRadius: '10px' }}
              />
            ))}
          </div>
        ) : (
          <div>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>📷</div>
            <p style={{ fontSize: '20px', color: '#666', marginBottom: '10px' }}>Click here to select photos</p>
            <p style={{ fontSize: '18px', color: '#666' }}>फोटो चुनने के लिए यहाँ क्लिक करें</p>
          </div>
        )}
      </div>

      <input
        id="photo-input"
        type="file"
        accept="image/*"
        multiple
        onChange={handlePhotoSelect}
        style={{ display: 'none' }}
      />

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {selectedPhotos.length > 0 && (
          <button
            onClick={resetPhotos}
            style={{
              fontSize: '18px',
              padding: '15px 30px',
              backgroundColor: '#ff9800',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer'
            }}
          >
            🔄 Choose Different Photos
            <br />
            दूसरी फोटो चुनें
          </button>
        )}
        
        <button
          onClick={handleUpload}
          disabled={selectedPhotos.length === 0}
          style={{
            fontSize: '18px',
            padding: '15px 30px',
            backgroundColor: selectedPhotos.length > 0 ? '#4caf50' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: selectedPhotos.length > 0 ? 'pointer' : 'not-allowed'
          }}
        >
          ⬆️ Upload Photo
          <br />
          फोटो अपलोड करें
        </button>
      </div>
    </div>
  );
}

export default PhotoUpload;

