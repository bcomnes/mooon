var app = require('app')  // Module to control application life.
var Tray = require('tray')
var Menu = require('menu')
var NativeImage = require('native-image')

var moonmoji = require('moonmoji')
var clockmoji = require('clockmoji')

var schedule = require('node-schedule')

// Report crashes to our server.
require('crash-reporter').start()

var phases = {
  'New Moon': '189',
  'New Moon *': '189',
  'Waxing Crescent': '190',
  'First Quarter': '191',
  'Waxing Gibbous': '192',
  'Full Moon': '193',
  'Full Moon *': '193',
  'Waning Gibbous': '194',
  'Last Quarter': '195',
  'Waning Crescent': '196'
}

var clocks = {
  '\uD83D\uDD50': '672', // 1:00
  '\uD83D\uDD5C': '684', // 1:30
  '\uD83D\uDD51': '673', // 2:00
  '\uD83D\uDD5D': '685', // 2:30
  '\uD83D\uDD52': '674', // 3:00
  '\uD83D\uDD5E': '686', // 3:30
  '\uD83D\uDD53': '675', // 4:00
  '\uD83D\uDD5F': '687', // 4:30
  '\uD83D\uDD54': '676', // 5:00
  '\uD83D\uDD60': '688', // 5:30
  '\uD83D\uDD55': '677', // 6:00
  '\uD83D\uDD61': '689', // 6:30
  '\uD83D\uDD56': '678', // 7:00
  '\uD83D\uDD62': '690', // 7:30
  '\uD83D\uDD57': '679', // 8:00
  '\uD83D\uDD63': '691', // 8:30
  '\uD83D\uDD58': '680', // 9:00
  '\uD83D\uDD64': '692', // 9:30
  '\uD83D\uDD59': '681', // 10:00
  '\uD83D\uDD65': '693', // 10:30
  '\uD83D\uDD5A': '682', // 11:00
  '\uD83D\uDD66': '694', // 11:30
  '\uD83D\uDD5B': '683', // 12:00
  '\uD83D\uDD67': '695' // 12:30
}

var appIcon = null
var clockIcon = null

var contextMenu = Menu.buildFromTemplate([
  {
    label: 'Toggle Clock',
    click: function () { app.toggleClock() }
  },
  {
    label: 'Quit',
    accelerator: 'CommandOrControl+Q',
    click: function () { app.quit() }
  }
])

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.

app.on('error', function (err) { console.error(err)})

app.on('ready', function () {
  if (app.dock) app.dock.hide()
  // mainWindow = new BrowserWindow({width: 800, height: 600})
  appIcon = new Tray(NativeImage.createEmpty())
  appIcon.setToolTip('Mooon')
  appIcon.setContextMenu(contextMenu)

  app.updateIcons()
  schedule.scheduleJob({minute: [0, 15, 30, 45]}, this.updateIcons)
  // mainWindow.loadUrl('file://' + __dirname + '/index.html')
})

app.updateIcons = function () {
  var phase = moonmoji().name
  console.log(phase)
  appIcon.setImage(__dirname + '/icons/' + phases[phase] + '.png')

  if (clockIcon) {
    var clock = clockmoji()
    console.log(clock)
    clockIcon.setImage(__dirname + '/icons/source/' + clocks[clock] + '.png')
  }
}

app.toggleClock = function () {
  if (!clockIcon) {
    clockIcon = new Tray(NativeImage.createEmpty())
    clockIcon.setContextMenu(contextMenu)
    app.updateIcons()
  } else {
    clockIcon.destroy()
    clockIcon = null
  }
}
