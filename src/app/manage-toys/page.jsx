// app/dashboard/manage-toys/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import Swal from 'sweetalert2';

export default function ManageToysPage() {
  const { data: session, status } = useSession();
  const [toys, setToys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;

    async function loadToys() {
      try {
        const res = await fetch(`/api/toys?email=${session.user.email}`, { cache: 'no-store' });
        const data = await res.json();
        setToys(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadToys();
  }, [session]);

  async function handleDelete(id) {
    const confirmed = await Swal.fire({
title: 'Delete this toy?',
// text: 'This action cannot be undone.',
icon: 'warning',
showCancelButton: true,
reverseButtons: true,
confirmButtonText: 'Delete',
cancelButtonText: 'Cancel',
background: "#3b82f6",
        color: "white",
confirmButtonColor: '#dc2626', // red-600
cancelButtonColor: '#6b7280', // gray-500
});
    if (!confirmed.isConfirmed) return;

    const res = await fetch(`/api/toys/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setToys((prev) => prev.filter((t) => t._id !== id));
    Swal.fire({
    position: 'top-end',
    icon: 'success',
    background: "#3b82f6",
        color: "white",
    title: 'Toy deleted successfully',
    showConfirmButton: false,
    timer: 1500,
  });
    } else {
    Swal.fire({
      background: "red",
        color: "white",
    icon: 'error',
    title: 'Failed to delete toy',
    text: err.message || 'Please try again.',
  });
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
        <span className="ml-2 text-blue-600">Loading...</span>
      </div>
    );
  }

  if (!session) {
    return <p className="text-center text-red-500 p-6">You must be logged in.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6 text-blue-600">Manage Your Toys</h1>

      {toys.length === 0 ? (
        <p className="text-gray-600">You haven&apos;t added any toys yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <div className="overflow-hidden rounded-xl border border-blue-200 bg-white shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Toy</th>
                  <th className="px-4 py-3 text-left font-semibold">Category</th>
                  <th className="px-4 py-3 text-left font-semibold">Price</th>
                  <th className="px-4 py-3 text-left font-semibold">Rating</th>
                  <th className="px-4 py-3 text-left font-semibold">In Stock</th>
                  <th className="px-4 py-3 text-center font-semibold">Actions</th>
                </tr>
              </thead>

              {/* Row borders */}
              <tbody className="divide-y divide-blue-100 text-gray-700">
                {toys.map((toy) => {
                  const price = Number(toy.price || 0);
                  const rating = Number(toy.rating || 0);
                  const stock = Number(toy.availableQuantity || 0);

                  return (
                    <tr key={toy._id} className="hover:bg-blue-50 transition-colors">
                      {/* Thumbnail + name */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative h-14 w-14 shrink-0">
                            <Image
                              src={toy.pictureURL || '/placeholder.png'}
                              alt={toy.toyName || 'Toy'}
                              width={56}
                              height={56}
                              className="h-14 w-14 rounded-md object-cover ring-1 ring-blue-100"
                              unoptimized
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium text-gray-900">{toy.toyName}</div>
                            {/* Optional subtext */}
                            <div className="text-xs text-gray-500 truncate">{toy?.sellerName || ''}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3">{toy.Category}</td>
                      <td className="px-4 py-3">${price.toFixed(2)}</td>

                      {/* Rating: */}
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 text-gray-700">
                          <span className="text-yellow-500">★</span>
                          <span>Rating: {rating.toFixed(1)}</span>
                        </span>
                      </td>

                      {/* In Stock: */}
                      <td className="px-4 py-3">
                        <span className={stock > 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                          In Stock: {stock}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/toys/${toy._id}`}
                            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-white shadow-sm hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition"
                          >
                            View
                          </Link>

                          <Link
                            href={`/edit-toy/${toy._id}`}
                            className="inline-flex items-center rounded-md border border-blue-300 bg-white px-3 py-1.5 text-blue-700 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition"
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() => handleDelete(toy._id)}
                            className="inline-flex items-center rounded-md border border-red-300 bg-white px-3 py-1.5 text-red-600 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>

              <tfoot className="bg-blue-50">
                <tr>
                  <td className="px-4 py-3 text-sm text-blue-700" colSpan={6}>
                    Total toys: {toys.length}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}