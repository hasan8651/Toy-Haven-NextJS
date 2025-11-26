import Image from 'next/image';


export default function page() {
return (
<div className="min-h-screen bg-blue-50 mb-2 mt-8 shadow-lg rounded-lg mx-2 md:mx-12">
<section className=" mx-auto px-6 py-10">
 <h1 className='w-full text-2xl md:text-3xl py-4 mb-4 md:mb-12 font-semibold text-center bg-blue-500 text-white rounded-md'>
About Toy Haven
</h1>


    <p className="max-w-5xl mx-auto text-gray-800 leading-relaxed text-lg mb-6 text-center">
      At <span className="font-semibold text-blue-500">Toy Haven</span>, we believe play
      sparks creativity and imagination. Since 2022, our mission has been to
      inspire young minds through fun, learning-driven toys that make every
      playtime magical. We're a cheerful team of dreamers, designers, and
      toy-enthusiasts shaping a world where creativity has no limits.
    </p>

    <div className="flex flex-wrap justify-center gap-6 mt-8 text-xl">
      <div className="text-center">
        <Image
          src="/Alex.jpg"
          alt="Alex - Creative Lead"
          width={112}
          height={112}
          className="w-28 h-28 object-cover rounded-full mx-auto border shadow-sm"
        />
        <p className="mt-2 font-medium text-blue-500">Alex</p>
        <p className="text-sm text-gray-500">Creative Lead</p>
      </div>

      <div className="text-center">
        <Image
          src="/Maya.jpg"
          alt="Maya - Product Designer"
          width={112}
          height={112}
          className="w-28 h-28 object-cover rounded-full mx-auto border shadow-sm"
        />
        <p className="mt-2 font-medium text-blue-500">Maya</p>
        <p className="text-sm text-gray-500">Product Designer</p>
      </div>

      <div className="text-center">
        <Image
          src="/Leo.jpg"
          alt="Leo - Support Hero"
          width={112}
          height={112}
          className="w-28 h-28 object-cover rounded-full mx-auto border shadow-sm"
        />
        <p className="mt-2 font-medium text-blue-500">Leo</p>
        <p className="text-sm text-gray-500">Support Hero</p>
      </div>
    </div>
  </section>
</div>
);
}