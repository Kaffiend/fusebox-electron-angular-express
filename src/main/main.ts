const env = process.env.NODE_ENV || 'production';
const dev = env === 'development';

const path = require('path');
const url = require('url');
const isDevElectron = require('electron-is-dev'); // is dev electron (run from builded version)
const electron = require('electron'); // Module to control application life.
import * as logger from './logger';
import * as windowBounds from './windowBounds';
// const autoUpdater = require('./autoUpdater') // comming soon
import './devExtensions';
import { SEEDS } from './data';

const app = electron.app; // Module to create native browser window.
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  if (!isDevElectron) {
    // autoUpdater.checkForUpdates(); // comming soon
  }

  // Create the browser window.
  mainWindow = new BrowserWindow({
    ...windowBounds.get(),
    icon: path.join(__dirname, 'resources', 'icon.png')
  });
  logger.init(mainWindow);
  windowBounds.init(mainWindow);

  if(dev) {
    mainWindow.loadURL('http://localhost:4444');

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(url.format({
      pathname: path.join(app.getAppPath(), 'dist', 'renderer', `index.html`),
      protocol: 'file:',
      slashes: true
    }));
    // mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on('req:people', (event, arg: any) => {
  event.sender.send('res:people', SEEDS );
});
