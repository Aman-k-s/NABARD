# MRV Prototype

Watch the demo here
https://www.youtube.com/watch?v=MSSX_BMwALo

---
This project has a **separate frontend and backend** setup:

* **Frontend**: React app (`mrv-frontend`)
* **Backend**: Django REST API (`mrv-backend`) using Google Earth Engine

---

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
