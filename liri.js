require("dotenv").config();

const keys = require('./keys.js');
const fs = require('fs')
const Spotify = require('node-spotify-api');
const axios = require('axios');

var spotify = new Spotify(keys.spotify);

if(!process.argv[2]){
    console.log("PLease use one of these search terms!");
    console.log("spotify + song name");
    console.log("concert + artist");
}
else{
    let searchQuery = ""
    if(process.argv[3]){searchQuery = process.argv[3].toLowerCase().trim()}
    switch(searchTerm){
        case "spotify":
        liriSpot("track",searchQuery);
        break;

        case "movie":
        liriMovie(searchQuery);
        break;

        default:
            console.log("Please use one of the search terms!");
            console.log("spotify + song name");
            console.log("concert + artist");

        }
    }
//==============-v-movies-v-==============
function liriMovie(query){
    axios
      .get(`http://www.omdbapi.com/?t=${query}&apikey=${keys.modules.omdb}`)
      .then(function(response) {
        const movie = response.data
        console.log(`Title: ${movie.Title}`);
        console.log(`Actors: ${movie.Actors}`);
        console.log(`Rated: ${movie.Rated}`);
        console.log(`Release Date: ${movie.Released}`);
        console.log(`IMDB Rating: ${movie.Ratings[0].Value}`);
        console.log(`Runtime: ${movie.Runtime}`);
        console.log(`Plot: ${movie.Plot}`);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
}

//==============-v-Spotify-v-==============

function liriSpot(type,query){
    spotify
      .search({ type: type, query: query })
      .then(function(response) {
        const song = response.tracks.items[0]
        console.log(`Artist Name: ${song.artists[0].name}`)
        console.log(`Song Name: ${song.name}`)
        console.log(`Album Name: ${song.album.name} (${song.album.total_tracks} tracks)`)
        console.log(`Spotify Preview URL: ${song.external_urls.spotify}`)
      })
      .catch(function(err) {
        console.log(err);
      });
}