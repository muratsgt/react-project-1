import firebase from "firebase/app";
import "firebase/auth";
import { customErrorHandler } from "../helper/customErrorHandler";

// firestore

const devConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
};

const prodConfig = {};

const config = process.env.NODE_ENV === "development" ? devConfig : prodConfig;
// react, root klasordeki .env klasorundeki degiskenlerden
// basinda REACT_APP_ yazanlari otomatik olarak process.env.NODE_ENV e atiyor

const actionCodeSettings = {
  url: "http://localhost:3000/",
  handleCodeInApp: false,
}

class Firebase {
  constructor() {
    // initialize check
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    } else {
      firebase.app(); // if already initialized, use that one
    }
    this.firebaseAuth = firebase.auth();
  }

  // register registerWithEmail
  async register(displayName, email, password) {
    try {
      await this.firebaseAuth.createUserWithEmailAndPassword(email, password);
      this.firebaseAuth.currentUser.updateProfile({
        displayName: displayName,
      });
      return "Success";
    } catch (err) {
      return customErrorHandler(err);
    }
  }

  // sign in/up with google
  signWithGoogle() {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: "select_account" });
    this.firebaseAuth.signInWithPopup(googleProvider);
  }

  // sign in function
  async singIn(email, password) {
    try {
      await this.firebaseAuth.signInWithEmailAndPassword(email, password);
      return "Success";
    } catch (err) {
      return customErrorHandler(err);
    }
  }

  // forgot password
  async forgotPass(email) {
    try {
      await this.firebaseAuth.sendPasswordResetEmail(email, actionCodeSettings);
      return "Success";
    } catch (err) {
      return customErrorHandler(err);
    }
  }

  // logout signOut
  signOut() {
    this.firebaseAuth.signOut();
  }
  // forgot password
}

export default new Firebase();
