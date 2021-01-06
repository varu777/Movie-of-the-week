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

admin.initializeApp({
  credential: admin.credential.cert(
    {
        "type": "service_account",
        "project_id": process.env.DB_PROJECT_ID,
        "private_key_id": process.env.DB_PRIVATE_KEY_ID,
        "private_key": process.env.DB_PRIVATE_KEY,
        "client_email": process.env.DB_CLIENT_EMAIL,
        "client_id": process.env.DB_CLIENT_ID, 
        "auth_uri": process.env.DB_AUTH_URI,
        "token_uri": process.env.DB_AUTH_TOKEN_URI,
        "auth_provider_x509_cert_url": process.env.DB_AUTH_PROVIDER,
        "client_x509_cert_url": process.env.DB_CLIENT_CERT_URL
    }),
  databaseURL: "https://moviepicker-33a06-default-rtdb.firebaseio.com"
});

const db = firebase.firestore();

module.exports = db;