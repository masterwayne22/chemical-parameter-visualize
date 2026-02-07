🛠️ ChemViz: Chemical Equipment Parameter Visualizer
Hybrid Data Analytics System (Web + Desktop)
📋 Project Overview
Purpose: A cross-platform tool developed for the FOSSEE Screening Task (IIT Bombay).

Core Function: Upload, process, and visualize industrial chemical equipment data.

Architecture: Hybrid System (Single Django Backend ↔ Dual Frontends).

Industry Focus: Designed with an Industrial HMI (Human Machine Interface) aesthetic.

✨ Key Features
🚀 Cross-Platform Compatibility: Unified experience across browsers and native desktop environments.

📊 Automated Analytics: Powered by Pandas for instant calculation of:

Total Equipment Counts.

Averaged parameters (Flowrate, Pressure, Temperature).

Distribution of equipment types.

📈 Dynamic Visualization: * Web: Interactive charts via Chart.js.

Desktop: High-precision scientific plots via Matplotlib.

🔐 Security & History: * Basic Authentication for secure data access.

SQLite integration to manage the history of the last 5 uploaded datasets.

🛠️ Technical Stack
Backend (Core Engine)
Language: Python 3.10+

Framework: Django & Django REST Framework (DRF).

Data Science: Pandas (CSV parsing & statistical analysis).

Database: SQLite (History and User management).

Web Frontend
Framework: React 18 (Vite build tool).

Styling: Tailwind CSS (Custom Industrial Design System).

Charts: Chart.js.

Desktop Frontend
Framework: PyQt5.

Graphics: Matplotlib integration.

📂 Repository Structure
📁 backend/ → Django project, API logic, and analytics modules.

📁 frontend-web/ → React source code and dashboard UI.

📁 frontend-desktop/ → PyQt5 native application scripts.

📄 sample_equipment_data.csv → Reference data for testing.

📄 requirements.txt → Python dependency manifest.

💻 Installation & Setup
1. Backend (Django)
cd backend

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver


2. Web Frontend (React)
cd frontend-web

npm install

npm run dev

Note: Dashboard accessible at http://localhost:5173

3. Desktop Frontend (PyQt5)
cd frontend-desktop

python main.py

🌐 Submission Links
Live Web Demo: https://eloquent-unicorn-ef2d76.netlify.app/ 

GitHub repo link: https://github.com/masterwayne22/chemviz

Developed by: Krishiv Sarva

License: MIT Open Source

Target: FOSSEE Internship Program Evaluation
