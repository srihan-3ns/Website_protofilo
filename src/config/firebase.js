import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';

// Firebase project configuration for MyHostalApp
const firebaseConfig = {
  apiKey: "AIzaSyAYGWatqj8O5wrpM1qdkRRXb4oXHE5N9Xc",
  authDomain: "myhostalapp-b6a0d.firebaseapp.com",
  projectId: "myhostalapp-b6a0d",
  storageBucket: "myhostalapp-b6a0d.firebasestorage.app",
  messagingSenderId: "797143495426",
  appId: "1:797143495426:web:cd37c5da2638538ea9c81b",
  measurementId: "G-6XF0BEZ3F2"
};

let app = null;
let auth = null;

try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
} catch (error) {
  console.warn("Firebase initialization warning:", error);
}

/**
 * Sign in using Firebase Authentication
 */
export const firebaseSignIn = async (email, password) => {
  if (!auth) throw new Error("Firebase Auth is not initialized.");
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

/**
 * Register a new user using Firebase Authentication
 */
export const firebaseSignUp = async (email, password, displayName) => {
  if (!auth) throw new Error("Firebase Auth is not initialized.");
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName && userCredential.user) {
    try {
      await updateProfile(userCredential.user, { displayName });
    } catch (e) {
      console.warn("Could not set display name:", e);
    }
  }
  return userCredential.user;
};

/**
 * Sign out from Firebase
 */
export const firebaseSignOut = async () => {
  if (auth) {
    await signOut(auth);
  }
};

/**
 * Subscribe to auth state changes
 */
export const subscribeToAuthChanges = (callback) => {
  if (!auth) return () => {};
  return onAuthStateChanged(auth, callback);
};

export {
  app,
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
};
