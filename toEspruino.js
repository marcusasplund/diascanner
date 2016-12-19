/*  global digitalWrite, A8, B7, save */
/*  eslint-disable no-unused-vars */
var scanTreshold = 1000
var feedNewPicTreshold = 500
var takePictureTreshold = 300
var numberOfPics = 36
var numberOfScans = 0 // DO NOT CHANGE!
var scanPics

function stopScanning () {
  clearInterval(scanPics)
  numberOfScans = 0
}

function takePicture () {
  console.log('Closing B7')
  digitalWrite(B7, true)
  setTimeout(function () {
    console.log('Opening B7')
    digitalWrite(B7, false)
  }, takePictureTreshold)
}

function feedNewPic () {
  console.log('Closing A8')
  digitalWrite(A8, true)
  setTimeout(function () {
    console.log('Opening A8')
    digitalWrite(A8, false)
    takePicture()
  }, feedNewPicTreshold)
}

function startScanning () {
  scanPics = setInterval(function () {
    feedNewPic()
    console.log(numberOfScans + ':' + numberOfPics)
    if (++numberOfScans === numberOfPics) {
      stopScanning()
    }
  }, scanTreshold)
}

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

onInit()

save()
