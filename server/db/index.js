const firebase = require('firebase');
var admin = require("firebase-admin");
require('dotenv').config()

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: process.env.DB_API_KEY,
    authDomain: process.env.DB_AUTH_DOMAIN,
    projectId: process.env.DB_PROJECT_ID,
    storageBucket: process.env.DB_STORAGE_BUCKET,
    messagingSenderId: process.env.DB_MESSAGING_SENDER_ID,
    appId: process.env.DB_APP_ID, 
    measurementId: process.env.DB_MEASUREMENT_ID
});

const db = firebase.firestore();

module.exports = db;