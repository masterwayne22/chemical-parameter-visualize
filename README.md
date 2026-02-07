# Chemical Equipment Parameter Visualizer (Hybrid Web + Desktop App)
This project is open-source and released under the MIT License.

Developed by: Krishiv Sarva

Designed for the FOSSEE Internship Program.
🚀 Project Summary: ChemViz
Core Objective: Developed a high-performance web application to simplify chemical data visualization through an interactive 3D interface and a dynamic Periodic Table.

Technical Implementation: Leveraged React 18  for a modern, responsive frontend, ensuring sub-second load times and efficient state management.

Key Functionalities:

Integrated a 3D Molecular Viewer allowing users to interactively manipulate molecular structures (Zoom/Rotate/Scale).

Engineered a Dynamic Periodic Table with real-time filtering and detailed property analysis for all 118 elements.

FOSS Alignment: Built entirely using Free and Open Source Software, adhering to the core mission of the FOSSEE initiative.

Scalability: Organized with a modular component-based architecture, making the codebase easy to maintain and extend with new chemical datasets.

Deployment: Successfully hosted on Netlify with a continuous integration pipeline linked to the GitHub repository for real-time updates.

### 📋 1. Project Overview & Mission
* **Context:** Specialized project for the **FOSSEE Screening Task (IIT Bombay)**.
* **Goal:** To bridge the gap between complex chemical data and user-friendly visualization.
* **FOSS Commitment:** Developed using 100% Free and Open Source Software.

---

### 🌐 2. Project Access Points
* **Live Production Link (Netlify):** https://eloquent-unicorn-ef2d76.netlify.app/   
* **Source Code (GitHub):** https://github.com/masterwayne22/chemviz

---

### ✨ 3. Core Features & Functionality
* **Interactive Periodic Table:**
    * Real-time property fetching for 118 elements.
    * Dynamic filtering based on atomic mass, group, and period.
* **3D Molecular Visualization:**
    * WebGL-based rendering for smooth 3D interaction.
    * Fully interactive camera (Rotation, Pan, Zoom).
* **Developer Experience:**
    * Hot Module Replacement (HMR) for instant UI updates.
    * Mobile-responsive layout using modern CSS techniques.

---

### 🛠️ 4. Technical Specifications (The Stack)
* **Framework:** React.js (v18.x)
* **Build Architecture:** Vite (ES modules)
* **Environment:** Node.js Runtime
* **Styling:** Tailwind CSS / CSS3
* **Open Source License:** MIT License

---

### 📂 5. Full Repository Architecture
Below is the directory mapping for the project to assist reviewers:
* **`/src`**: Core source code.
    * **`/components`**: UI modules like `PeriodicTable.jsx` and `MolecularViewer.jsx`.
    * **`App.jsx`**: Main entry point and state management.
    * **`main.jsx`**: React DOM rendering configuration.
* **`/public`**: Static JSON datasets containing element properties and 3D assets.
* **`package.json`**: Manifest file listing all dependencies and scripts.
* **`vite.config.js`**: Optimization settings for the Vite compiler.
* **`.gitignore`**: Prevents `node_modules` and environment variables from being leaked.

---

### 💻 6. Comprehensive Installation & Local Setup
Follow these exact steps to replicate the environment:

 **Clone the Project:**
   ```bash
   git clone [https://github.com/masterwayne22/chemviz.git](https://github.com/masterwayne22/chemviz.git)
   cd chemviz
   npm install
   npm run dev

