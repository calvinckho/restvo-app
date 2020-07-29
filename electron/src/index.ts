import { app, dialog, ipcMain, shell, Menu, Notification } from 'electron';
import { createCapacitorElectronApp } from '@capacitor-community/electron-core';

import { autoUpdater } from 'electron-updater';
// const path = require('path');
const { setup: setupPushReceiver } = require('electron-push-receiver');
const isDevMode = require('electron-is-dev');
const log = require('electron-log');

// The MainWindow object can be accessed via myCapacitorApp.getMainWindow()
const myCapacitorApp = createCapacitorElectronApp({
  splashScreen: {
    useSplashScreen: false,
  },
});

autoUpdater.logger = log;
// autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

// Place holders for our windows so they don't get garbage collected.
let mainWindow = null;

const name = app.getName();
app.setAppUserModelId('RestvoApp'); // MS Windows: Changes the Application User Model ID to id.
// app.allowRendererProcessReuse = true; // require in electron@9+

const menuTemplate: any = [{
  label: name,
  submenu: [
    {
      label: 'About ' + name,
      role: 'about'
    },
    {
      label: 'Check Update',
      click() {
        declinedVersion = '';
        autoUpdater.checkForUpdates().then((result) => {
          if (result.updateInfo.version) {
            updateVersion = result.updateInfo.version;
          }
        });
      }
    },
    {
      label: 'Dev Tools',
      click() {
        mainWindow.openDevTools();
      },
    },
    {
      label: 'Quit',
      accelerator: 'Command+Q',
      click() { app.quit(); }
    }
  ]}, {
  label: 'Edit',
  submenu: [
    { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
    { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
    { type: 'separator' },
    { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
    { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
    { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
    { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' }
  ]}
];
// }

function setupApp () {
  myCapacitorApp.init();
  mainWindow = myCapacitorApp.getMainWindow();

  ipcMain.on('SYSTEM_TRAY:::SET_BADGE',  (_, count) => {
    // console.log("set badge", count);
    app.setBadgeCount(count);
  });
  ipcMain.on('SYSTEM_TRAY:::CHANGE_BADGE',  (_, count) => {
    // console.log("change badge", count);
    app.setBadgeCount(app.getBadgeCount() + count);
  });

  setupPushReceiver(mainWindow.webContents);

  ipcMain.on('SYSTEM_NOTIFICATION:::DISPLAY_INCOMING_NOTIFICATION',  (_, result) => {
    console.log('displaying notification', result.notification);
    app.setBadgeCount(app.getBadgeCount() + 1);
    const notificationHandler = new Notification({
      title: result.notification.title,
      body: result.notification.body,
      hasReply: true,
    });
    notificationHandler.on('show', () => {
      // console.log("showing");
    });
    notificationHandler.on('click', () => {
      // console.log("clicked");
      mainWindow.show();
      if (result.data.page === 'MessagePage' || result.data.page === 'GroupmessagePage') {
        result.data.author = JSON.parse(result.data.author);
        if (result.data.group) {
          result.data.group = JSON.parse(result.data.group);
        }
        mainWindow.webContents.send('CHAT:::OPEN', result.data);
      }
    });
    notificationHandler.on('reply', (err, reply) => {
      result.data.author = JSON.parse(result.data.author);
      if (result.data.group) {
        result.data.group = JSON.parse(result.data.group);
      }
      result.data.composedMessage = reply;
      // console.log("reply", result.data);
      mainWindow.webContents.send('CHAT:::SEND_REPLY', result.data);
    });
    notificationHandler.show();
  });

  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));

  mainWindow.webContents.on('dom-ready', () => {
    mainWindow.show();
  });

  mainWindow.on('close', function () {
    mainWindow = null;
  });

  mainWindow.webContents.on('new-window', (event, url) => {
    log.info('opening url in browser', url);
    event.preventDefault();
    shell.openExternal(url);
  });
}

let updateVersion = '';
let declinedVersion = '';

autoUpdater.on('update-downloaded',  (info) => {
  if (updateVersion !== declinedVersion) {
    declinedVersion = updateVersion;
    dialog.showMessageBox(
        mainWindow,
        {
          title: 'Update Available',
          message: 'A new version of Restvo has been downloaded. Do you want to install the new version now?',
          buttons: ['Restart', 'Cancel'],
          defaultId: 0,
          cancelId: 1
        }).then((results) => {
          if (results && results.response === 0) {
            autoUpdater.quitAndInstall();
            app.exit();
          }
    });
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some Electron APIs can only be used after this event occurs.

app.on('ready', () => {
  setupApp();
  if (!isDevMode) {
    setInterval( () => {
      autoUpdater.checkForUpdates().then((result) => {
        if (result.updateInfo.version) {
          updateVersion = result.updateInfo.version;
        }
      });
    }, 60000);
  }
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate',  () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    setupApp();
  }
});

// Define any IPC or other custom functionality below here
