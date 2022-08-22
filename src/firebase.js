import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    onSnapshot,
    orderBy,
    query
  } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAgLv2u57vpSbIi9yHgBE2MaL7dr_a-MYk",
    authDomain: "clone-11d2b.firebaseapp.com",
    projectId: "clone-11d2b",
    storageBucket: "clone-11d2b.appspot.com",
    messagingSenderId: "393030588190",
    appId: "1:393030588190:web:7024046437a6c907dc9b0f"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {db, addDoc, collection, auth, provider};