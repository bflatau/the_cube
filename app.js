require('dotenv').config();
const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const fetch  = require('node-fetch');
const { parse, end, toSeconds, pattern } = require('iso8601-duration');

// import fetch from 'node-fetch';

const app = express();
const server = createServer(app);
const io = new Server(server);




app.use(express.static('./static'));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});


////GET YOUTUBE VIDEO STUFF////

const musicVideos = [
  'asdfasd', /// VIDEO NAME
  'asdfasdf', /// VIDEO NAME
]

const randomElement = array[Math.floor(Math.random() * array.length)];

// const months = ["January", "February", "March", "April", "May", "June", "July"];

// const random = Math.floor(Math.random() * months.length);
// console.log(random, months[random]);

async function benTest(){
  const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails&id=Ks-_Mh1QhMc&key=${process.env.YOUTUBE_API_KEY}` );
  // const body = await response.text();
  const body = await response.text();

  const bodyObject = JSON.parse(body);

  // console.log(bodyObject.items[0].contentDetails.duration);

  console.log(toSeconds(parse(bodyObject.items[0].contentDetails.duration)));

}


benTest()



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

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('video length', (msg) => {
    console.log('this is video length', msg)
  });

});


const PORT = 3000;
const HOST = '0.0.0.0';

server.listen((HOST, PORT), () => {
  console.log(`server running at http://${HOST}:${PORT}`);
});