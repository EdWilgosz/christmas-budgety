import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase/app';
import configureStore from './store/config-store';

const firebaseConfig = {
    apiKey: "AIzaSyBftjzV0ofX-CZLdITMdtheMChZWkOO86A",
    authDomain: "christmas-budgety.firebaseapp.com",
    databaseURL: "https://christmas-budgety.firebaseio.com",
    projectId: "christmas-budgety",
    storageBucket: "christmas-budgety.appspot.com",
    messagingSenderId: "944646267993",
    appId: "1:944646267993:web:1d64b5bf76f0c5a7933d48"
  };

firebase.initializeApp(firebaseConfig);

configureStore();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
