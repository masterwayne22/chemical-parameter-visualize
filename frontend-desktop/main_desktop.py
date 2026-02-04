# Move back up and then into the desktop folder
cd ..
cd frontend-desktop

# Create the PyQt5 file
echo "import sys
from PyQt5.QtWidgets import QApplication, QMainWindow, QLabel, QVBoxLayout, QWidget

class DesktopDashboard(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle('FOSSEE ChemViz Desktop')
        self.setFixedSize(400, 200)
        
        layout = QVBoxLayout()
        label = QLabel('Chemical Equipment Analytics Dashboard')
        layout.addWidget(label)
        
        container = QWidget()
        container.setLayout(layout)
        self.setCentralWidget(container)

if __name__ == '__main__':
    app = QApplication(sys.argv)
    window = DesktopDashboard()
    window.show()
    sys.exit(app.exec_())" > main_desktop.py