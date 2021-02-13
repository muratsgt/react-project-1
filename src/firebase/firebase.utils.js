import firebase from "firebase/app";
import "firebase/auth";
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

class Firebase {
  constructor() {
    // TODO: add initialize check
    firebase.initializeApp(config);
    this.firebaseAuth = firebase.auth();
  }

  // register registerWithEmail
  register(displayName, email, password) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password) // async
      .then(() => {
        this.firebaseAuth.currentUser.updateProfile({
          displayName: displayName,
        });
      })
      .catch((err) => console.log(err));
  }

  // sign in/up with google
  signWithGoogle() {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: "select_account" });
    this.firebaseAuth.signInWithPopup(googleProvider);
  }

  // login signinWithEmailandPassword
  signIn(email, password) {
    this.firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  // logout signOut
  signOut() {
    this.firebaseAuth.signOut();
  }
  // forgot password
}

export default new Firebase();
