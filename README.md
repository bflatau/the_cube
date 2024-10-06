# the_cube


### REFERENCE
https://developers.google.com/youtube/iframe_api_reference#Playback_status

//NODE:
https://developers.google.com/youtube/v3/quickstart/nodejs

https://awesomecoding.co/posts/tutorial-using-youtube-javascript-api

https://www.youtube.com/watch?v=3VHCxuxtuL8

https://github.com/monsterlessonsacademy/monsterlessonsacademy/blob/108-how-to-use-youtube-api-in-node/server.js

https://blog.tericcabrel.com/retrieve-videos-youtube-data-api-v3-nodejs/




//on video load, send time to server
//server sends a broadcast of current time every second so that new users load at X time to be in sync with everyone else
// if the timing is slightly off, the video will get cut off but then everyone will be in sync again


####
Video Properties
https://developers.google.com/youtube/v3/docs/videos#properties


### META FOR SCRAPING

//get request on front end to verify 

<meta property="og:video:url" content="https://www.youtube.com/embed/eTeg1txDv8w"> (probably can just grab end of URL??)

<meta itemprop="identifier" content="eTeg1txDv8w">

<meta itemprop="genre" content="Music">


## RASPI

https://www.adafruit.com/product/2423

The last known for-sure tested-and-working version is Dec 11, 2023 (https://downloads.raspberrypi.org/raspios_lite_arm64/images/raspios_lite_arm64-2023-12-11/) from https://downloads.raspberrypi.org/raspios_lite_arm64/images/



https://downloads.raspberrypi.org/raspios_full_armhf/images/raspios_full_armhf-2023-12-06/


RESISTIVE!!!! (order is wrong!)


https://learn.adafruit.com/adafruit-pitft-28-inch-resistive-touchscreen-display-raspberry-pi/easy-install-2



https://forums.raspberrypi.com/viewtopic.php?f=66&t=133691


https://fleetstack.io/blog/raspberry-pi-kiosk-tutorial


https://www.adafruit.com/product/2423

sudo apt install --no-install-recommends chromium-browser

sudo apt install unclutter // hides mouse cursor

sudo nano /etc/xdg/lxsession/LXDE-pi/autostart

install desktop: sudo apt install xserver-xorg raspberrypi-ui-mods

@xset s noblank
@xset s off
@xset -dpms
@unclutter -idle 0.1 -root
@chromium-browser --noerrdialogs --disable-infobars --kiosk https://the-cube.fly.dev

## BENDO INSTRUCTIONS

Install lite version of OS
Install Screen stuff
Add in desktop
INstall chrome + no cursor
autoplay chrome


## audio

set audio in raspi-config

`alsamixer` ---> set audio volume

https://www.raspberrypi-spy.co.uk/2019/06/using-a-usb-audio-device-with-the-raspberry-pi/
