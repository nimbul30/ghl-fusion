'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Define the shape of our settings object
interface CustomizationSettings {
  message: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<CustomizationSettings>({
    message: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // This function fetches the user's settings from Firestore.
  // It's wrapped in useCallback for performance.
  const fetchSettings = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    // In Firestore, we'll create a document for each user in the 'customizations'
    // collection, using their unique UID as the document ID.
    const docRef = doc(db, 'customizations', user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // If the document exists, set the settings from its data.
      setSettings(docSnap.data() as CustomizationSettings);
    } else {
      // If it doesn't exist, initialize with a default message.
      setSettings({ message: 'Welcome! This is your default message.' });
    }
    setLoading(false);
  }, [user]);

  // useEffect runs the fetchSettings function once the user is available.
  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  // This function saves the current settings to Firestore.
  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    const docRef = doc(db, 'customizations', user.uid);
    try {
      // setDoc will create the document if it doesn't exist, or
      // completely overwrite it if it does. This is perfect for settings.
      await setDoc(docRef, settings);
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving document: ', error);
      alert('Failed to save settings.');
    }
    setSaving(false);
  };

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div className="w-full max-w-lg text-center">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      <p className="mb-8">
        Welcome, {user?.email}! Here you can edit your settings.
      </p>

      <div className="text-left">
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Your Custom Message
        </label>
        <textarea
          id="message"
          rows={4}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          value={settings.message}
          onChange={(e) =>
            setSettings({ ...settings, message: e.target.value })
          }
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-6 w-full px-6 py-3 font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-400"
      >
        {saving ? 'Saving...' : 'Save Settings'}
      </button>
    </div>
  );
}
