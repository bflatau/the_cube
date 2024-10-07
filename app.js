require('dotenv').config();
const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const fetch  = require('node-fetch');
const { parse, end, toSeconds, pattern } = require('iso8601-duration');
var Airtable = require('airtable');
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY}).base('appDNK2Y3k5JoFysX');




////GET YOUTUBE VIDEO STUFF////

const musicVideos = [
  'eTeg1txDv8w', // Crash Test Dummies (MMMM MMM MMM)
  'h1Z89zW-8sY', // Our Lady Peace (Innocent)
  '72JtKmOoiFU', // Eminem (Real Slim Shady)
  'CduA0TULnow', // Britney Spears (Oops I did it again)
  'gJLIiF15wjQ', // Spice Grils (Wanabe)
  'lOfZLb33uCg', // Weird Al (Amish Paradise)
  'NOG3eus4ZSo', // Smashing Pumpkins (Tonight, Tonight)
  '3mbBbFH9fAg', // Soundgarden (Blackhole Sun)
  'dn3j6-yQKWQ', // Nine Inch Nails (Perfect Drug)
  'ruAi4VBoBSM', // Fatboy Slim (Praise you)
  'gUhRKVIjJtw', // Puff Daddy (mo money mo problems)
  '3qVPNONdF58', // Blind Melon (no rain)
  'jRGrNDV2mKc', // Korn (freak on a leash)
  'RYnFIRc0k6E', // Limp Bizkit (Rollin)
  'QtTR-_Klcq8', // Offspring (Pretty Fly for a White Guy)

]

let timeleft;
let youtubeVideo;
let videoLength; 


const app = express();
const server = createServer(app);
const io = new Server(server);


app.use(express.static('./static'));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

app.get('/currentvideo', (req, res) => {
  res.json({ currentVideo: youtubeVideo, currentTime: (videoLength - timeleft) });
});




async function getQueueVideo() {
  //AIRTABLE GET QUEUE VIDEO
  base('Table 1').select({
    // Selecting the first 3 records in Grid view:
    maxRecords: 1,
    view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function (record) {
      console.log('Retrieved', record.get('Link'));
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

  }, function done(err) {
    if (err) { console.error(err); return; }

    return 12
  });

}






function fakePlayVideo(video){
  videoLength = video.videoLength;
  timeleft = video.videoLength;
  youtubeVideo = video.video;

  io.emit("new youtube video", youtubeVideo)

  const videoTimer = setInterval(function(){
    timeleft -= 1;
    console.log('time left', timeleft)

    if(timeleft <= 1){
      clearInterval(videoTimer);
      console.log('song done!');
      startMusicPlayer();
    }
    // timeleft -= 1;
  }, 1000); 
}


async function getNewSong(){
  //PUT AIRTABLE FUNCTION HERE..

  var getOneSong = await base('Table 1').select({ maxRecords: 1, view: "Grid view" }).all()


  if(getOneSong[0]){ //if there is a song in the queue, do X
    console.log("this is one airtable song", getOneSong[0].fields, getOneSong[0].id)

  }else{ //if there is no songe in the queue, find a random song
    console.log('no records!')
  }



  console.log('getting new song');
  const randomSong = musicVideos[Math.floor(Math.random() * musicVideos.length)];
  const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails&id=${randomSong}&key=${process.env.YOUTUBE_API_KEY}` );
  const body = await response.text();
  const bodyObject = JSON.parse(body);

  return {
    video: randomSong,
    videoLength: toSeconds(parse(bodyObject.items[0].contentDetails.duration))
    }
}

function startMusicPlayer(){
  getNewSong().then(result => {fakePlayVideo(result)})
}

startMusicPlayer();


io.on('connection', function (socket) {
  // console.log(socket.client.conn.server.clientsCount + " users connected");
  io.emit('user count', socket.client.conn.server.clientsCount);

  socket.on("disconnect", (reason) => {
    // console.log(socket.client.conn.server.clientsCount + " users connected");
    io.emit('user count', socket.client.conn.server.clientsCount);

  });
});





// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
  
// });

// io.on('connection', (socket) => {
//   socket.on('chat message', (msg) => {
//     console.log('message: ' + msg);
//   });
// });

// io.on('connection', (socket) => {

//   socket.emit('current youtube video', youtubeVideo, videoLength - timeleft);
//   console.log('this is video', youtubeVideo , timeleft)
 
//   // socket.on('chat message', (msg) => {
//   //   io.emit('chat message', msg);
//   // });

//   // socket.on('video length', (msg) => {
//   //   console.log('this is video length', msg)
//   // });

// });


const PORT = 3000;
const HOST = '0.0.0.0';

server.listen((HOST, PORT), () => {
  console.log(`server running at http://${HOST}:${PORT}`);
});