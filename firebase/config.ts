// This file is the single source of truth for the Firebase configuration.

import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY', // Replace with your actual credentials
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

// Initialize Firebase for client-side rendering
// A check is made to prevent re-initializing the app on every hot-reload.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export the initialized Firebase services that the rest of your app will use.
// These are the only things that should be imported from this file.
export const auth = getAuth(app);
export const db = getFirestore(app);
