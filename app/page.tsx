'use client';

import { useAuth } from '../context/AuthContext'; // CORRECT PATH: ../
import { auth } from '../firebase/config'; // CORRECT PATH: ../
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    if (typeof window !== 'undefined') {
      router.push('/login');
    }
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to GHL Fusion</h1>
        <p className="mb-8">You are logged in as: {user.email}</p>
        <button
          onClick={() => auth.signOut()}
          className="px-6 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none"
        >
          Sign Out
        </button>
      </div>
    </main>
  );
}
