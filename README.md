# Speedscanner for slides
[![GitHub issues](https://img.shields.io/github/issues/marcusasplund/diascanner.svg)](https://github.com/marcusasplund/diascanner/issues)

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

Automatic speedscanner for slides with Espruino Pico

A js-port of: [http://www.stockholmviews.com/speedscanner/](http://www.stockholmviews.com/speedscanner/),
much more detailed project description available there. 

## Hardware used

1. [Espruino Pico](http://www.espruino.com/Pico) microcontroller

  ![Espruino Pico](/illustrations/Pico_angled.jpg)

2. [Adafruit CC3000](https://learn.adafruit.com/adafruit-cc3000-wifi/cc3000-breakout) wifi breakout board
  
  ![CC3000 Adafruit](/illustrations/CC3000_adafruit.jpg)
  
  This board seems discontinued, but i had one lying around and it is working fine with the Pico. I do not know if there are   alternatives for use together with the Pico. You might find it in aliexpress, ebay or similar.
  
  * [Buy CC3000 on Aliexpress](https://www.aliexpress.com/wholesale?SearchText=CC3000+wifi)
  * [Buy CC3000 on Ebay](http://www.ebay.com/sch/i.html?_nkw=CC3000+wifi)

3. 2-channel relay module

  ![2-channel relay module](/illustrations/relay.jpg)
  * [Buy 2-channel relay module on Aliexpress](https://www.aliexpress.com/wholesale?SearchText=2-channel+relay+module)
  * [Buy 2-channel relay module on Ebay](http://www.ebay.com/sch/i.html?_nkw=2+channel+relay+module)

4. A DSLR of your choice with a Macro

5. A remote shutter cable for said DSLR

6. An old Slide projector with cable remote controlled feed (IR might work as well, if you can connect that to the relay with cables)

7. Optional 3.7v - 5v DC powersource for driving the Pico and relays standalone disconnected from USB

### Basic instructions (to be updated)

Rip out the optics from the slide projector, bolt the projector to a board.

Position and fasten a camera bracket in front of the projector.

Wire the relay module to the Pico, be sure to have neat connections (preferably solder) everywhere.

| Relay module | Espruino |
| ------------ | -------- |
| GND          | GND      |
| VOC          | VBAT     |
| IN1          | A5       |
| IN2          | A6       |

Cut the cables to both remotes and connect the right cables to each relay.

Which cables to fit where from the relayes to the remotes, you have to figure out your self as this might vary depending of
the configuration of the remote cables you are using.

Wire up the CC3000 to the Pico: [instructions here](http://www.espruino.com/CC3000),
be sure to have neat connections (preferably solder) everywhere.

| CC3000    | Espruino   |
| --------- | ---------- |
| GND       | GND        |
| 3v3       | Do not use |
| VIN       | VBAT       |
| CLK/SCK   | B3         |
| DOUT/MISO | B4         |
| DIN/MOSI  | B5         |
| CS        | B6         |
| EN/VBEN   | B7         |
| IRQ       | B8         |

Change 'WifiAccessPointName', 'WifiWPA2key' to your wifi networks name and key

Flash js/script.js onto Pico with the [Espruino IDE](http://www.espruino.com/Web+IDE)

To persist script type save() and then hit enter in the left panel of the IDE console

To manually start type onInit() a and then hit enter in the left panel of the IDE console, see that everything looks right in the left hand panel of the IDE

Connect to Pico by opening a browser at the IP-address given in the left hand side of the 
console after the string 'Server created at ' (eg http://105.21.363.87)

You should now see this screen in that browser:

![Espruino Pico](/illustrations/screen.png)

Start scanning
### Optional upgrade for the projector
1. 50W led

  * [Buy 50W led on Aliexpress](https://www.aliexpress.com/wholesale?SearchText=50w+led+chip)
  * [Buy 50W led on Ebay](http://www.ebay.com/sch/i.html?_nkw=50w+led+chip)
