/*  global digitalWrite, A5, A6, save */
/*  eslint-disable no-unused-vars */

// Flash this code onto Pico using Espruino IDE
// Link: http://www.espruino.com/Web+IDE

// Treshold for each scanning cycle
var scanTreshold = 5000
// Treshold for swapping slide
var feedNewPicTreshold = 3000
// Treshold for 'pressing swap slide button'
var feedNewPicButtonTreshold = 500
// Treshold for taking picture
var takePictureTreshold = 800
// Treshold for 'pressing shutter button'
var takePictureButtonTreshold = 300
// Number of slides in session
var numberOfPics = 36
// Counter startindex
var numberOfScans = 0 // DO NOT CHANGE!
// Cycle scanning interval function
var scanPics

// Stop and reset counter
function stopScanning () {
  clearInterval(scanPics)
  numberOfScans = 0
}

function closeRelay (args) {
  console.log('Closing ' + args.pin)
  digitalWrite(args.pin, false)
  setTimeout(openRelay, args.treshold, {
    pin: args.pin,
    picture: args.picture
  })
}

function openRelay (args) {
  console.log('Opening ' + args.pin)
  digitalWrite(args.pin, true)
  if (args.picture) {
    takePicture()
  }
}

// Close second relay on port A6 for a while
function takePicture () {
  setTimeout(closeRelay, takePictureTreshold, {
    pin: 'A6',
    treshold: takePictureButtonTreshold,
    picture: false
  })
}

// Close first relay on port A5 for a while
function feedNewPic () {
  setTimeout(closeRelay, feedNewPicTreshold, {
    pin: 'A5',
    treshold: feedNewPicButtonTreshold,
    picture: true
  })
}

// Start feed/scan loop
function startScanning () {
  scanPics = setInterval(function () {
    feedNewPic()
    console.log(numberOfScans + ':' + numberOfPics)
    if (++numberOfScans === numberOfPics) {
      stopScanning()
    }
  }, scanTreshold)
}

// Simple ui for start, stop and timing
function onPageRequest (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'})
  res.write('<html><head><link rel="stylesheet" ' +
  'href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.5/css/bootstrap.min.css" /></head>' +
  '<body><label>Antal bilder<input class="form-control" id="pictures" max="100" min="1" ' +
  'type="number" value="36" /></label><button class="btn btn-success" id="start">' +
  'Start</button><button class="btn btn-danger" id="stop">Stop</button>')
  res.write('<script>document.getElementById("pictures").addEventListener("input", ' +
  'function () {numberOfPics = document.getElementById("pictures").value || 36;});' +
  'document.getElementById("start").addEventListener("click", startScanning, false);' +
  'document.getElementById("stop").addEventListener("click", stopScanning, false);' +
  '</script>')
  res.end('</body></html>')
}

// Wifi connection, go to http://1.2.3.4
var wlan
function onInit () {
  wlan = require('CC3000').connect()
  wlan.connect('WifiAccessPointName', 'WifiWPA2key', function (s) {
    if (s === 'dhcp') {
      require('http')
        .createServer(onPageRequest)
        .listen(80)
      console.log('Server created at ' + wlan.getIP().ip)
    }
  })
}

// Disconnect wifi, not used atm
// wlan.disconnect()

onInit()

save()
