"use client";

import { useState } from "react";
import Head from "next/head";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

export default function AddToy() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const user = session?.user;

  const [selectedCategory, setSelectedCategory] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleAddToy = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      Swal.fire("Login required", "Please log in to add a toy.", "info");
      router.push("/login?callbackUrl=/add-toys");
      return;
    }

    const form = e.target;

    const toyName = form.toyName.value.trim();
    const pictureURL = form.imageURL.value.trim();
    const price = form.price.valueAsNumber;
    const quantity = form.quantity.valueAsNumber;
    const rating = form.rating.valueAsNumber;
    const description = form.description.value.trim();

    if (!toyName || !selectedCategory || !price || !quantity || !rating) {
      Swal.fire("Missing Fields", "Please fill all required fields.", "info");
      return;
    }

    const newToy = {
      toyName,
      pictureURL,
      price,
      availableQuantity: quantity,
      rating,
      description,
      Category: selectedCategory,
      sellerName: user?.name || user?.email?.split("@")[0] || "Unknown",
      sellerEmail: user?.email,
    };

    const res = await fetch("/api/toys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newToy),
    });
    const data = await res.json();
    console.log("Created:", data);

    if (data?.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        background: "#3b82f6",
        color: "white",
        title: "Toy Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      form.reset();
      setSelectedCategory("");
    }
    if (status === "loading") {
      return (
        <div className="p-6 flex items-center justify-center">
          <LoadingSpinner/>
        </div>
      );
    }
  };
  return (
    <div className="flex justify-center items-center py-4">
      <Head>
        <title>Toy Haven - Add Toy</title>
      </Head>

      <div className="shadow-lg bg-blue-50 rounded-xl p-8 max-w-2xl md:max-w-3xl w-full space-y-6 mx-4">
        <h1 className="w-full text-2xl md:text-3xl py-4 mb-4 md:mb-12 font-semibold text-center bg-blue-500 text-white rounded-md">
          Add a New Toy
        </h1>
        <p className="text-center  text-blue-600 mb-4">
          Add high-quality toy details for better visibility!
        </p>

        <form onSubmit={handleAddToy} className="space-y-4">
          <div className="form-control">
            <label className="font-semibold text-blue-600">Toy Name</label>
            <input
              name="toyName"
              type="text"
              className="input input-bordered w-full border outline-none border-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter toy name"
              required
            />
          </div>

          <div className="form-control">
            <label className="font-semibold text-blue-600">
              Toy Image (Paste Image URL)
            </label>
            <input
              name="imageURL"
              type="url"
              placeholder="https://imagehosting.com/toy.jpg"
              className="input input-bordered w-full border outline-none border-blue-500 focus:ring-2 focus:ring-blue-500"
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
              className="input input-bordered w-full border outline-none border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="form-control">
            <label className="font-semibold text-blue-600">Quantity</label>
            <input
              name="quantity"
              type="number"
              min="1"
              required
              className="input input-bordered w-full border outline-none border-blue-500 focus:ring-2 focus:ring-blue-500"
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
              className="input input-bordered w-full border outline-none border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="form-control">
            <label className="font-semibold text-blue-600">Category</label>
            <select
              value={selectedCategory}
              required
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select select-bordered w-full border outline-none border-blue-500 focus:ring-2 focus:ring-blue-500"
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
              className="textarea textarea-bordered w-full border outline-none border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="form-control">
            <label className="font-semibold text-blue-600">Your Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full border outline-none border-blue-500 focus:ring-2 focus:ring-blue-500 cursor-not-allowed"
            />
          </div>

          <div className="form-control">
            <label className="font-semibold text-blue-600">Your Name</label>
            <input
              type="text"
              value={user?.name || user?.email?.split("@")[0] || ""}
              readOnly
              className="input input-bordered w-full border outline-none border-blue-500 focus:ring-2 focus:ring-blue-500 cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn w-full py-6 bg-blue-500 text-white text-lg hover:bg-blue-700"
          >
            {submitting ? "Adding…" : "Add Toy"}
          </button>
        </form>
      </div>
    </div>
  );
}
