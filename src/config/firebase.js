import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0k6joVLP1iDfP2NoSgiSv3QEUEHKeoTM",
  authDomain: "eventos-96f05.firebaseapp.com",
  databaseURL: "https://eventos-96f05.firebaseio.com",
  projectId: "eventos-96f05",
  storageBucket: "eventos-96f05.appspot.com",
  messagingSenderId: "207679867295",
  appId: "1:207679867295:web:7f84b68c4f96a46dcad5aa",
  measurementId: "G-QXDY47RDFV"
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);