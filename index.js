var app = require('app')  // Module to control application life.
var Tray = require('tray')
var Menu = require('menu')
var moonmoji = require('moonmoji')

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

var appIcon = null

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function () {
  if (app.dock) app.dock.hide()
  var phase = moonmoji().name
  appIcon = new Tray('./icons/' + phases[phase] + '.png')
  var contextMenu = Menu.buildFromTemplate([
    {
      label: 'Quit',
      accelerator: 'Command+Q',
      click: function () { app.quit() }
    }
  ])
  appIcon.setToolTip('Mooon')
  appIcon.setContextMenu(contextMenu)
})
