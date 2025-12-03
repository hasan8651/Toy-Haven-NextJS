"use client";

import Link from "next/link";
import Image from "next/image";

export default function ToyCard({ toy }) {
 
if (!toy) return null;

 const { _id, toyName, pictureURL, price, rating, availableQuantity } = toy;

  return (
    <div data-aos="fade-up" className="h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-xl border border-blue-100 bg-blue-100 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
        {/* Image OK */}
        <div className="relative h-56 md:h-64 w-full overflow-hidden bg-blue-100">
          <Image
            src={pictureURL}
            alt={toyName || "Toy image"}
            fill
            className="object-cover transition duration-500 ease-out hover:scale-105"
            unoptimized
          />
        </div>

        {/* Content OK */}
        <div className="flex flex-1 flex-col p-4">
          <h2 className="text-blue-600 font-semibold text-lg truncate">
            {toyName}
          </h2>
          <div className="mt-3 flex items-center justify-between text-md">
            <div className="inline-flex items-center gap-1 text-amber-500">
              <span className="text-lg">★</span>
              <span className="font-medium text-blue-600">{rating}</span>
            </div>
            <p className="text-md font-semibold text-blue-600">
              ${price}
            </p>
          <p className="text-md font-semibold text-blue-600">
            In Stock: {' '}
            <span className="font-semibold text-emerald-600">
              {availableQuantity}
            </span>
          </p>
          </div>
        </div>

        {/* Actions need update*/}
        <div className="px-4 pb-4">
          <div className="flex gap-2">
            <Link
              href={`/toys/${_id}`}
              className="inline-flex flex-1 items-center justify-center rounded-lg border border-blue-200 bg-blue-600 px-3 py-2 text-white transition hover:border-blue-700 hover:bg-blue-700"
            >
              View details
            </Link>

            <button
              type="button"
              // onClick={() => onAddToCart?.(toy)} need to update
              className="inline-flex flex-1 items-center justify-center rounded-lg border border-blue-200 bg-blue-600 px-3 py-2 text-white transition hover:border-blue-700 hover:bg-blue-700 cursor-pointer"
            >
              Add to cart
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}