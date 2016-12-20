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
  
  This board seems discontinued, but i had one lying around and it is working fine with the Pico. I do not know if there are   alternatives for use together with the Pico.

3. 2-channel relay module

  ![2-channel relay module](/illustrations/relay.jpg)
  * [Buy 2-channel relay module on Aliexpress](https://www.aliexpress.com/wholesale?SearchText=2-channel+relay+module)
  * [Buy 2-channel relay module on Ebay](http://www.ebay.com/sch/i.html?_nkw=2+channel+relay+module)

4. A DSLR of your choice with a Macro

5. A remote shutter cable for said DSLR

6. An old Slide projector with remote controlled feed

7. Optional 5v DC powersource for driving the Pico and relays standalone, disconnected from USB

### Basic instructions (to be updated)

Rip out the optics from the slide projector, bolt the projector to a board.

Position and fasten a camera bracket in front of the projector.

Wire the relay module to the Pico:
  * GND to GND
  * VOC to VBAT
  * IN1 to A5
  * IN2 to A6

Cut the cables to both remotes and connect the right cables to each relay.

Which cables to fit where, you have to figure out your self as this might vary depending of
the configuration of the remote cables you are using.

Wire up the CC3000 to the Pico: [instructions here](http://www.espruino.com/CC3000)

Flash js/script.js onto Pico with the [Espruino IDE](http://www.espruino.com/Web+IDE)

Connect to Pico through http://1.2.3.4

Start scanning
### Optional upgrade for the projector
1. 50W led

  * [Buy 50W led on Aliexpress](https://www.aliexpress.com/wholesale?SearchText=50w+led+chip)
  * [Buy 50W led on Ebay](http://www.ebay.com/sch/i.html?_nkw=50w+led+chip)
