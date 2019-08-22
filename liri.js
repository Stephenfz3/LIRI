// link that contains our .env file that contains sensitive api key info.
require("dotenv").config();

//-----------------Program VARIABLES---------------------//

//Variables that links this file to our keys.js file
var keys = require("./keys.js");

//Variable that links our spotify api package
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

//Variable that links our moment package 
var moment = require('moment'); //Both required to use moment for node
moment().format();

var axios = require('axios');

//Variable that links out fs package that read the random.txt file
var fs = require('fs'); 

//Variable for the user command in node/terminal position 2
var command = process.argv[2]; 

//Variable for the user input in node/terminal position 3
var value = process.argv[3]; 
 
 //------------------------NODE COMMANDS------------------------//
 console.log("hey");
 
 switch (command) {
  case "concert-this":
      concertThis(value);
      break;
  case "spotify-this-song":
      spotifySong(value);
      break;
  case "movie-this":
      movieThis(value);
      break;
  case "do-what-it-says":
      doThis(value);
      break;
      
};

function concertThis(value) {
  axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
  .then(function(response) {    
      for (var i = 0; i < response.data.length; i++) {

          var datetime = response.data[i].datetime;
          var dateArr = datetime.split('T'); 

          var concertResults = 
              "--------------------------------------------------------------------" +
                  "\nVenue Name: " + response.data[i].venue.name + 
                  "\nVenue Location: " + response.data[i].venue.city +
                  "\nDate of the Event: " + moment(dateArr[0], "MM-DD-YYYY"); 
      }
  })
  .catch(function (error) {
      console.log(error);
  });
      

}

function spotifySong(value) {
  if(!value){
      value = "";
  }
  spotify
  .search({ type: 'track', query: value })
  .then(function(response) {
      for (var i = 0; i < 5; i++) {
          var spotifyResults = 
              "--------------------------------------------------------------------" +
                  "\nArtist(s): " + response.tracks.items[i].artists[0].name + 
                  "\nSong Name: " + response.tracks.items[i].name +
                  "\nAlbum Name: " + response.tracks.items[i].album.name +
                  "\nPreview Link: " + response.tracks.items[i].preview_url;
                  
          console.log(spotifyResults);
      }
  })
  .catch(function(err) {
      console.log(err);
  });
}

function movieThis(value) {
  if(!value){
      value = "";
  }
  axios.get("https://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy")
  .then(function(response) {
          var movieResults = 
              "--------------------------------------------------------------------" +
                  "\nMovie Title: " + response.data.Title + 
                  "\nYear of Release: " + response.data.Year +
                  "\nIMDB Rating: " + response.data.imdbRating +
                  "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
                  "\nCountry Produced: " + response.data.Country +
                  "\nLanguage: " + response.data.Language +
                  "\nPlot: " + response.data.Plot +
                  "\nActors/Actresses: " + response.data.Actors;
          console.log(movieResults);
  })
  .catch(function (error) {
      console.log(error);
  });
  
}

function doThis(value) {

  fs.readFile("random.txt", "utf8", function(error, data) {
      if (error) {
          return console.log(error);
      }
      var dataArr = data.split(',');
      spotifySong(dataArr[0], dataArr[1]);
  })
}
  

