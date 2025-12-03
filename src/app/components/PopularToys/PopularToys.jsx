"use client";
import { useEffect, useState } from "react";
import ToyCard from "../ToyCard/ToyCard";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

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
    return <LoadingSpinner/>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="py-4">
      <h1 className="text-2xl md:text-3xl py-4 mb-2 font-semibold text-center bg-blue-500 text-white rounded-t-md">
        Popular Toys
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2">
        {toys.map((toy) => (
          <ToyCard key={toy._id} toy={toy} />
        ))}
      </div>
    </div>
  );
}
