import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Spotify from './util/Spotify.js';

const spotify = new Spotify();

ReactDOM.render(<App spotify={spotify} />, document.getElementById('root'));
registerServiceWorker();
