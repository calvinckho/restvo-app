const { app, dialog, ipcMain, BrowserWindow, Menu, Notification } = require('electron');
const isDevMode = require('electron-is-dev');
const { CapacitorSplashScreen, configCapacitor } = require('@capacitor/electron');
const log = require('electron-log');
const path = require('path');
const os = require('os');
const { autoUpdater } = require("electron-updater");
const { setup: setupPushReceiver } = require('electron-push-receiver');

/*
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');
*/

// Place holders for our windows so they don't get garbage collected.
let mainWindow = null;

// Placeholder for SplashScreen ref
let splashScreen = null;

//Change this if you do not wish to have a splash screen
let useSplashScreen = false;

const name = app.getName();
app.setAppUserModelId('RestvoApp'); //MS Windows: Changes the Application User Model ID to id.

// Create simple menu for easy devtools access, and for demo
const menuTemplateDev = [{
    label: name,
    submenu: [
        {
            label: 'About ' + name,
            role: 'about'
        },
        {
            label: 'Check Update',
            click() {
                declinedVersion = "";
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
    label: "Edit",
    submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
    ]}
];

let menuTemplate = [];
//if (process.platform === 'darwin') {
    // OS X
    menuTemplate = [{
        label: name,
        submenu: [
            {
                label: 'About ' + name,
                role: 'about'
            },
            {
                label: 'Check Update',
                click() {
                    declinedVersion = "";
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
            label: "Edit",
            submenu: [
                { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
                { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
                { type: "separator" },
                { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
                { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
                { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
                { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
                ]}
    ];
//}

async function createWindow () {
    // Define our main window size
    mainWindow = new BrowserWindow({
        height: 700,
        width: 900,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'node_modules', '@capacitor', 'electron', 'dist', 'electron-bridge.js')
        }
    });
    configCapacitor(mainWindow);

    ipcMain.on('SYSTEM_TRAY:::SET_BADGE', async (_, count) => {
        //console.log("set badge", count);
        app.setBadgeCount(count);
    });
    ipcMain.on('SYSTEM_TRAY:::CHANGE_BADGE', async (_, count) => {
        //console.log("change badge", count);
        app.setBadgeCount(app.getBadgeCount() + count);
    });

    setupPushReceiver(mainWindow.webContents);

    ipcMain.on('SYSTEM_NOTIFICATION:::DISPLAY_INCOMING_NOTIFICATION', async (_, result) => {
        console.log("displaying notification", result.notification);
        app.setBadgeCount(app.getBadgeCount() + 1);
        const notificationHandler = new Notification({
            title: result.notification.title,
            body: result.notification.body,
            hasReply: true,
        });
        notificationHandler.on('show', () => {
            //console.log("showing");
        });
        notificationHandler.on('click', () => {
            //console.log("clicked");
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
            //console.log("reply", result.data);
            mainWindow.webContents.send('CHAT:::SEND_REPLY', result.data);
        });
        notificationHandler.show();
    });

    //BrowserWindow.addExtension(path.join(os.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/kglhbbefdnlheedjiejgomgmfplipfeb/0.2.8.14_0'));

    if (isDevMode) {
        // Set our above template to the Menu Object if we are in development mode, dont want users having the devtools.
        Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplateDev));
        // If we are developers we might as well open the devtools by default.
        // mainWindow.webContents.openDevTools();
    } else {
        Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
    }

  if(useSplashScreen) {
    splashScreen = new CapacitorSplashScreen(mainWindow);
    splashScreen.init();
  } else {
      mainWindow.loadURL(`file://${__dirname}/app/index.html`);

      //mainWindow.loadURL(await injectCapacitor(`file://${__dirname}/app/index.html`), {baseURLForDataURL: `file://${__dirname}/app/`});
    mainWindow.webContents.on('dom-ready', () => {
        mainWindow.show();

        mainWindow.on('close', function () {
            mainWindow = null;
        });
    });
  }
}

let updateVersion = "";
let declinedVersion = "";

autoUpdater.on('update-downloaded', async (info) => {
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
            },
            function callback(response) {
                if (response === 0) {
                    autoUpdater.quitAndInstall();
                    app.exit();
                }
            });
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some Electron APIs can only be used after this event occurs.
app.on('ready', createWindow);

app.on('ready', function() {
    if (!isDevMode) {
        setInterval(async () => {
            const result = await autoUpdater.checkForUpdates();
            if (result.updateInfo.version) {
                updateVersion = result.updateInfo.version;
            }
        }, 60000);
    }
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// Define any IPC or other custom functionality below here
