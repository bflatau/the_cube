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