'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Swal from 'sweetalert2';

export default function EditToy() {
  const { id } = useParams(); // from /dashboard/edit-toy/[id]
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [toy, setToy] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Prefill form with toy data
  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const res = await fetch(`/api/toys/${id}`, { cache: 'no-store' });
        
        if (!res.ok) throw new Error('Failed to load toy');
        const data = await res.json();
        setToy(data);
               setSelectedCategory(data?.Category || '');
               
      } catch (e) {
        Swal.fire('Error', 'Failed to load toy details.', 'error');
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

if (!toyName || !selectedCategory || isNaN(price) || isNaN(quantity) || isNaN(rating)) {
Swal.fire('Missing Fields', 'Please fill all required fields.', 'info');
return;
}

const payload = {
// _id: id,
toyName,
pictureURL,
price,
availableQuantity: quantity,
rating,
description,
Category: selectedCategory
};

try {
const result = await fetch(`/api/toys/${id}`, {
method: 'PUT',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(payload)
});

console.log(result.ok)


// if (!result.ok) {
//   const err = await result.json().catch(() => ({}));
//   console.warn('Update failed', result.status, err);
//   throw new Error(err.message || `HTTPhhh ${result.status}`);
// }

Swal.fire({
  position: 'top-end',
  icon: 'success',
  background: '#3b82f6',
  color: 'white',
  title: 'Toy updated successfully',
  showConfirmButton: false,
  timer: 1500
});

router.push('/manage-toys'); // adjust if your path differs
} catch (err) {
Swal.fire('Error', err.message || 'Failed to update toy. Please try again.', 'error');
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

      <div className="shadow-lg card-surface rounded-xl p-8 max-w-2xl w-full space-y-6">
        <h1 className="text-3xl text-center font-bold text-blue-600">
          Edit Toy
        </h1>
        <p className="text-center text-sm text-gray-500 mb-4">
          Update your toy details below.
        </p>

        {/* Thumbnail preview */}
        <div className="flex items-center gap-3">
          <div className="relative h-16 w-16">
            <Image
              src={toy.pictureURL || '/placeholder.png'}
              alt={toy.toyName || 'Toy'}
              width={64}
              height={64}
              className="h-16 w-16 rounded-md object-cover ring-1 ring-blue-100"
              unoptimized
            />
          </div>
          <div className="text-sm text-gray-600">
            Current image preview
          </div>
        </div>

        <form onSubmit={handleUpdateToy} className="space-y-4">
          {/* Toy Name */}
          <div className="form-control">
            <label className="font-semibold">Toy Name</label>
            <input
              name="toyName"
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter toy name"
              defaultValue={toy.toyName}
              required
            />
          </div>

          {/* Image URL */}
          <div className="form-control">
            <label className="font-semibold">Image URL</label>
            <input
              name="imageURL"
              type="url"
              placeholder="https://example.com/toy.jpg"
              className="input input-bordered w-full"
              defaultValue={toy.pictureURL}
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
              defaultValue={toy.price}
            />
          </div>

          {/* Quantity */}
          <div className="form-control">
            <label className="font-semibold">Quantity</label>
            <input
              name="quantity"
              type="number"
              min="0"
              required
              className="input input-bordered w-full"
              defaultValue={toy.availableQuantity}
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
              defaultValue={toy.rating}
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
              defaultValue={toy.description}
            />
          </div>

          {/* Seller Email */}
          <div className="form-control">
            <label className="font-semibold">Seller Email</label>
            <input
              type="email"
              readOnly
              defaultValue={toy.sellerEmail || ''}
              className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Seller Name */}
          <div className="form-control">
            <label className="font-semibold">Seller Name</label>
            <input
              type="text"
              readOnly
              defaultValue={toy.sellerName || ''}
              className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Submit Button */}
          <button  className="btn w-full bg-blue-500 text-white hover:bg-blue-700">
            Update Toy
          </button>
        </form>
      </div>
    </div>
  );
}