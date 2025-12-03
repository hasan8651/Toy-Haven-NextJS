"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Image from "next/image";

export default function ToyDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [toy, setToy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await fetch(`/api/toys/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Toy not found");
        const data = await res.json();
        setToy(data);
      } catch {
        setToy(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handlePurchase = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      background: "#3b82f6",
      color: "white",
      title: `Thanks for purchasing ${toy.toyName}`,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/toys");
    }
  };

  if (loading) {
    return (
      <div className="bg-blue-100 min-h-screen flex items-center justify-center">
        <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
        <span className="ml-2 text-blue-600">Loading…</span>
      </div>
    );
  }

  if (!toy) {
    return <h1 className="text-red-600 p-6">Toy not found</h1>;
  }

  return (
    <div className="min-h-screen py-10 px-4">
      <Head>
        <title>Toy Haven - {toy.toyName}</title>
      </Head>

      <div className="max-w-xl mb-2">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 rounded-md px-6 py-2 btn bg-blue-500 hover:bg-blue-600 text-white"
        >
          <span>← Back</span>
        </button>
      </div>

      <div className="max-w-5xl mx-auto bg-blue-100 shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 flex items-center justify-center p-6">
            <Image
              width={100}
              height={100}
              src={toy.pictureURL}
              alt={toy.toyName}
              className="rounded-lg object-contain min-w-8/9 lg:min-w-full hover:scale-105 transition-transform duration-300"
              unoptimized
            />
          </div>

          <div className="lg:w-1/2 p-8 space-y-4">
            <h1 className="text-3xl font-bold text-blue-500">{toy.toyName}</h1>

            <div className="flex text-gray-600 items-center justify-between text-lg font-semibold">
              <p>
                Price:
                <span className="ml-2 text-green-500">$ {toy.price}</span>
              </p>
              <p>
                Rating:
                <span className="ml-2 text-green-500">⭐ {toy.rating}</span>
              </p>
            </div>

            <div className="flex items-center justify-between text-gray-800 text-lg font-semibold">
              <p className="mb-2 md:mb-0">
                <span>In Stock:</span>
                <span className="ml-2 text-green-500">
                  {toy.availableQuantity}
                </span>
              </p>
              <p>
                <span>Category: </span>
                <span className="bg-blue-500 text-white rounded-xl px-4">
                  {toy.Category}
                </span>
              </p>
            </div>

            <div className="border-t border-blue-500 my-4"></div>

            <p className="text-blue-500 leading-relaxed font-semibold">
              {toy.description}
            </p>

            <div className="border-t border-blue-500 my-4"></div>

            <div className="text-gray-800">
              <h3 className="font-semibold text-lg text-blue-500 mb-1">
                Seller Information
              </h3>
              <p>
                <span className="font-semibold">Name:</span> {toy.sellerName}
              </p>
              <p>
                <span className="font-semibold">Email: </span>
                <a
                  href={`mailto:${toy.sellerEmail}`}
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  {toy.sellerEmail}
                </a>
              </p>
            </div>

            <div className="p-8 border-t mt-4 border-blue-500">
              <h2 className="text-2xl font-semibold mb-4 text-center text-blue-500">
                Feel free to try this Toy
              </h2>

              <button
                type="button"
                onClick={handlePurchase}
                className="btn w-50 mx-auto block h-12  bg-blue-500 text-white text-lg hover:bg-blue-700"
              >
                Purchase Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
