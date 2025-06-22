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
  apiKey: 'AIzaSyB-Lk2ZeuJg-MyS-egO2PDHoRiVCInK8R8',
  authDomain: 'ghl-fusion-firebase.firebaseapp.com',
  projectId: 'ghl-fusion-firebase',
  storageBucket: 'ghl-fusion-firebase.firebasestorage.app',
  messagingSenderId: '810057674335',
  appId: '1:810057674335:web:84d83548a10c05716d35ea',
};

// ===================================================================

// DO NOT TOUCH THE CODE BELOW THIS LINE
// This code initializes and exports the Firebase services.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
