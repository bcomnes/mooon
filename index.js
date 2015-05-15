var app = require('app')  // Module to control application life.
var BrowserWindow = require('browser-window')
var Tray = require('tray')
var Menu = require('menu')
var moonmoji = require('moonmoji')
var schedule = require('node-schedule')

// Report crashes to our server.
require('crash-reporter').start()

var phases = {
  'New Moon': '189',
  'Waxing Crescent': '190',
  'First Quarter': '191',
  'Waxing Gibbous': '192',
  'Full Moon': '193',
  'Waning Gibbous': '194',
  'Last Quarter': '195',
  'Waning Crescent': '196'
}

var mainWindow = null
var appIcon = null

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.

app.on('error', function (err) { console.error(err)})

app.on('ready', function () {
  if (app.dock) app.dock.hide()
  // mainWindow = new BrowserWindow({width: 800, height: 600})
  var phase = moonmoji().name
  appIcon = new Tray(__dirname + '/icons/' + phases[phase] + '.png')
  var contextMenu = Menu.buildFromTemplate([
    {
      label: 'Quit',
      accelerator: 'Command+Q',
      click: function () { app.quit() }
    }
  ])
  appIcon.setToolTip('Mooon')
  appIcon.setContextMenu(contextMenu)
  schedule.scheduleJob({minute: 0}, function () {
    phase = moonmoji().name
    console.log(phase)
    appIcon.setImage(__dirname + '/icons/' + phases[phase] + '.png')
  })
// mainWindow.loadUrl('file://' + __dirname + '/index.html')
})
