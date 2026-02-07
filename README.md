# Chemical Equipment Parameter Visualizer (Hybrid Web + Desktop App)

---

### 🚀 Project Summary: ChemViz
* **Core Objective:** Developed a high-performance web application to simplify chemical data visualization through an interactive 3D interface and a dynamic Periodic Table.
* **Technical Implementation:** Leveraged **React 18** for a modern, responsive frontend, ensuring sub-second load times and efficient state management.
* **Key Functionalities:**
    * **3D Molecular Viewer:** Allows users to interactively manipulate molecular structures.
    * **Dynamic Periodic Table:** Real-time filtering and detailed property analysis for all 118 elements.
* **FOSS Alignment:** Built entirely using Free and Open Source Software, adhering to the core mission of the **FOSSEE initiative**.
* **Scalability:** Organized with a modular component-based architecture for easy maintenance and expansion.
* **Deployment:** Successfully hosted on Netlify with a CI/CD pipeline linked to GitHub.
* License: This project is open-source and released under the MIT License.

Developed by: Krishiv Sarva

Designed for: FOSSEE Internship Program Evaluation.

---

### 📋 1. Project Overview & Mission
* **Context:** Specialized project for the **FOSSEE Screening Task (IIT Bombay)**.
* **Goal:** To bridge the gap between complex chemical data and user-friendly visualization.
* **FOSS Commitment:** Developed using 100% Free and Open Source Software.

---

### 🌐 2. Project Access Points
* **Live Production Link (Netlify):** [https://eloquent-unicorn-ef2d76.netlify.app/](https://eloquent-unicorn-ef2d76.netlify.app/)
* **Source Code (GitHub):** [https://github.com/masterwayne22/chemviz](https://github.com/masterwayne22/chemviz)

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
* **/src**: Core source code.
* **/src/components**: UI modules like `PeriodicTable.jsx` and `MolecularViewer.jsx`.
* **App.jsx**: Main entry point and state management.
* **main.jsx**: React DOM rendering configuration.
* **/public**: Static JSON datasets containing element properties and 3D assets.
* **package.json**: Manifest file listing dependencies and scripts.
* **.gitignore**: Prevents unnecessary files from being tracked.

---

### 💻 6. Comprehensive Installation & Local Setup
Follow these exact steps to replicate the environment:

1. **Clone the Project:**
```bash
git clone https://github.com/masterwayne22/chemviz.git

2. Enter Directory:
cd chemviz

3. Install Dependencies:
npm install

4. Run Development Server:
npm run dev

