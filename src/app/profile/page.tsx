'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the current logged-in user
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:3001/auth/me', {
          method: 'POST',
          credentials: 'include',
        });
        
        const data = await res.json();
        if (!res.ok || !data || !data.email) {
          router.push('/login'); // Not logged in, redirect
        } else {
          setUser(data);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <main className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Role:</strong> {user?.role}</p>

      <form
        action="http://localhost:3001/auth/logout"
        method="POST"
        className="mt-6"
      >
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </form>
    </main>
  );
}
