/* global digitalWrite, A5, A6, save */
/* eslint-disable no-unused-vars */

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
// Default number of slides in session
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

function closeRelay (relay, treshold) {
  console.log('Closing ' + relay)
  digitalWrite(relay, false)
  setTimeout(function () {
    openRelay(relay)
  }, treshold)
}

function openRelay (relay) {
  console.log('Opening ' + relay)
  digitalWrite(relay, true)
}

// Close second relay on port A6 for a while
function takePicture () {
  setTimeout(function () {
    closeRelay(A6, takePictureButtonTreshold, false)
    document.getElementById('scanned').innerHTML = numberOfScans
  }, takePictureTreshold)
}

// Close first relay on port A5 for a while,
// wait for feeding, then take picture
function feedNewPic () {
  closeRelay(A5, feedNewPicButtonTreshold, true)
  setTimeout(function () {
    takePicture()
  }, feedNewPicTreshold)
}

// Start feed/scan loop
function startScanning () {
  scanPics = setInterval(function () {
    feedNewPic()
    console.log(numberOfScans + ':' + numberOfPics)
    if (++numberOfScans >= numberOfPics) {
      stopScanning()
    }
  }, scanTreshold)
}

// Simple ui for start, stop and setting number of slides
function onPageRequest (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'})
  res.write('<html><head><meta content="width=device-width, initial-scale=1" name="viewport">' +
  '<style>*,:after,:before,input{box-sizing:inherit}button,input{height:3.8rem}' +
  'html{box-sizing:border-box;font-size:62.5%}body{color:#606c76;' +
  'font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:1.6em;font-weight:300;letter-spacing:.01em;' +
  'line-height:1.6}button,label{font-weight:700}button{background-color:#9b4dca;border:.1rem solid #9b4dca;' +
  'border-radius:.4rem;color:#fff;cursor:pointer;display:inline-block;font-size:1.1rem;letter-spacing:.1rem;' +
  'line-height:3.8rem;padding:0 3rem;text-align:center;text-decoration:none;text-transform:uppercase;white-space:nowrap}' +
  '.button:focus,.button:hover{background-color:#606c76;border-color:#606c76;color:#fff;outline:0}' +
  'input{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;' +
  'border:.1rem solid #d1d1d1;border-radius:.4rem;box-shadow:none;padding:.6rem 1rem;width:100%}' +
  'input:focus{border-color:#9b4dca;outline:0}label{display:block;font-size:1.6rem;margin-bottom:.5rem}' +
  '.container{margin:0 auto;max-width:112rem;padding:0 2rem;position:relative;width:100%}' +
  'button{margin-bottom:1rem}p{margin-top:0;margin-bottom:2.5rem}</style>' +
  '</head><body class="container"><h1>Speed scanner</h1><hr><label>Number of slides' +
  '<input class="form-control" id="pictures" max="100" min="1" type="number" ' +
  'onkeypress="return event.charCode === 0 || /\d/.test(String.fromCharCode(event.charCode));"' +
  'value="' + numberOfPics +'" /></label>' +
  '<button class="btn btn-success" id="start">Start</button>' +
  '<button class="btn btn-danger" id="stop">Stop</button>' +
  '<p>Slides scanned: <span id="scanned"></span></p>')
  res.write('<script>document.getElementById("pictures").addEventListener("input", ' +
  'function () {numberOfPics = this.value ? this.value : ' + numberOfPics +';});' +
  'document.getElementById("start").addEventListener("click", startScanning, false);' +
  'document.getElementById("stop").addEventListener("click", stopScanning, false);' +
  '</script>')
  res.end('</body></html>')
}

// Wifi connection
var wlan
function onInit () {
  wlan = require('CC3000').connect()
  // Do not forget to change 'WifiAccessPointName', 'WifiWPA2key' to your own wifi networks name and pw
  wlan.connect('WifiAccessPointName', 'WifiWPA2key', function (s) {
    if (s === 'dhcp') {
      require('http')
        .createServer(onPageRequest)
        .listen(80)
      console.log('Server created at ' + wlan.getIP().ip)
      // Now you can open up a browser at the ip given above
      // A page with the ui should show up
    }
  })
}

// Disconnect wifi, not used atm
// wlan.disconnect()
