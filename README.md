# Speedscanner for slides
[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

Automatic speedscanner for slides with Espruino Pico

A clone of model described at: [http://www.stockholmviews.com/speedscanner/](http://www.stockholmviews.com/speedscanner/),
much more detailed project description available there.

## Hardware used

1. [Espruino Pico](http://www.espruino.com/Pico) microcontroller

  ![Espruino Pico](https://raw.githubusercontent.com/marcusasplund/diascanner/master/illustrations/Pico_angled.jpg)

2. [Adafruit CC3000 wifi breakout board](https://learn.adafruit.com/adafruit-cc3000-wifi/cc3000-breakout)
  
  This board seems discontinued, but i had one lying around and it is working fine with the Pico. I do not know if there are   alternatives for use together with the Pico.

3. 2-channel relay module

  ![2-channel relay module](https://raw.githubusercontent.com/marcusasplund/diascanner/master/illustrations/relay.jpg)
  * [Buy 2-channel relay module on Aliexpress](https://www.aliexpress.com/wholesale?SearchText=2-channel+relay+module)
  * [Buy 2-channel relay module on Ebay](http://www.ebay.com/sch/i.html?_nkw=2+channel+relay+module)

4. A DSLR of your choice with a Macro

5. A remote shutter cable for said DSLR

6. An old Slide projector with remote controlled feed

Cut the cables to both remotes and connect the right cables to each relay,
what cables to fit where, you have to figure out your self as this might vary depending of
the configuration of the remote cables you are using

### Optional upgrade for the projector
1. 50W led

  * [Buy 50W led on Aliexpress](https://www.aliexpress.com/wholesale?SearchText=50w+led+chip)
  * [Buy 50W led on Ebay](http://www.ebay.com/sch/i.html?_nkw=50w+led+chip)
