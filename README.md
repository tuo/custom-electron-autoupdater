## ELECTRON AUTO UPDATE WITH CUSTOM STATIC SERVER (NON PUBLIC GIT REPO, need custom authentication)

suppose we have 0.0.1 version and we want to let auto update to versin 0.0.2. 

according to electron doc: [Updating Applications](https://www.electronjs.org/docs/tutorial/updates)

you could host your one on updates.electron or some other platform.

But we need have binaries behind authencation. also hosting on github is not option, we need to hosted somewhere freely like OSS in china(not officially supported) or some server.



##### MANUALLY

>> Because the requests made by Auto Update aren't under your direct control, you may find situations that are difficult to handle (such as if the update server is behind authentication). The url field does support files, which means that with some effort, you can sidestep the server-communication aspect of the process. Here's an example of how this could work.


Good post from [joshuapinter](https://github.com/electron/electron/issues/5020#issuecomment-477636990) on this issue.


###### SOME TWEAKS

* use `electron-download-manager` to download `nupkg` and `RELEASES` files - (from `npm run make`)
* use `electron-log` to somehow log file ( you could check that log when running)
* host those two files in some server or static file services



![v0.0.1](https://github.com/tuo/custom-electron-updater/blob/master/b234d5aa7a8a1aa57c69bbe4cd346d01.jpg?raw=true)
![v.0.0.2 after quit and install, it will automatically start app with new version](https://github.com/tuo/custom-electron-updater/blob/master/55b86020e1530920e6fd9b86fbe5aa4a.jpg?raw=true)
![code](https://github.com/tuo/custom-electron-updater/blob/master/Screenshot%202020-08-04%20at%2012.07.22.png?raw=true)
![videos](https://github.com/tuo/custom-electron-updater/blob/master/video_20200804_115433_cps.mp4?raw=true)

























>>>
ORIGIN REPO:




# Update Rocks! Electron

[![Build Status](https://travis-ci.org/rllola/electron-autoupdater.svg?branch=master)](https://travis-ci.org/rllola/electron-autoupdater)
[![Build Status](https://ci.appveyor.com/api/projects/status/github/rllola/electron-autoupdater?branch=master&svg=true)](https://ci.appveyor.com/project/electron-autoupdater/)

This is our electron applicatino which integrate [Update Rocks!](https://www.update.rocks/) You can learn more about how it works here : https://www.update.rocks/howto

It also have the travis and travis scripts which automatically publish the assets in a release when a tag is created.

## Install dependencies

```
$ npm install
```

## Dev

```
$ npm start
```

## Build

```
$ npm run make
```
