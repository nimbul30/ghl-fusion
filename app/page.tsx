'use client';

// Import useEffect, which we will now use
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase/config';
import { useRouter } from 'next/navigation';
import Dashboard from './components/Dashboard';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // THE FIX IS HERE:
  // We use a useEffect hook to handle the redirection.
  useEffect(() => {
    // This code will only run after the component has rendered.
    // It checks if loading is done AND there is no user.
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]); // The effect depends on these values

  // While loading, show a loading message.
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // If there is a user, render the dashboard.
  // If there's no user, this will render briefly before the useEffect redirects.
  // We return null to avoid a flash of content.
  if (!user) {
    return null;
  }

  // This is what will be rendered for a logged-in user.
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md">
        <Dashboard />
        <button
          onClick={() => auth.signOut()}
          className="mt-8 w-full px-6 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>
    </main>
  );
}
