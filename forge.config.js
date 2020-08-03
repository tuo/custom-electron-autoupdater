module.exports = {
  "make_targets": {
    "win32": [
      "squirrel"
    ],
    "darwin": [
      "dmg",
      "zip"
    ],
    "linux": [
      "deb"
    ]
  },
  "electronPackagerConfig": {
    "asar": true,
    "osxSign": true,
    "osxNotarize": {
      "appleId": process.env['APPLE_ID'],
      "appleIdPassword": process.env['APPLE_ID_PASSWORD']
    }
  },
  "electronWinstallerConfig": {
    "name": "electron_example"
  },
  "electronInstallerDMG": {},
  "electronInstallerDebian": {},
  "electronInstallerRedhat": {},
  "github_repository": {
    "owner": "tuo",
    "name": "electron-example"
  },
  "windowsStoreConfig": {
    "packageName": "",
    "name": "electronexample"
  }
}
