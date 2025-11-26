'use client';

export default function CustomerOpinion() {
return (
<div className="mx-auto">
{/* Story */}
<section className="py-12 px-4 text-center bg-gradient-to-r from-blue-500 via-white to-blue-500 rounded-md shadow-xl mx-auto my-2" data-aos="fade-up" data-aos-easing="ease-in-out" >
<h2 className="text-4xl font-extrabold text-blue-700 mb-4">Our Story</h2>
<p className="max-w-2xl mx-auto leading-relaxed text-lg">
Welcome to <span className="font-bold text-blue-700">Toy Haven</span> — where every smile begins! 🌈 Since 2010, we've been crafting joy with safe, creative, and educational toys. Our mission: turn every moment into magical playtime for kids around the world.
</p>
</section>

  {/* Reviews */}
  <section
    className="py-12 bg-gradient-to-r from-blue-500 via-white to-blue-500 rounded-md shadow-xl mx-auto mt-8 mb-4"
    data-aos="fade-up"
    data-aos-easing="ease-in-out"
  >
    <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-10">What Our Customers Say</h2>
    <div className="flex flex-wrap justify-center gap-8 px-4">
      <div
        className="bg-white w-80 p-6 rounded-2xl shadow-xl transform hover:-translate-y-2 transition"
        data-aos="zoom-in"
        data-aos-easing="ease-in-out"
      >
        <p className="italic text-gray-600">"Best toy shop ever! My kids love everything."</p>
        <h3 className="mt-4 font-bold text-indigo-500">- Mia</h3>
      </div>

      <div
        className="bg-white w-80 p-6 rounded-2xl shadow-xl transform hover:-translate-y-2 transition"
        data-aos="slide-up"
        data-aos-easing="ease-in-out"
      >
        <p className="italic text-gray-600">"Quality toys at great prices!"</p>
        <h3 className="mt-4 font-bold text-indigo-500">- John</h3>
      </div>

      <div
        className="bg-white w-80 p-6 rounded-2xl shadow-xl transform hover:-translate-y-2 transition"
        data-aos="zoom-in"
        data-aos-easing="ease-in-out"
      >
        <p className="italic text-gray-600">"Fast delivery and friendly service!"</p>
        <h3 className="mt-4 font-bold text-indigo-500">- Sara</h3>
      </div>
    </div>
  </section>
</div>
);
}