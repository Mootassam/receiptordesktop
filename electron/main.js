'use strict';

const { app, BrowserWindow, shell, ipcMain, screen } = require('electron');
const path = require('path');
const crypto = require('crypto');
const os = require('os');
let machineIdSync;
let si;

try {
  ({ machineIdSync } = require('node-machine-id'));
} catch {}
try {
  si = require('systeminformation');
} catch {}

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
    height: 800,
    minWidth: 855,
    maxWidth: 855,
    maxHeight: 800,
    resizable: false,
    icon: path.join(__dirname, '../build/header.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true, // Enable sandbox for better security
      preload: path.join(__dirname, 'preload.js'),
      backgroundThrottling: true,
      spellcheck: false,
      webSecurity: false, // Maintain existing setting as it might be needed for cross-origin
      devTools: isDev, // Disable DevTools in production
    },
    frame: true,
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
  });

  // Disable context menu to prevent "Inspect Element" in production
  if (!isDev) {
    mainWindow.webContents.on('context-menu', (e) => {
      e.preventDefault();
    });

    // Disable common DevTools shortcuts (F12, Ctrl+Shift+I, etc.)
    mainWindow.webContents.on('before-input-event', (event, input) => {
      if (
        (input.control && input.shift && input.key.toLowerCase() === 'i') || // Ctrl+Shift+I
        (input.control && input.shift && input.key.toLowerCase() === 'j') || // Ctrl+Shift+J
        (input.control && input.key.toLowerCase() === 'u') || // Ctrl+U (View Source)
        input.key === 'F12'
      ) {
        event.preventDefault();
      }
    });
  }

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
ipcMain.handle('get-device-identity', async () => {
  const basic = {
    platform: process.platform,
    arch: process.arch,
    osRelease: os.release(),
    hostname: os.hostname(),
    ramBytes: os.totalmem(),
  };

  let rawMachineId = null;
  try {
    rawMachineId = machineIdSync ? machineIdSync(true) : null;
  } catch {}

  const hw = {
    cpu: null,
    cpuCores: null,
    manufacturer: null,
    model: null,
    winVersion: null,
  };

  try {
    if (si) {
      const [cpu, mem, system, osInfo] = await Promise.all([
        si.cpu(),
        si.mem(),
        si.system(),
        si.osInfo(),
      ]);
      hw.cpu = cpu?.brand || cpu?.model || null;
      hw.cpuCores = cpu?.cores || null;
      basic.ramBytes = mem?.total || basic.ramBytes;
      hw.manufacturer = system?.manufacturer || null;
      hw.model = system?.model || null;
      hw.winVersion =
        osInfo?.platform === 'win32'
          ? `${osInfo?.distro || 'Windows'} ${osInfo?.release || ''} ${osInfo?.build || ''}`.trim()
          : null;
    }
  } catch {}

  const fingerprintSource = JSON.stringify({
    machineId: rawMachineId,
    ...basic,
    ...hw,
  });
  const fingerprint = crypto
    .createHash('sha256')
    .update(fingerprintSource)
    .digest('hex');

  return {
    machineId: rawMachineId,
    fingerprint,
    deviceInfo: {
      cpu: hw.cpu,
      cpuCores: hw.cpuCores,
      ramBytes: basic.ramBytes,
      ramGB: Math.round((basic.ramBytes / (1024 ** 3)) * 10) / 10,
      os: {
        platform: basic.platform,
        arch: basic.arch,
        release: basic.osRelease,
        winVersion: hw.winVersion,
      },
      model: hw.model,
      manufacturer: hw.manufacturer,
    },
  };
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Performance: Clear cache on exit
app.on('before-quit', async () => {
  try {
    const ses = mainWindow?.webContents?.session || require('electron').session.defaultSession;
    await ses.clearCache();
  } catch {}
});

// Performance: Lower CPU/GPU priority when window is blurred
app.on('browser-window-blur', () => {
  if (mainWindow?.webContents) {
    // Window is blurred, backgroundThrottling will handle most performance savings
  }
});

app.on('browser-window-focus', () => {
  if (mainWindow?.webContents) {
    // Window is focused
  }
});