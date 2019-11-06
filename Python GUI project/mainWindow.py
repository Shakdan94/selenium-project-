import sys, os , threading, psutil
from subprocess import *
from PyQt5 import QtWidgets, QtCore, QtGui
from PyQt5.QtWidgets import *  # QApplication() ,execu() , QFileDialog() , QTreeWidgetItem()
from PyQt5.QtCore import *  # pyqtSlot
from PyQt5.QtGui import *
from ui_mainWindow import Ui_MainWindow
import time


class MainWindow(QMainWindow):

    def __init__(self):
        super(MainWindow, self).__init__()
        self.paths = []
        self.files_names = []
        self.checked_paths = []
        self.checked = []
        self.pids = []
        self.process = ""
        self.ui = Ui_MainWindow()
        self.ui.setupUi(self)
        self.ui.testsTreeWidget.setHeaderHidden(True)
        self.setWindowTitle('Mahmoud Shakdan')
#---------------------------------------------------------------------------------------
        self.ui.testsButton.clicked.connect(self.choose_dir)
        self.ui.testsButton.setToolTip('Click to choose tests')
        self.ui.testsButton.setShortcut('Ctrl+A')
        self.ui.actionChoose_tests.triggered.connect(self.choose_dir)
        # ---------------------------------------------------------------------------------------
        self.ui.runButton.clicked.connect(self.run_tests)
        self.ui.runButton.setToolTip('Click to run')
        self.ui.runButton.setShortcut('Ctrl+P')
        self.ui.actionRun.triggered.connect(self.run_tests)
        # ---------------------------------------------------------------------------------------
        self.ui.clear.clicked.connect(self.clear_tree)
        self.ui.clear.setToolTip('Click to clear ')
        self.ui.clear.setShortcut('Ctrl+R')
        self.ui.actionClear.triggered.connect(self.clear_tree)
        # ---------------------------------------------------------------------------------------
        self.ui.logsButton.clicked.connect(self.go_to_log_file)
        self.ui.logsButton.setToolTip('Click to choose log file to show')
        # ---------------------------------------------------------------------------------------
        self.ui.G.clicked.connect(self.go_to_log_dir)
        self.ui.G.setToolTip('Click to open log directory ')
        # ---------------------------------------------------------------------------------------
        self.ui.selectButton.clicked.connect(self.select_all)
        self.ui.selectButton.setToolTip('Click to select all')
        self.ui.selectButton.setShortcut('Ctrl+Alt+S')
        self.ui.actionSelect_all.triggered.connect(self.select_all)
        # ---------------------------------------------------------------------------------------
        self.ui.deselectButton.clicked.connect(self.deselect_all)
        self.ui.deselectButton.setToolTip('Click to deselect all')
        self.ui.deselectButton.setShortcut('Ctrl+Alt+D')
        self.ui.actionDeselect_all.triggered.connect(self.deselect_all)
        # ---------------------------------------------------------------------------------------
        self.ui.refreshLogsButton.clicked.connect(self.refresh_log)
        # ---------------------------------------------------------------------------------------
        self.ui.stopButton.clicked.connect(self.kill)
        self.ui.stopButton.setToolTip('Click to stop all the tests')
        self.ui.stopButton.setShortcut('Ctrl+S')
        self.ui.actionStop.triggered.connect(self.deselect_all)


    def choose_dir(self):
        self.dir = QFileDialog.getExistingDirectory(self, 'Select Directory', 'c:/')
        # The QFileDialog class enables a user to traverse the file system in order to select one or many files or a directory.
        # return a (<class 'str'>) the path of the directory
        if self.dir:
            for get_tests in os.listdir(self.dir):
                # The method listdir() returns a list containing the names of the entries in the directory given by path. The list is in arbitrary order.
                if get_tests.endswith('Test.js'):#  The endswith() method returns a boolean.
                    self.paths.append(self.dir)
                    self.files_names.append(get_tests)
                    item = QTreeWidgetItem(self.ui.testsTreeWidget, [get_tests])
                    item.setCheckState(0, QtCore.Qt.Unchecked)
#Tree widget items are used to hold rows of information for tree widgets. Rows usually contain several columns of data, each of which can contain a text label and an icon.
#The QTreeWidgetItem class is a convenience class that replaces the QListViewItem class in Qt 3. It provides an item for use with the QTreeWidget class.
#Returns the check box’s check state
   # https://stackoverflow.com/questions/31342228/pyqt-tree-widget-adding-check-boxes-for-dynamic-removal




    def clear_tree(self):
        self.ui.testsTreeWidget.clear()

# The QTreeWidgetItemIterator class provides a way to iterate over the items in a QtGui.QTreeWidget instance.
# The iterator will walk the items in a pre-order traversal order, thus visiting the parent node before it continues to the child nodes.
    def run_tests(self):
        iterator = QTreeWidgetItemIterator(self.ui.testsTreeWidget)
        i = 0
        while iterator.value():
            if (iterator.value()).checkState(0):
                self.checked.append((iterator.value()).text(0))
                self.checked_paths.append(self.paths[i])
            i += 1
            iterator += 1
        t = threading.Thread(target=self.run_threads)
        t.start()

    def run_threads(self):
        m = 'node '
        for i in range(0, len(self.checked_paths)):
            if i != 0:
                m += f" && node {self.checked_paths[i]}/{self.checked[i]}"
            else:
                m += f"{self.checked_paths[i]}/{self.checked[i]}"
        print(m)
        # self.process = Popen(m, shell=True)
        #https://medium.com/python-pandemonium/a-trap-of-shell-true-in-the-subprocess-module-6db7fc66cdfd

# when we want to kill just and only the running test the nwe need to use this :
        # for i in range(0, len(self.checked_paths)):
        #     self.process = Popen(['Node', self.checked_paths[i] + '/' + self.checked[i]], shell=True)
        #     self.process.communicate()


    def kill(self):
        process = psutil.Process(self.process.pid)
        for proc in process.children(recursive=True):
            proc.kill()
        process.kill()
        # https://stackoverflow.com/questions/6549669/how-to-kill-process-and-child-processes-from-python
        #https://psutil.readthedocs.io/en/latest/


    def go_to_log_file(self):
        self.specific_log = QFileDialog.getOpenFileName(self, "Select Log File")
        # print(self.specific_log)
        log_file_name = os.path.basename(self.specific_log[0])
        # print(log_file_name)
        log_file_path = self.specific_log[0][:(len(self.specific_log[0]) - (len(log_file_name)))]
        # print(log_file_path)
        os.chdir(log_file_path)
        the_file = open(log_file_name)
        texter = the_file.read()
        print(texter)
        self.ui.textEdit.setText(texter)

    def go_to_log_dir(self):
        os.startfile(sys.path[0] + "\log")

    def select_all(self):
        iterator = QTreeWidgetItemIterator(self.ui.testsTreeWidget)
        while iterator.value():
            item = iterator.value()
            item.setCheckState(0, Qt.Checked)
            iterator+=1


    def deselect_all(self):
        iterator = QTreeWidgetItemIterator(self.ui.testsTreeWidget)
        while iterator.value():
            item = iterator.value()
            item.setCheckState(0, Qt.Unchecked)
            iterator += 1

    def refresh_log(self):

        print(self.checked_paths)
        print(self.checked)


# import datetime
# now = datetime.datetime.now()
# print now.year, now.month, now.day, now.hour, now.minute, now.second


app = QApplication(sys.argv)
window = MainWindow()
window.show()
sys.exit(app.exec_())
