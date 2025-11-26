'use client';

import Image from 'next/image';

export default function Status() {
return (
<div className="bg-blue-500 rounded-md my-2 shadow-xl">
<h2 className="text-center text-orange-100 text-2xl md:text-3xl font-semibold py-2" data-aos="zoom-in" data-aos-easing="ease-in-out" >
Trusted by Thousands of Families, Loved by Kids Everywhere
</h2>


  <div className="max-w-7xl mx-auto grid gap-6 p-4 md:grid-cols-3">
    {/* Card 1 */}
    <div className="stat text-center" data-aos="zoom-out" data-aos-easing="ease-in-out">
      <div className="text-pink-300 animate-pulse">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-12 w-12 stroke-current">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </div>
      <div className="text-2xl text-white">Total Likes</div>
      <div className="stat-value text-4xl text-white">25.6K</div>
      <div className="text-xl text-yellow-200">21% more than last month</div>
    </div>

    {/* Card 2 */}
    <div className="stat text-center" data-aos="fade-up" data-aos-easing="ease-in-out">
      <div className="text-yellow-200 animate-pulse">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-12 w-12 stroke-current">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <div className="text-2xl text-white">Page Views</div>
      <div className="stat-value text-4xl text-white">2.6M</div>
      <div className="text-xl text-yellow-200">21% more than last month</div>
    </div>

    {/* Card 3 */}
    <div className="stat text-center text-white" data-aos="zoom-out" data-aos-easing="ease-in-out">
      <div className="avatar avatar-online mx-auto">
        <div className="w-16 rounded-full">
          <Image
            src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
            alt="Customer avatar"
            width={64}
            height={64}
            className="rounded-full"
            unoptimized
          />
        </div>
      </div>
      <div className="stat-value text-4xl">86%</div>
      <div className="text-2xl">Toys sold</div>
      <div className="text-yellow-200 text-xl">31 toys on order</div>
    </div>
  </div>
</div>
);
};