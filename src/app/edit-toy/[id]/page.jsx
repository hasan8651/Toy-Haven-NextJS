"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function EditToy() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [toy, setToy] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Prefill form with toy data
  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const res = await fetch(`/api/toys/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load toy");
        const data = await res.json();
        setToy(data);
        setSelectedCategory(data?.Category || "");
      } catch (e) {
        Swal.fire("Error", "Failed to load toy details.", "error");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleUpdateToy = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    const toyName = form.toyName.value.trim();
    const pictureURL = form.imageURL.value.trim();
    const price = parseFloat(form.price.value);
    const quantity = parseInt(form.quantity.value, 10);
    const rating = parseFloat(form.rating.value);
    const description = form.description.value.trim();

    if (
      !toyName ||
      !selectedCategory ||
      isNaN(price) ||
      isNaN(quantity) ||
      isNaN(rating)
    ) {
      Swal.fire("Missing Fields", "Please fill all required fields.", "info");
      return;
    }

    const payload = {
      toyName,
      pictureURL,
      price,
      availableQuantity: quantity,
      rating,
      description,
      Category: selectedCategory,
    };

    try {
      const result = await fetch(`/api/toys/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      Swal.fire({
        position: "top-end",
        icon: "success",
        background: "#3b82f6",
        color: "white",
        title: "Toy updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      router.push("/manage-toys");
    } catch (err) {
      Swal.fire(
        "Error",
        err.message || "Failed to update toy. Please try again.",
        "error"
      );
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
        <span className="ml-2 text-blue-600">Loading...</span>
      </div>
    );
  }

  if (!toy) {
    return <p className="text-center text-red-500 p-6">Toy not found.</p>;
  }

  return (
    <div className="flex justify-center items-center py-4">
      <Head>
        <title>Toy Haven - Edit Toy</title>
      </Head>
      <div className="shadow-lg bg-blue-50 rounded-xl p-8 max-w-2xl w-full space-y-6 mx-4">
        <h1 className="w-full text-2xl md:text-3xl py-4 mb-4 md:mb-12 font-semibold text-center bg-blue-500 text-white rounded-md">
          Edit Toy
        </h1>
        <p className="text-center  text-blue-600 mb-4">
          Update your toy details below.
        </p>
        <form onSubmit={handleUpdateToy} className="space-y-4">
          <div className="form-control">
            <label className="font-semibold text-blue-600">Toy Name</label>
            <input
              name="toyName"
              type="text"
              className="input input-bordered w-full border outline-none border-blue-500 focus:ring-2 focus:ring-blue-500 cursor-not-allowed"
              placeholder="Enter toy name"
              defaultValue={toy.toyName}
              required
            />
          </div>

          <div className="form-control">
            <label className="font-semibold text-blue-600">Image URL</label>
            <input
              name="imageURL"
              type="url"
              placeholder="https://imageSite.com/toy.jpg"
              className="input input-bordered w-full border outline-none border-blue-500 focus:ring-2 focus:ring-blue-500 cursor-not-allowed"
              defaultValue={toy.pictureURL}
            />
          </div>

          <div className="form-control">
            <label className="font-semibold text-blue-600">Price ($)</label>
            <input
              name="price"
              type="number"
              min="0"
              step="0.01"
              required
              className="input input-bordered w-full border outline-none border-blue-500 focus:ring-2 focus:ring-blue-500 cursor-not-allowed"
              defaultValue={toy.price}
            />
          </div>

          <div className="form-control">
            <label className="font-semibold text-blue-600">Quantity</label>
            <input
              name="quantity"
              type="number"
              min="0"
              required
              className="input input-bordered w-full border outline-none border-blue-500 focus:ring-2 focus:ring-blue-500 cursor-not-allowed"
              defaultValue={toy.availableQuantity}
            />
          </div>

          <div className="form-control">
            <label className="font-semibold text-blue-600">Rating (1–5)</label>
            <input
              name="rating"
              type="number"
              min="1"
              max="5"
              step="0.1"
              required
              className="input input-bordered w-full border outline-none border-blue-500 focus:ring-2 focus:ring-blue-500 cursor-not-allowed"
              defaultValue={toy.rating}
            />
          </div>

          <div className="form-control">
            <label className="font-semibold text-blue-600">Category</label>
            <select
              value={selectedCategory}
              required
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select select-bordered w-full border outline-none border-blue-500 focus:ring-2 focus:ring-blue-500 cursor-not-allowed"
            >
              <option value="">Select Category</option>
              <option value="Dolls">Dolls</option>
              <option value="Soft Toys">Soft Toys</option>
              <option value="RC Toys">RC Toys</option>
              <option value="Puzzles">Puzzles</option>
              <option value="Vehicles">Vehicles</option>
              <option value="Educational">Educational</option>
              <option value="Robotics">Robotics</option>
              <option value="Outdoor Toys">Outdoor Toys</option>
              <option value="Musical Instruments">Musical Instruments</option>
              <option value="Outdoor Toys">Science Kits</option>
            </select>
          </div>

          <div className="form-control">
            <label className="font-semibold text-blue-600">Description</label>
            <textarea
              name="description"
              required
              placeholder="Enter toy description..."
              className="textarea textarea-bordered w-full border outline-none border-blue-500 focus:ring-2 focus:ring-blue-500 cursor-not-allowed"
              defaultValue={toy.description}
            />
          </div>

          <div className="form-control">
            <label className="font-semibold text-blue-600">Seller Email</label>
            <input
              type="email"
              readOnly
              defaultValue={toy.sellerEmail || ""}
              className="input input-bordered w-full border outline-none border-blue-500 focus:ring-2 focus:ring-blue-500 cursor-not-allowed cursor-not-allowed"
            />
          </div>

          <div className="form-control">
            <label className="font-semibold text-blue-600">Seller Name</label>
            <input
              type="text"
              readOnly
              defaultValue={toy.sellerName || ""}
              className="input input-bordered w-full border outline-none border-blue-500 focus:ring-2 focus:ring-blue-500 cursor-not-allowed cursor-not-allowed"
            />
          </div>

          <button className="btn w-full py-6 bg-blue-500 text-white text-lg hover:bg-blue-700">
            Update Toy
          </button>
        </form>
      </div>
    </div>
  );
}
