const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let window1, window2;

function createWindow() {
  window1 = new BrowserWindow({
    width: 500,
    height: 600,
    x: 400,
    y: 200,
    backgroundColor: '#ffffff',
    webPreferences: {
      nodeIntegration: true,
    },
    show: false,
  });

  window1.loadFile('index.html');

  window1.on('ready-to-show', () => {
    window1.showInactive();
  });

  window2 = new BrowserWindow({
    width: 500,
    height: 600,
    x: 1000,
    y: 200,
    backgroundColor: '#ffffff',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
    show: false,
  });

  window2.loadFile('index.html');

  window2.on('ready-to-show', () => {
    window2.showInactive();
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('user:register', (e, user) => {
  const sender = e.sender;
  const other = (window1.webContents === sender ? window2 : window1)
    .webContents;

  if (user.where === 'here') {
    sender.send('user:response', user.name);
  } else {
    other.send('user:response', user.name);
  }
});
