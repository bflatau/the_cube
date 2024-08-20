const { google } = require("googleapis");



const apiKey = process.env.YOUTUBE_API_KEY
const apiUrl = "https://www.googleapis.com/youtube/v3";
const youtube = google.youtube({
    version: "v3",
    auth: apiKey,
});
