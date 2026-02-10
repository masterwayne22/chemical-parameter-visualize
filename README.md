⚗️ ChemViz — Industrial Parameter Visualization Platform

FOSSEE Internship Screening Task | IIT Bombay (2026)

A hybrid web + desktop scientific visualization system for analyzing industrial equipment parameters from structured datasets.

🚀 Live Demo
🌐 Web Dashboard (Cloudflare Pages)

👉 https://chemviz-aen.pages.dev/

⚠️ Deployment Note

The web dashboard is deployed on Cloudflare Pages as a static frontend demo.

The Django REST analytics backend is not publicly deployed due to free hosting constraints.

Full CSV processing and API-based computations require running the backend locally.

Earlier Netlify deployment was suspended due to free-tier limits. This Cloudflare link is the final working deployment.

📂 Source Code

👉 https://github.com/masterwayne22/chemviz

🧠 Project Overview

ChemViz is a unified data visualization and analytics platform designed for:

🎓 Chemical Engineering students

🔬 Researchers

🏭 Industrial dataset analysis

The system provides:

✅ Centralized Python backend for data processing & analytics

✅ High-performance web dashboard for visualization

✅ Native desktop application for offline monitoring

🎯 Goal:
Reduce dependency on proprietary industrial visualization tools and provide an open-source, extensible scientific analytics framework.

🏗️ System Architecture
📥 CSV Dataset Upload
        ↓
🧠 Django REST Analytics API
        ↓
React Web Dashboard   |   PyQt5 Desktop Client

🛠️ Tech Stack
🔹 Backend Engine

Django + Django REST Framework (DRF) — Centralized analytics API

Pandas — Dataset parsing & statistical computations

SQLite — Persistence for last 5 dataset uploads

🔹 Web Frontend

React 18 + Vite — High-performance UI rendering

Chart.js — Interactive scientific plots

Tailwind CSS — Industrial dark-mode dashboard UI

🔹 Desktop Frontend

PyQt5 — Native desktop monitoring application

Matplotlib — Scientific plotting and trend visualization

⚡ Core Features
📥 CSV Data Processing

Automatic parsing of:

Equipment Name

Equipment Type

Flowrate

Pressure

Temperature

📊 Analytics API

Global averages of industrial parameters

Equipment-type distribution statistics

🧠 Smart Dataset History

Stores and toggles between the last 5 uploaded datasets

🖥️ Industrial Control Panel UI

High-contrast dark theme optimized for technical environments

📄 PDF Reporting (Planned)

Automated dataset summary and equipment log reports

⚠️ Current Limitation

After uploading a dataset, the web frontend requires a manual page refresh to retrieve updated analytics from the backend API.

This is due to the current request-based update mechanism and will be replaced with real-time synchronization in future versions.

📂 Project Structure
backend/            Django REST API & Pandas analytics  
frontend-web/       React dashboard source code  
frontend-desktop/   PyQt5 desktop monitoring client  
requirements.txt    Python dependency manifest   

⚙️ Installation & Execution
🔹 Backend
cd backend
pip install -r requirements.txt
python manage.py runserver

🔹 Web Dashboard
cd frontend-web
npm install
npm run dev

🔹 Desktop Application
cd frontend-desktop
python main.py

👤 Author

Krishiv Sarva
FOSSEE Internship Applicant 2026

📜 License

MIT Open Source License
