'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Page() {
  const [toys, setToys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ac = new AbortController();

    // Call your Next.js proxy route to avoid CORS
    fetch('/api/toys?page=1&limit=20', { signal: ac.signal })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setToys)
      .catch(err => {
        if (err.name !== 'AbortError') setError(err);
      })
      .finally(() => setLoading(false));

    return () => ac.abort();
  }, []);

  if (loading) {
    return (
      <div>
        <h2>All Toys page</h2>
        <p>Loading…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>All Toys page</h2>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>All Toys page</h2>
      <ul>
        {toys.map(t => (
          <div key={t._id || t.id}>
            <p>{t.title} {t.image}</p>
            
            <Image src='https://i.ibb.co.com/d41dBttJ/Lego-Classic-Bricks.jpg' width={100} height={100} unoptimized/>
            <Image src={t.image} width={100} height={100} unoptimized/>
            </div>
        ))}
      </ul>
    </div>
  );
}