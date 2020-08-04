import electron, {dialog, app, autoUpdater} from 'electron'
const APP_VERSION = require('../package.json').version
//import log from 'log-to-file' 

const logger = require("electron-log")
logger.transports.file.level = "info"

const DownloadManager = require("electron-download-manager");

const log = logger.info;
 
import path from "path";
import fs from "fs";

// Set global temporary directory for things like auto update downloads, creating it if it doesn't exist already.
global.tempPath = path.join( app.getPath( "temp" ), "NTWRK" );
if ( !fs.existsSync( global.tempPath ) ) fs.mkdirSync( global.tempPath );
log(global.tempPath);

DownloadManager.register({
  downloadFolder: global.tempPath
});
 
 

function init () {
 
  
  if (process.platform === 'linux') {
    logger.info('Auto updates not available on linux')
  } else {
    logger.info('initDarwinWin32: ')
    initDarwinWin32()
  }
}

function initDarwinWin32 () {
  electron.autoUpdater.on(
    'error',
    (err) => logger.info(`Update error: ${err.message}`))

  electron.autoUpdater.on(
    'checking-for-update',
    () => logger.info('Checking for update' ))

  electron.autoUpdater.on(
    'update-available',
    () => logger.info('Update available'))

  electron.autoUpdater.on(
    'update-not-available',
    () => logger.info('No update available'))

  // Ask the user if update is available
  electron.autoUpdater.on(
    'update-downloaded',
    (event, releaseNotes, releaseName) => {
      logger.info(`Update available ${releaseName}, now to install and restart`)
      

      electron.autoUpdater.quitAndInstall()




      // dialog.showMessageBox({
      //   type: 'question',
      //   buttons: ['Update', 'Cancel'],
      //   defaultId: 0,
      //   message: `Version ${releaseName} is available, do you want to install it now?`,
      //   title: 'Update available'
      // }, response => {
      //   if (response === 0) {
      //     electron.autoUpdater.quitAndInstall()
      //   }
      // })
    }
  )

  var links = [
    'https://6e-e7one.coherencedigital.com/tuo_madmapper/0.0.3/electron_example-0.0.3-full.nupkg',
    'https://6e-e7one.coherencedigital.com/tuo_madmapper/0.0.3/RELEASES',
  ];

  //Bulk file download    
  DownloadManager.bulkDownload({
      urls: links, 
  }, function (error, finished, errors) {
      if (error) {
          log("finished: " + finished);
          log("errors: " + errors);
          log(error);
          return;
      }

      log("all finished");

      const feedURL = global.tempPath;

      autoUpdater.setFeedURL( feedURL ); 
      autoUpdater.checkForUpdates()
  });
  


}

module.exports = {
  init
}
