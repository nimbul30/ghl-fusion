// This is the complete and correct code for this file.
// It initializes Firebase and exports the services your app needs.

import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// ===================================================================
// THIS IS THE ONLY PART OF THE FILE YOU NEED TO EDIT
// Replace the placeholder object below with your actual firebaseConfig
// that you have saved.
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY_HERE',
  authDomain: 'YOUR_AUTH_DOMAIN_HERE',
  projectId: 'YOUR_PROJECT_ID_HERE',
  storageBucket: 'YOUR_STORAGE_BUCKET_HERE',
  messagingSenderId: 'YOUR_SENDER_ID_HERE',
  appId: 'YOUR_APP_ID_HERE',
};
// ===================================================================

// DO NOT TOUCH THE CODE BELOW THIS LINE
// This code initializes and exports the Firebase services.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
