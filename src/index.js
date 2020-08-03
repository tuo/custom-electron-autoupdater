import { app, BrowserWindow, dialog } from 'electron'
import updater from './updater'
import isDev from 'electron-is-dev'
//import log2 from 'log-to-file'
const log = require('electron-log');
log.info(process.argv)

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const createWindow = () => {
  log.info('Creating window')

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  })

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  //updater.init()
  
  if (isDev) {
    // Open the DevTools.
    mainWindow.webContents.openDevTools()
  } else {
    // Handle squirrel event. Avoid calling for updates when install
    if(require('electron-squirrel-startup')) {
      log.info('Squirrel events handle')
      app.quit()
      // Hack because app.quit() is not immediate
      process.exit(0)
    }

    if (process.platform === 'win32') {
      var cmd = process.argv[1]
      if (cmd === '--squirrel-firstrun') {
        log.info('Squirrel first run')
        return
      }
    }

    // Check for updates
    mainWindow.webContents.once("did-frame-finish-load", function (event) {
      log.info('Ready to look for update')
      updater.init()
    })
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    log.info('Closing app')
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
