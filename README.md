# RiceLens MRV Prototype

Watch the demo here
https://www.youtube.com/watch?v=MSSX_BMwALo

---
A satellite-first, farmer-centric platform for monitoring methane emission reductions from rice paddies through automated Alternate Wetting and Drying (AWD) verification.

## Overview

RiceLens MRV transforms carbon credit verification for smallholder rice farmers by leveraging satellite monitoring and transparent data sharing. Farmers geo-fence their fields, upload geotagged photos, and access real-time satellite insights including water levels (NDWI), crop health indices (NDVI/EVI/SAVI), soil moisture, rainfall, and temperature data.

## Key Features

- **Satellite-Based Monitoring**: Automated AWD detection using Sentinel-2 imagery via Google Earth Engine
- **Transparent Reporting**: Real-time dashboard showing all satellite analytics, empowering farmers as active partners
- **Carbon Credit Generation**: Automated VM0051-compliant evidence bundles for registry submission
- **Anti-Fraud Architecture**: Satellite-primary verification eliminates data manipulation incentives

## Impact

- **Cost Reduction**: Verification costs drop from $5-12/tCO₂e to under $2/tCO₂e
- **Scalability**: Cloud-based processing can monitor millions of hectares simultaneously  
- **Climate Benefits**: AWD adoption can reduce methane emissions by 2.1 million tCO₂e annually while conserving 30% irrigation water

---
This project has a **separate frontend and backend** setup:

* **Frontend**: React app (`mrv-frontend`)
* **Backend**: Django REST API (`mrv-backend`) using Google Earth Engine



## Frontend Setup

1. Open a terminal and navigate to the frontend directory:

```bash
cd mrv-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the React development server:

```bash
npm start
```

The frontend should now be running on [http://localhost:3000](http://localhost:3000).

---

## Backend Setup

1. Open a **new terminal** and navigate to the backend directory:

```bash
cd mrv-backend
```

2. Install Python dependencies:

```bash
pip install -r requirements.txt
```

3. **Authenticate Google Earth Engine** (one-time setup):

```bash
earthengine authenticate
```

Follow the instructions to allow access.

4. Start the Django server:

```bash
python manage.py runserver
```

The backend should now be running on [http://localhost:8000](http://localhost:8000).

---

## Notes

* Make sure you have **Node.js** installed for the frontend and **Python 3.8+** for the backend.
* The backend requires a **Google Earth Engine account** to function.
