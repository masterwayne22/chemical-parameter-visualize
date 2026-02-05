# Chemical Equipment Parameter Visualizer (Hybrid Web + Desktop App)

### 🚀 Submission Details
* **Git Repository:** https://github.com/masterwayne22/chemviz
* **Live Web link:**http://localhost:5173/


---

## 📝 Project Overview
This is a **Hybrid Application** developed for the FOSSEE Internship screening task. It provides a unified dashboard for chemical engineers to visualize equipment data (Flowrate, Pressure, Temperature) across both Web and Desktop platforms using a shared Django REST API.

## ✨ Key Features
* **CSV Data Processing:** Robust parsing of chemical equipment datasets using **Pandas**.
* **Hybrid Dashboard:** * **Web:** Interactive React.js interface with **Chart.js** visualizations.
    * **Desktop:** Standalone PyQt5 application with **Matplotlib** integration.
* **History Management:** Automatic tracking of the last 5 uploaded datasets using an **SQLite** database.
* **Data Insights:** Automated calculation of total equipment counts, parameter averages, and type distributions.
* **Reporting:** Capability to generate PDF summaries of processed equipment data.

## 🛠️ Tech Stack
* **Backend:** Python Django, Django REST Framework (DRF)
* **Web Frontend:** React.js, Tailwind CSS, Chart.js
* **Desktop Frontend:** Python, PyQt5, Matplotlib
* **Data Analysis:** Pandas, NumPy
* **Database:** SQLite

* ⚙️ Installation & Setup Instructions
1. Prerequisites
Python 3.10+ installed.

Node.js (v18+) and npm installed.

Git for cloning the repository.

2. Backend Setup (Django)
Navigate to the backend directory: cd backend

Create a virtual environment: python -m venv venv

Activate the virtual environment:

Windows: venv\Scripts\activate

Mac/Linux: source venv/bin/activate

Install dependencies: pip install -r ../requirements.txt

Run migrations: python manage.py migrate

Start the server: python manage.py run server

The API will be available at http://127.0.0.1:8000/

3. Web Frontend Setup (React + Vite)
Open a new terminal and navigate to the web folder: cd frontend-web

Install packages: npm install

Start the development server: npm run dev

Open your browser to http://localhost:8080/ (or the port shown in your terminal).

4. Desktop Frontend Setup (PyQt5)
Ensure your Python virtual environment is still active.

Navigate to the desktop folder: cd frontend-desktop

Run the application: python main.py

Note: Ensure the Django backend is running simultaneously for the desktop app to fetch data

## 📂 Folder Structure
* `backend/` - Django server logic, API endpoints, and SQLite database.
* `frontend-web/` - React.js source code for the browser-based dashboard.
* `frontend-desktop/` - PyQt5 script for the desktop analytics tool.
* `requirements.txt` - Python dependencies for the entire ecosystem.
