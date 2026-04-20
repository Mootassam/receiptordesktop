'use strict';

const { app, BrowserWindow, shell, ipcMain, screen } = require('electron');
const path = require('path');
const { pathToFileURL } = require('url');

const isDev = process.env.NODE_ENV === 'development';

try { app.setAppUserModelId('com.yourcompany.simpleapp'); } catch {}

app.commandLine.appendSwitch('disable-gpu-sandbox');
if (process.platform === 'win32') {
  app.commandLine.appendSwitch('no-sandbox');
}

let mainWindow = null;

function createWindow() {
  const { height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: 855,
    height: height,
    minWidth: 855,
    maxWidth: 855,
    resizable: false,      // width is fixed, height can be full screen but not resizable
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      backgroundThrottling: true,
      spellcheck: false,
      webSecurity: false,
    },
    frame: true,
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
  });

  const startURL = isDev
    ? 'http://localhost:5173'
    : `file://${path.join(__dirname, '../app/dist/index.html')}`;

  mainWindow.loadURL(startURL);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    if (isDev) mainWindow.webContents.openDevTools();
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http') && !url.includes('localhost')) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });
}

// Optional window controls
ipcMain.handle('get-app-version', () => app.getVersion());
ipcMain.handle('minimize-app', () => mainWindow?.minimize());
ipcMain.handle('maximize-app', () => {
  if (!mainWindow) return;
  mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
});
ipcMain.handle('close-app', () => mainWindow?.close());
ipcMain.handle('open-external', (_e, url) => shell.openExternal(url));

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});