# Chemical Equipment Parameter Visualizer (Hybrid Web + Desktop App)

### 🚀 Submission Details
* **Git Repository:** https://github.com/masterwayne22/chemviz
* **Live Web Deployment:**https://chemviz-smoky.vercel.app/


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

## 📂 Folder Structure
* `backend/` - Django server logic, API endpoints, and SQLite database.
* `frontend-web/` - React.js source code for the browser-based dashboard.
* `frontend-desktop/` - PyQt5 script for the desktop analytics tool.
* `requirements.txt` - Python dependencies for the entire ecosystem.
