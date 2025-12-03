"use client";
import { useEffect, useState } from "react";
import ToyCard from "../components/ToyCard/ToyCard";
import Head from "next/head";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const CATEGORY_OPTIONS = [
  "All",
  "Dolls",
  "Soft Toys",
  "RC Toys",
  "Puzzles",
  "Vehicles",
  "Educational",
  "Robotics",
  "Outdoor Toys",
  "Musical Instruments",
  "Science Kits",
];

export default function Page() {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const [toys, setToys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ac = new AbortController();

    fetch("/api/toys", { signal: ac.signal })
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

  // Filtered products based on search and category
  const filteredToys = toys.filter(
    (toy) =>
      toy.toyName.toLowerCase().includes(search.toLowerCase()) &&
      (category ? toy.Category === category : true)
  );

  if (loading) {
    return <LoadingSpinner/>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
        <Head>
        <title>Toy haven - All Toys</title>
      </Head>
      <h1 className="text-2xl md:text-3xl py-4 my-4 font-semibold text-center bg-blue-500 text-white rounded-md">
        All Toys
      </h1>

      <form className="max-w-3xl mx-auto px-4 md:px-1 mb-4 flex flex-col md:flex-row justify-center gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search toys…"
          className="md:w-2/5 rounded-md border font-semibold border-blue-500 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="md:w-2/5 rounded-md border font-semibold border-blue-500 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        >
          {CATEGORY_OPTIONS.map((c) => (
            <option className="bg-blue-500" key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="md:w-1/5 rounded-md btn h-12 bg-blue-500 text-white hover:bg-blue-700  px-3 py-2"
        >
          Clear
        </button>
      </form>

      {filteredToys.length === 0 ? (
        <p className="text-center text-2xl py-16 font-bold text-red-600">
          No toys found
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-6">
          {filteredToys.map((toy) => (
            <ToyCard key={toy._id} toy={toy} />
          ))}
        </div>
      )}
    </div>
  );
}
