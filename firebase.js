import firebase from 'firebase';
import 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnaYWtYjrmwJ6h-Z8sY_7TNVX9EVGFFsQ",
  authDomain: "facebook-to-7bf04.firebaseapp.com",
  projectId: "facebook-to-7bf04",
  storageBucket: "facebook-to-7bf04.appspot.com",
  messagingSenderId: "889944000778",
  appId: "1:889944000778:web:669cb1978953826d5f12f3"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = app.firestore();
const storage = firebase.storage();

export { db, storage };
