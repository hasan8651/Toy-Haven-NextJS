"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import Head from "next/head";

export default function ManageToysPage() {
  const { data: session, status } = useSession();
  const [toys, setToys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;

    async function loadToys() {
      try {
        const res = await fetch(`/api/toys?email=${session.user.email}`, {
          cache: "no-store",
        });
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
      title: "Delete this toy?",
      icon: "warning",
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      background: "#3b82f6",
      color: "white",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    });
    if (!confirmed.isConfirmed) return;

    const res = await fetch(`/api/toys/${id}`, { method: "DELETE" });
    if (res.ok) {
      setToys((prev) => prev.filter((t) => t._id !== id));
      Swal.fire({
        position: "top-end",
        icon: "success",
        background: "#3b82f6",
        color: "white",
        title: "Toy deleted successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        background: "red",
        color: "white",
        icon: "error",
        title: "Failed to delete toy",
        text: err.message || "Please try again.",
      });
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
        <span className="ml-2 text-blue-600">Loading...</span>
      </div>
    );
  }

  if (!session) {
    return (
      <p className="text-center text-red-500 p-6">You must be logged in.</p>
    );
  }

  return (
    <div className="p-6 bg-blue-50 mx-auto md:py-4 my-2 rounded-xl shadow-md">
      <Head>
        <title>Toy haven - Manage Your Toys</title>
      </Head>
      <h1 className="text-2xl md:text-3xl py-4 mb-2 font-semibold text-center bg-blue-500 text-white rounded-md">
        Manage Your Toys
      </h1>

      {toys.length === 0 ? (
        <p className="text-red-600 text-2xl text-center font-semibold">
          You haven't added any toys yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <div>
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="px-4 py-2 text-left font-semibold rounded-tl-2xl">
                    Toy
                  </th>
                  <th className="px-4 py-2 text-left font-semibold">
                    Category
                  </th>
                  <th className="px-4 py-2 text-left font-semibold">Price</th>
                  <th className="px-4 py-2 text-left font-semibold">Rating</th>
                  <th className="px-4 py-2 text-left font-semibold">
                    In Stock
                  </th>
                  <th className="px-4 py-2 text-center font-semibold rounded-tr-2xl">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Row borders */}
              <tbody className="divide-y-2 divide-blue-500 text-blue-600 border-2 border-blue-500">
                {toys.map((toy) => {
                  const price = Number(toy.price || 0);
                  const rating = Number(toy.rating || 0);
                  const stock = Number(toy.availableQuantity || 0);

                  return (
                    <tr key={toy._id}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative h-18 w-20 shrink-0">
                            <Image
                              src={toy.pictureURL || ""}
                              alt={toy.toyName || "Toy"}
                              width={56}
                              height={56}
                              className="w-20 h-16 rounded-md object-cover ring-1 ring-blue-500"
                              unoptimized
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium md:text-lg text-blue-600">
                              {toy.toyName}
                            </div>
                            <div className="text-sm md:text-md text-gray-500 truncate">
                              {toy?.sellerName || "Unknown Seller"}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3 font-medium md:text-lg">
                        {toy.Category}
                      </td>
                      <td className="px-4 py-3 font-medium md:text-lg">
                        ${price}
                      </td>

                      <td className="px-4 py-3 font-medium md:text-lg">
                        <span className="inline-flex items-center gap-1 text-blue-600">
                          <span className="text-yellow-600">★:</span>{" "}
                          <span>{rating}</span>
                        </span>
                      </td>

                      <td className="px-4 py-3 font-medium md:text-lg">
                        <span
                          className={
                            stock > 0 ? "text-blue-600" : "text-red-600"
                          }
                        >
                          {stock} pcs
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/toys/${toy._id}`}
                            className="btn inline-flex items-center rounded-md bg-blue-600 w-1/4 text-white shadow-md hover:bg-blue-700"
                          >
                            View
                          </Link>

                          <Link
                            href={`/edit-toy/${toy._id}`}
                            className="btn inline-flex items-center rounded-md bg-orange-500 w-1/4 text-white shadow-md hover:bg-orange-600"
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() => handleDelete(toy._id)}
                            className="btn inline-flex items-center rounded-md bg-red-500 w-1/4 text-white shadow-md hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className="px-4 py-3 my-4 rounded-b-2xl bg-blue-500 text-white">
        Total Toys: {toys.length}
      </div>
    </div>
  );
}
