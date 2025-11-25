// app/dashboard/manage-toys/page.jsx

"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function ManageToysPage() {
  const { data: session, status } = useSession();
  const [toys, setToys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;

    async function loadToys() {
      try {
        const res = await fetch(
          `/api/toys?email=${session.user.email}`,
          { cache: "no-store" }
        );

        const data = await res.json();
        setToys(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadToys();
  }, [session]);

  async function handleDelete(id) {
    const confirmed = confirm("Are you sure you want to delete this toy?");
    if (!confirmed) return;

    const res = await fetch(`/api/toys/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setToys(prev => prev.filter(toy => toy._id !== id));
      alert("Toy deleted successfully");
    } else {
      alert("Failed to delete toy.");
    }
  }

  if (status === "loading" || loading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (!session) {
    return <p className="text-center text-red-500">You must be logged in.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Manage Your Toys</h1>

      {toys.length === 0 ? (
        <p className="text-gray-600">You haven't added any toys yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Toy Name</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {toys.map((toy) => (
                <tr key={toy._id} className="border-b">
                  <td className="p-3">{toy.toyName}</td>
                  <td className="p-3">{toy.Category}</td>
                  <td className="p-3">${toy.price}</td>

                  <td className="p-3 text-center space-x-3">

                    <Link
                      href={`/toys/${toy._id}`}
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      View
                    </Link>

                    <Link
                      href={`/dashboard/edit-toy/${toy._id}`}
                      className="px-3 py-1 bg-yellow-500 text-white rounded"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(toy._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
