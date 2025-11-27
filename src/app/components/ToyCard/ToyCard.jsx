"use client";

import Link from "next/link";
import Image from "next/image";

export default function ToyCard({ toy }) {
  const { _id, toyName, pictureURL, price, rating, availableQuantity } =
    toy || {};

  return (
    <div data-aos="fade-up">
      <div className="card rounded-xl md:rounded-lg bg-blue-50 p-4 shadow-lg">
        <figure>
          <div className="relative h-56 md:h-64 w-full overflow-hidden rounded-xl md:rounded-lg">
            <Image
              src={pictureURL}
              className="w-full rounded-xl md:rounded-lg"
              width={100}
              height={100}
              alt="Toy Image"
              unoptimized
            />
          </div>
        </figure>

        <div>
          <h2 className="card-title text-lg my-2 ml-2 text-blue-500 min-h-14">
            {toyName}
          </h2>
          <span className="flex px-1 justify-between text-gray-700 text-xl font-semibold">
            <p className="px-2">⭐{rating}</p>
            <p className="px-2">$ {price}</p>
          </span>
          <p className="text-md my-2 font-semibold text-center text-blue-500">
            Available Quantity:
            <span className="text-green-600"> {availableQuantity}</span>
          </p>
        </div>

        <Link
          href={`/toys/${_id}`}
          className="btn h-14 bg-blue-500 text-white hover:bg-blue-700"
        >
          View More
        </Link>
      </div>
    </div>
  );
}
