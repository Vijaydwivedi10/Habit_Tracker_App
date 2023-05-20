import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDi_KD92NN_-SIKHq9viP-RKofauNFP5b0",
  authDomain: "habit-tracker-409bd.firebaseapp.com",
  databaseURL: "https://habit-tracker-409bd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "habit-tracker-409bd",
  storageBucket: "habit-tracker-409bd.appspot.com",
  messagingSenderId: "146003024957",
  appId: "1:146003024957:web:34546d376a5c7bd71bde54",
  measurementId: "G-Z67XDDMWMB"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const app = {
  firebase,
  auth: firebase.auth(),
  firestore: firebase.firestore(),
  db: firebase.database(),
};

export default app;
