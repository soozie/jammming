import querystring from 'querystring';
import SpotifyKey from '../keys.js';

export const apiKey = SpotifyKey.Spotify;

// `This object will store the functionality needed to interact with the Yelp API.`
export const Spotify = {
  // `This is the method we’ll use to retrieve search results from the Yelp API.`
  login: () => {
    console.log(apiKey);
    var scope = 'user-read-private user-read-email';
    const url = `https://accounts.spotify.com/authorize?client_id=${apiKey}&redirect_uri=http:%2F%2Flocalhost:3000%2Fcallback&scope=user-read-private%20user-read-email&response_type=token&state=123`;
    return fetch(url, {
      mode: 'no-cors'
    });
  }
};

window.Spotify = Spotify;
