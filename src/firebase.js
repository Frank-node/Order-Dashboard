import firebase from "firebase";

let DB_CONFIG = {
  apiKey: "AIzaSyCMdKZ0dv7AVqBHmQqpKkAZ3NU5DCPgzLk",
  authDomain: "order-dashboard-7a2cd.firebaseapp.com",
  databaseURL: "https://order-dashboard-7a2cd.firebaseio.com",
  projectId: "order-dashboard-7a2cd",
  storageBucket: "order-dashboard-7a2cd.appspot.com",
  messagingSenderId: "89638021951",
  appId: "1:89638021951:web:34298ad97f3f93a83c818a",
  measurementId: "G-YJ7490ZPC3",
};

firebase.initializeApp(DB_CONFIG);
export default firebase;
