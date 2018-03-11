import querystring from 'querystring';
import SpotifyKey from '../keys.js';

export const apiKey = SpotifyKey.Spotify;

class Spotify {
  constructor() {
    this._clientId = apiKey;
    this._scopes = 'playlist-modify-private%20playlist-modify-public%20playlist-read-private%20user-read-private%20user-read-email';
    this._accessToken = querystring.parse(window.location.hash.replace('#', '')).access_token;
  }

  customFetch(valueSpotifySearch) {
    return fetch(`https://api.spotify.com/v1/search?q=${valueSpotifySearch}&type=track,album,artist`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this._accessToken
      }
    })
    .then(response => { return response.json(); })
    .then(jsonResponse => {
      const trackItems = jsonResponse.tracks.items;
      return trackItems;
    })
    .catch(error => { return error; });
  }
}

export default Spotify;
