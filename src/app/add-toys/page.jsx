"use client";

import { useState } from "react";
import Head from "next/head";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddToy() {
const { data: session, status } = useSession();
const router = useRouter();
const user = session?.user;

  const [selectedCategory, setSelectedCategory] = useState("");
  const [submitting, setSubmitting] = useState(false);


  // Handle add toy submit
  const handleAddToy = async (e) => {
    e.preventDefault();


if (!user?.email) {
  Swal.fire('Login required', 'Please log in to add a toy.', 'info');
  router.push('/login?callbackUrl=/add-toys');
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


      // Build new toy object
      const newToy = {
        toyName,
        pictureURL,
        price,
        availableQuantity: quantity,
        rating,
        description,
        Category: selectedCategory,
        sellerName: user?.name || user?.email?.split('@')[0] || 'Unknown',
  sellerEmail: user?.email
      };

      // Send to backend

const res = await fetch('/api/toys', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(newToy),
});
const data = await res.json();
console.log('Created:', data);



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
    if (status === 'loading') {
return (
<div className="p-6 flex items-center justify-center">
<span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
<span className="ml-2 text-blue-600">Loading...</span>
</div>
);
  };
  }
  return (
    <div className="flex justify-center items-center py-4">
      <Head>
        <title>Toy Haven - Add Toy</title>
      </Head>

      <div className="shadow-lg card-surface rounded-xl p-8 max-w-2xl w-full space-y-6">
        <h1 className="text-3xl text-center font-bold text-blue-600">
          Add a New Toy
        </h1>
        <p className="text-center text-sm text-gray-500 mb-4">
          Add high-quality toy details for better visibility!
        </p>

        <form onSubmit={handleAddToy} className="space-y-4">
          {/* Toy Name */}
          <div className="form-control">
            <label className="font-semibold">Toy Name</label>
            <input
              name="toyName"
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter toy name"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="form-control">
            <label className="font-semibold">Toy Image</label>
            {/* <input
              type="file"
              accept="image/*"
                            className="file-input file-input-bordered w-full"
            /> */}

          </div>

          {/* URL fallback */}
          <div className="form-control">
            <label className="font-semibold">Or Paste Image URL</label>
            <input
              name="imageURL"
              type="url"
              placeholder="https://example.com/toy.jpg"
              className="input input-bordered w-full"
            />
          </div>

          {/* Price */}
          <div className="form-control">
            <label className="font-semibold">Price ($)</label>
            <input
              name="price"
              type="number"
              min="0"
              step="0.01"
              required
              className="input input-bordered w-full"
            />
          </div>

          {/* Quantity */}
          <div className="form-control">
            <label className="font-semibold">Quantity</label>
            <input
              name="quantity"
              type="number"
              min="1"
              required
              className="input input-bordered w-full"
            />
          </div>

          {/* Rating */}
          <div className="form-control">
            <label className="font-semibold">Rating (1–5)</label>
            <input
              name="rating"
              type="number"
              min="1"
              max="5"
              step="0.1"
              required
              className="input input-bordered w-full"
            />
          </div>

          {/* Category */}
          <div className="form-control">
            <label className="font-semibold">Category</label>
            <select
              value={selectedCategory}
              required
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">Select Category</option>
              <option value="Educational">Educational</option>
              <option value="Robotics">Robotics</option>
              <option value="Dolls">Dolls</option>
              <option value="Action Figures">Action Figures</option>
              <option value="Vehicle Toys">Vehicle Toys</option>
            </select>
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="font-semibold">Description</label>
            <textarea
              name="description"
              required
              placeholder="Enter toy description..."
              className="textarea textarea-bordered w-full"
            />
          </div>

          {/* Seller Email */}
          <div className="form-control">
            <label className="font-semibold">Your Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Seller Name */}
          <div className="form-control">
            <label className="font-semibold">Your Name</label>
            <input
              type="text"
          value={user?.name || user?.email?.split('@')[0] || ''}
              readOnly
              className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Submit Button */}
          <button
        type="submit"
        disabled={submitting}
         className="btn w-full bg-blue-500 text-white hover:bg-blue-700"
      >
        {submitting ? 'Adding…' : 'Add Toy'}
      </button>
        </form>
      </div>
    </div>
  );
}
