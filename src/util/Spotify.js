import querystring from 'querystring';
import SpotifyKey from '../keys.js';

export const apiKey = SpotifyKey.Spotify;

class Spotify {
  constructor() {
    this._clientId = apiKey;
    this._scopes = 'playlist-modify-private%20playlist-modify-public%20playlist-read-private%20user-read-private%20user-read-email';
    this._accessToken = querystring.parse(window.location.hash.replace('#', '')).access_token;
    this._userId = null
  }

  get accessToken() {
    return this._accessToken;
  }

  loginFunction() {
    const redirectUri = 'http:%2F%2Flocalhost:3000%2Fcallback';
    const clientId = apiKey;
    const scopes = 'playlist-modify-private%20playlist-modify-public%20playlist-read-private%20user-read-private%20user-read-email';
    const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token&state=123`;
    window.location.href = url;
  }

  getMe() {
    return fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this._accessToken
      }
    })
    .then(response => { return response.json(); })
    .then(jsonResponse => {
      this._userId = jsonResponse.id
      return {
        id: jsonResponse.id
      };
    })
    .catch(error => { return error; });
  }

  getSearch(valueSpotifySearch) {
    return fetch(`https://api.spotify.com/v1/search?q=${valueSpotifySearch}&type=track,album,artist`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this._accessToken
      }
    })
    .then(response => { return response.json(); })
    .then(jsonResponse => {
      let trackItems = [];
      if (!jsonResponse.error) {
        trackItems = jsonResponse.tracks.items;
      }
      return trackItems;
    })
    .catch(error => { return error; });
  }

  getMyPlaylists() {
    return fetch('https://api.spotify.com/v1/me/playlists?limit=50', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this._accessToken
      }
    })
    .then(response => { return response.json(); })
    .then(jsonResponse => {
      // 1183526059 owner.id
      // collaborative true
      const jsonItemsPlaylist = jsonResponse.items;
      const accessiblePlaylists = jsonItemsPlaylist.filter(item => {
        if (item.owner.id === this._userId || item.collaborative) {
          return true;
        } else {
          return false;
        }
      });
      return accessiblePlaylists;
    })
    .catch(error => { return error; });
  }

  postPlaylist(newPlaylistName, userId, tracks) {
    console.log(userId);
    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: "POST",
      body: JSON.stringify({
        name: newPlaylistName
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this._accessToken
      }
    })
    .then(response => { return response.json(); })
    .then(jsonResponse => {
      const playlistId = jsonResponse.id;
      console.log(playlistId);

      return this.postUpdatePlaylist(playlistId, userId, tracks);
    })
    .catch(error => {
      console.log(error);
      return error;
    });
  }

  postUpdatePlaylist(playlistId, userId, tracks) {
    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
      method: "POST",
      body: JSON.stringify({
        uris: tracks.map(track => {
          return track.uri;
        })
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this._accessToken
      }
    })
    .then(response => { return response.json(); })
    .then(jsonResponse => {
      console.log('!');
      return 'success';
    })
    .catch(error => { return error; });
  }
}

export default Spotify;
