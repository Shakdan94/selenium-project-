# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'ui_mainWindow.ui'
#
# Created by: PyQt5 UI code generator 5.13.0
#
# WARNING! All changes made in this file will be lost!


from PyQt5 import QtCore, QtGui, QtWidgets
from PyQt5.QtWidgets import *  # QApplication() ,execu() , QFileDialog() , QTreeWidgetItem()
from PyQt5.QtCore import *  # pyqtSlot
from PyQt5.QtGui import *

class Ui_MainWindow(object):
    def setupUi(self, MainWindow):
        MainWindow.setObjectName("MainWindow")
        MainWindow.resize(799, 600)
        MainWindow.setStyleSheet("")
        self.centralwidget = QtWidgets.QWidget(MainWindow)
        self.centralwidget.setObjectName("centralwidget")
        self.testsButton = QtWidgets.QPushButton(self.centralwidget)
        self.testsButton.setGeometry(QtCore.QRect(20, 30, 171, 41))
        font = QtGui.QFont()
        font.setPointSize(12)
        font.setBold(True)
        font.setWeight(75)

        self.testsButton.setFont(font)
        self.testsButton.setStyleSheet("QPushButton\n"
"{\n"
"  background-color: white;\n"
"  color: black;\n"
"  border: 2px solid #000000;\n"
"}\n"
"\n"
"\n"
"QPushButton:hover{\n"
"  background-color: #555555;\n"
"  color: white;\n"
"}\n"
"")
        self.testsButton.setObjectName("testsButton")
        self.runButton = QtWidgets.QPushButton(self.centralwidget)
        self.runButton.setGeometry(QtCore.QRect(230, 30, 91, 41))
        font = QtGui.QFont()
        font.setPointSize(12)
        font.setBold(True)
        font.setWeight(75)
        self.runButton.setFont(font)
        self.runButton.setStyleSheet("QPushButton{border-radius: 12px;}\n"
"\n"
"QPushButton\n"
"{\n"
"background-color: white; \n"
"  color: black; \n"
"  border: 2px solid #4CAF50;\n"
"}\n"
"\n"
"QPushButton:hover{\n"
"  background-color: #4CAF50;\n"
"  color: white;\n"
"}\n"
"")
        self.runButton.setObjectName("runButton")
        self.stopButton = QtWidgets.QPushButton(self.centralwidget)
        self.stopButton.setGeometry(QtCore.QRect(330, 30, 91, 41))
        font = QtGui.QFont()
        font.setPointSize(12)
        font.setBold(True)
        font.setWeight(75)
        self.stopButton.setFont(font)
        self.stopButton.setStyleSheet("QPushButton{border-radius: 12px;}\n"
"\n"
"QPushButton\n"
"{\n"
"background-color: white; \n"
"  color: black; \n"
"  border: 2px solid #f44336;\n"
"}\n"
"\n"
"QPushButton:hover{\n"
"  background-color: #f44336;\n"
"  color: white;\n"
"}\n"
"")
        self.stopButton.setObjectName("stopButton")
        self.selectButton = QtWidgets.QPushButton(self.centralwidget)
        self.selectButton.setGeometry(QtCore.QRect(20, 520, 81, 31))
        font = QtGui.QFont()
        font.setBold(True)
        font.setWeight(75)
        self.selectButton.setFont(font)
        self.selectButton.setObjectName("selectButton")
        self.deselectButton = QtWidgets.QPushButton(self.centralwidget)
        self.deselectButton.setGeometry(QtCore.QRect(110, 520, 81, 31))
        font = QtGui.QFont()
        font.setBold(True)
        font.setWeight(75)
        self.deselectButton.setFont(font)
        self.deselectButton.setObjectName("deselectButton")
        self.logsButton = QtWidgets.QPushButton(self.centralwidget)
        self.logsButton.setGeometry(QtCore.QRect(500, 30, 271, 41))
        font = QtGui.QFont()
        font.setPointSize(12)
        font.setBold(True)
        font.setWeight(75)
        self.logsButton.setFont(font)
        self.logsButton.setStyleSheet("QPushButton\n"
"{\n"
"  background-color: #e7e7e7;\n"
"  color: black;\n"
"  border: 4px solid #e7e7e9;\n"
"}\n"
"\n"
"\n"
"QPushButton:hover {background-color: white;}\n"
"")
        self.logsButton.setObjectName("logsButton")
        self.refreshLogsButton = QtWidgets.QPushButton(self.centralwidget)
        self.refreshLogsButton.setGeometry(QtCore.QRect(670, 520, 91, 31))
        font = QtGui.QFont()
        font.setBold(True)
        font.setWeight(75)
        self.refreshLogsButton.setFont(font)
        self.refreshLogsButton.setStyleSheet("QPushButton{border-radius: 12px;}\n"
"\n"
"QPushButton\n"
"{\n"
"background-color: white; \n"
"  color: black; \n"
"  border: 2px solid #008CBA;\n"
"}\n"
"\n"
"QPushButton:hover{\n"
"  background-color: #008CBA;\n"
"  color: white;\n"
"}\n"
"")
        self.refreshLogsButton.setObjectName("refreshLogsButton")
        self.testsTreeWidget = QtWidgets.QTreeWidget(self.centralwidget)
        self.testsTreeWidget.setGeometry(QtCore.QRect(25, 80, 161, 431))
        self.testsTreeWidget.setObjectName("testsTreeWidget")
        self.testsTreeWidget.headerItem().setText(0, "1")
        self.clear = QtWidgets.QPushButton(self.centralwidget)
        self.clear.setGeometry(QtCore.QRect(0, 490, 21, 21))
        self.clear.setObjectName("clear")
        self.G = QtWidgets.QPushButton(self.centralwidget)
        self.G.setGeometry(QtCore.QRect(440, 30, 41, 41))
        self.G.setStyleSheet("\n"
"QPushButton\n"
"{\n"
"  background-color: white;\n"
"  color: black;\n"
"  border: 4px solid #000000;\n"
"    font: 12pt \"MS Shell Dlg 2\";\n"
"\n"
"}\n"
"\n"
"QPushButton:hover{\n"
"  background-color: #555555;\n"
"  color: white;\n"
"}\n"
"")
        self.G.setObjectName("G")
        self.textEdit = QtWidgets.QTextEdit(self.centralwidget)
        self.textEdit.setGeometry(QtCore.QRect(223, 80, 561, 431))
        self.textEdit.setObjectName("textEdit")
        MainWindow.setCentralWidget(self.centralwidget)
        self.menubar = QtWidgets.QMenuBar(MainWindow)
        self.menubar.setGeometry(QtCore.QRect(0, 0, 799, 21))
        self.menubar.setObjectName("menubar")
        self.file = QtWidgets.QMenu(self.menubar)
        self.file.setObjectName("file")
        self.menuEdit = QtWidgets.QMenu(self.menubar)
        self.menuEdit.setObjectName("menuEdit")
        MainWindow.setMenuBar(self.menubar)
        self.statusbar = QtWidgets.QStatusBar(MainWindow)
        self.statusbar.setObjectName("statusbar")
        MainWindow.setStatusBar(self.statusbar)
        self.actionChoose_tests = QtWidgets.QAction(MainWindow)
        self.actionChoose_tests.setObjectName("actionChoose_tests")
        self.actionSelect_all_Ctrl_Alt_S = QtWidgets.QAction(MainWindow)
        self.actionSelect_all_Ctrl_Alt_S.setObjectName("actionSelect_all_Ctrl_Alt_S")
        self.actionSelect_all_Ctrl_Alt_S_2 = QtWidgets.QAction(MainWindow)
        self.actionSelect_all_Ctrl_Alt_S_2.setObjectName("actionSelect_all_Ctrl_Alt_S_2")
        self.actionSelect_all = QtWidgets.QAction(MainWindow)
        self.actionSelect_all.setObjectName("actionSelect_all")
        self.actionClose = QtWidgets.QAction(MainWindow)
        self.actionClose.setObjectName("actionClose")
        self.actiontete = QtWidgets.QAction(MainWindow)
        self.actiontete.setObjectName("actiontete")
        self.actionDeselect_all = QtWidgets.QAction(MainWindow)
        self.actionDeselect_all.setObjectName("actionDeselect_all")
        self.actionClear = QtWidgets.QAction(MainWindow)
        self.actionClear.setObjectName("actionClear")
        self.actionRun = QtWidgets.QAction(MainWindow)
        self.actionRun.setObjectName("actionRun")
        self.actionStop = QtWidgets.QAction(MainWindow)
        self.actionStop.setObjectName("actionStop")
        self.actionRefresh_logs = QtWidgets.QAction(MainWindow)
        self.actionRefresh_logs.setObjectName("actionRefresh_logs")
        self.file.addAction(self.actionChoose_tests)
        self.file.addSeparator()
        self.file.addAction(self.actionRun)
        self.file.addSeparator()
        self.file.addAction(self.actionStop)
        self.file.addSeparator()
        self.file.addAction(self.actionRefresh_logs)
        self.file.addSeparator()
        self.file.addAction(self.actionClose)
        self.menuEdit.addAction(self.actionSelect_all)
        self.menuEdit.addSeparator()
        self.menuEdit.addAction(self.actionDeselect_all)
        self.menuEdit.addSeparator()
        self.menuEdit.addAction(self.actionClear)
        self.menubar.addAction(self.file.menuAction())
        self.menubar.addAction(self.menuEdit.menuAction())

        self.retranslateUi(MainWindow)
        self.actionClose.triggered.connect(MainWindow.close)
        self.actiontete.triggered.connect(self.testsButton.click)
        QtCore.QMetaObject.connectSlotsByName(MainWindow)

    def retranslateUi(self, MainWindow):
        _translate = QtCore.QCoreApplication.translate
        MainWindow.setWindowTitle(_translate("MainWindow", "MainWindow"))
        self.testsButton.setText(_translate("MainWindow", "Choose tests"))
        self.runButton.setText(_translate("MainWindow", "Run"))
        self.stopButton.setText(_translate("MainWindow", "Stop"))
        self.selectButton.setText(_translate("MainWindow", "Select all"))
        self.deselectButton.setText(_translate("MainWindow", "Deselect all"))
        self.logsButton.setText(_translate("MainWindow", "Choose log file "))
        self.refreshLogsButton.setText(_translate("MainWindow", "Refresh Logs"))
        self.clear.setText(_translate("MainWindow", "C"))
        self.G.setText(_translate("MainWindow", "G"))
        self.file.setTitle(_translate("MainWindow", "File"))
        self.menuEdit.setTitle(_translate("MainWindow", "Edit"))
        self.actionChoose_tests.setText(_translate("MainWindow", "Choose tests  Ctrl+A"))
        self.actionSelect_all_Ctrl_Alt_S.setText(_translate("MainWindow", "Select all         Ctrl+Alt+S"))
        self.actionSelect_all_Ctrl_Alt_S_2.setText(_translate("MainWindow", "Select all         Ctrl+Alt+S"))
        self.actionSelect_all.setText(_translate("MainWindow", "Select all         Ctrl+Alt+S"))
        self.actionClose.setText(_translate("MainWindow", "Close "))
        self.actiontete.setText(_translate("MainWindow", "tete"))
        self.actionDeselect_all.setText(_translate("MainWindow", "Deselect all     Ctrl+Alt+D"))
        self.actionClear.setText(_translate("MainWindow", "Clear                Ctrl+R"))
        self.actionRun.setText(_translate("MainWindow", "Run                  Ctrl+P"))
        self.actionStop.setText(_translate("MainWindow", "Stop                 Ctrl+S"))
        self.actionRefresh_logs.setText(_translate("MainWindow", "Refresh logs   Ctrl+L"))
