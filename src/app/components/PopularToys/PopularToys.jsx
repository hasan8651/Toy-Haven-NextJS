"use client";
import { useEffect, useState } from "react";
import ToyCard from "../ToyCard/ToyCard";

export default function PopularToys() {
  const [toys, setToys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ac = new AbortController();

       fetch("/api/popular-toys", { signal: ac.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setToys)
      .catch((err) => {
        if (err.name !== "AbortError") setError(err);
      })
      .finally(() => setLoading(false));

    return () => ac.abort();
  }, []);

  if (loading) {
    return <p>Loading…</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>All Toys page</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {toys.map((toy) => (
          <ToyCard key={toy._id} toy={toy} />
        ))}
      </div>
    </div>
  );
}