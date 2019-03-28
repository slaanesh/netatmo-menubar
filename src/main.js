const { app, BrowserWindow, Tray } = require('electron'); // http://electron.atom.io/docs/api
const path = require('path');
const keytar = require('keytar');
const ipc = require('electron').ipcMain;

let window = null;
let tray = null;

let service_name = 'netatmo-menubar';

console.log('starting...');
app.dock.hide();

// Wait until the app is ready
app.once('ready', () => {

  // Create a new tray
  tray = new Tray(path.join('assets', 'icons', 'png', '16x16.png'));
  tray.setToolTip('Netatmo status')
  tray.on('right-click', toggleWindow);
  tray.on('double-click', toggleWindow);
  tray.on('click', function (event) {
    toggleWindow();
  });

  // Create a new window
  window = new BrowserWindow({
    width: 340,
    height: 400,
    show: false,
    frame: false,
    resizable: false,
    skipTaskbar: true,
    fullscreenable: false,
    webPreferences: {
      backgroundThrottling: false
    }
  });

  window.loadURL(
   process.env.ELECTRON_START_URL ||
      require('url').format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
      })
  );

  // send the credentials found by keytar if any
  window.webContents.on('did-finish-load', () => {
    getCredentials(service_name).then(accounts => {
      window.webContents.send('findCredentials', accounts);
    });
  });

  window.once('ready-to-show', () => {
    const position = getWindowPosition();
    window.setPosition(position.x, position.y, false);
    window.focus();
  });

  // Hide the window when it loses focus
  window.on('blur', () => {
    window.hide();
  });
});

const getWindowPosition = () => {
  const windowBounds = window.getBounds();
  const trayBounds = tray.getBounds();

  // Center window horizontally below the tray icon
  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2));

  // Position window 4 pixels vertically below the tray icon
  const y = Math.round(trayBounds.y + trayBounds.height + 4);

  return { x: x, y: y };
};

// toggle window
const toggleWindow = () => {
  if (window.isVisible()) {
    window.hide();
  } else {
    showWindow();
  }
};

const showWindow = () => {
  const position = getWindowPosition();
  window.setPosition(position.x, position.y, false);
  window.show();
  window.focus();
};

const getCredentials = (service) => {
  return keytar.findCredentials(service);
};

// save credentials with keytar if we receive any
ipc.on('savePassword', (event, data) => {
  keytar.setPassword(service_name, data.username, data.password);
});

// debug event
ipc.on('debug', (event, data) => {
  console.log(data);
});
