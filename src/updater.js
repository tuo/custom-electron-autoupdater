import electron, {dialog, app} from 'electron'
const APP_VERSION = require('../package.json').version
//import log from 'log-to-file'
const log = require('electron-log');

console.log(app.getPath('logs'));
console.log('process.platform', process.platform, APP_VERSION);


// The url that the application is going to query for new release
//const AUTO_UPDATE_URL =
  'https://api.update.rocks/update/github.com/tuo/electron-example/stable/' + process.platform + '/' + APP_VERSION
let AUTO_UPDATE_URL = 'https://ssl.6edigital.com/tuo_test/' + APP_VERSION + '.json?t=' + Date.now();
//AUTO_UPDATE_URL = `https://api.update.rocks/update/github.com/rllola/electron-example/stable/win32/0.0.23`;
AUTO_UPDATE_URL = 'https://6e-e7one.coherencedigital.com/tuo_madmapper/0.0.23.json?t=' + Date.now();
log.info(`AUTO_UPDATE_URL:` + AUTO_UPDATE_URL  + `, appversion: ` + APP_VERSION);





function init () {

  const { net } = require('electron')
  const request = net.request(AUTO_UPDATE_URL)
  request.on('response', (response) => {
    log.info(`STATUS: ${response.statusCode}`)
    log.info(`HEADERS: ${JSON.stringify(response.headers)}`)
    response.on('data', (chunk) => {
      log.info(`BODY: ${chunk}`)
    })
    response.on('end', () => {
      log.info('No more data in response.')
    })
  })
  request.end()
  
  if (process.platform === 'linux') {
    log.info('Auto updates not available on linux')
  } else {
    log.info('initDarwinWin32: ' + AUTO_UPDATE_URL)
    initDarwinWin32()
  }
}

function initDarwinWin32 () {
  electron.autoUpdater.on(
    'error',
    (err) => log.info(`Update error: ${err.message}`))

  electron.autoUpdater.on(
    'checking-for-update',
    () => log.info('Checking for update' ))

  electron.autoUpdater.on(
    'update-available',
    () => log.info('Update available'))

  electron.autoUpdater.on(
    'update-not-available',
    () => log.info('No update available'))

  // Ask the user if update is available
  electron.autoUpdater.on(
    'update-downloaded',
    (event, releaseNotes, releaseName) => {
      log.info('Update downloaded')
      dialog.showMessageBox({
        type: 'question',
        buttons: ['Update', 'Cancel'],
        defaultId: 0,
        message: `Version ${releaseName} is available, do you want to install it now?`,
        title: 'Update available'
      }, response => {
        if (response === 0) {
          electron.autoUpdater.quitAndInstall()
        }
      })
    }
  )
 

  electron.autoUpdater.setFeedURL(AUTO_UPDATE_URL)
  electron.autoUpdater.checkForUpdates()
}

module.exports = {
  init
}
