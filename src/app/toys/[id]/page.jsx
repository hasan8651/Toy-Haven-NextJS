// app/toys/[id]/page.jsx

import Head from "next/head";

export default async function ToyDetails({ params }) {
  const { id } = await params;

  // Fetch toy details
  const res = await fetch(`${process.env.API_BASE}/api/toys/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <h1 className="text-red-600">Toy not found</h1>;
  }

  const toy = await res.json();

  return (
    // <div className="p-6">
    //   <h1 className="text-2xl font-bold">{toy.toyName}</h1>

    //   <img
    //     src={toy.pictureURL}
    //     alt={toy.toyName}
    //     className="w-64 rounded mt-4"
    //   />

    //   <p className="mt-3 text-gray-700">{toy.description}</p>

    //   <div className="mt-4 space-y-1">
    //     <p><strong>Price:</strong> ${toy.price}</p>
    //     <p><strong>Rating:</strong> {toy.rating}</p>
    //     <p><strong>Available:</strong> {toy.availableQuantity}</p>
    //     <p><strong>Seller:</strong> {toy.sellerName}</p>
    //     <p><strong>Email:</strong> {toy.sellerEmail}</p>
    //     <p><strong>Category:</strong> {toy.subCategory}</p>
    //   </div>
    // </div>


    <div className="bg-blue-50 min-h-screen py-10 px-4">
      <Head>
        <title>Toy haven - {toy.toyName}</title>
      </Head>

      <div className="max-w-5xl mx-auto bg-blue-50 shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 flex items-center justify-center p-6">
            <img
              src={toy.pictureURL}
              alt={toy.toyName}
              className="rounded-lg object-contain min-w-8/9 lg:min-w-full hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="lg:w-1/2 p-8 space-y-4">
            <h1 className="text-3xl font-bold text-blue-500">{toy.toyName}</h1>

            <div className="flex text-gray-600 items-center justify-between text-lg font-semibold">
              <p>
                Price:
                <span className="ml-2 text-green-500">${toy.price}</span>
              </p>
              <p>
                Rating:
                <span className="ml-2 text-green-500">⭐ {toy.rating}</span>
              </p>
            </div>

            <div className="lg:flex items-center justify-between text-gray-600 text-lg font-semibold">
              <p className="mb-2 lg:mb-0">
                <span>In Stock:</span>
                <span className="ml-2 text-green-500">{toy.availableQuantity}</span>
              </p>
              <p>
                <span>Category: </span>
                <span className="bg-blue-500 text-white rounded-xl px-4">{toy.Category}</span>
              </p>
            </div>

            <div className="border-t border-gray-200 my-4"></div>

            <p className="text-blue-500 leading-relaxed font-semibold">{toy.description}</p>

            <div className="border-t border-gray-200 my-4"></div>

            <div className="text-gray-600">
              <h3 className="font-semibold text-lg mb-1">Seller Information</h3>
              <p>
                <span className="font-semibold">Name:</span> {toy.sellerName}
              </p>
              <p>
                <span className="font-semibold">Email: </span>
                <a className="text-blue-500 underline hover:text-blue-700">
                  {toy.sellerEmail}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 border-t mt-4 bg-blue-50">
          <h2 className="text-2xl font-semibold mb-4 text-center text-blue-500">
            Feel free to try this Toy
          </h2>

          
            <button
              type="submit"
              className="btn bg-blue-500 hover:bg-blue-600 text-white w-full"
            >
              Try Now
            </button>
         
        </div>
      </div>
    </div>

  );
}
