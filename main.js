const { app, BrowserWindow } = require('electron');
const path = require('path');
const express = require('express');

let mainWindow = null;

const expressApp = express();

// 添加多个静态文件目录
expressApp.use('/static', express.static(path.join(__dirname, 'static')));
expressApp.use('/runcode', express.static(path.join(__dirname, 'runcode')));
expressApp.use('/d', express.static(path.join(__dirname, 'd')));

const server = expressApp.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 435,
    webPreferences: {
      nodeIntegration: true,
      frame: false, // 隐藏工具栏和标题栏
      titleBarStyle: 'hidden' // 隐藏标题栏（仅适用于 macOS）
    }
  });
  mainWindow.setMenu(null);
  mainWindow.loadURL('http://localhost:3000/runcode/run_cpp920/index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
