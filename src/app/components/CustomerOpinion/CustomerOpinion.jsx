const opinions = [
  {
    name: "Mia",
    role: "Mom of a 4-year-old",
    quote:
      "Best toy shop ever! My kid absolutely loves the wooden train set we got.",
    rating: 4.9,
  },
  {
    name: "John",
    role: "Dad & STEM enthusiast",
    quote:
      "Quality toys at great prices. The robotics kit was a huge hit at home.",
    rating: 4.8,
  },
  {
    name: "Sara",
    role: "Busy working parent",
    quote:
      "Fast delivery, friendly service and really safe toys. Highly recommended!",
    rating: 4.6,
  },
];

function Stars({ value }) {
  return (
    <div className="flex items-center gap-1 text-yellow-400">
      {"★★★★★".split("").map((star, i) => (
        <span key={i} className={i < Math.round(value) ? "" : "opacity-30"}>
          ★
        </span>
      ))}
      <span className="ml-1 text-sm font-semibold text-blue-200">
        {value.toFixed(1)}/5
      </span>
    </div>
  );
}

export default function CustomerOpinion() {
  return (
    <section className="bg-blue-500 text-white rounded-md shadow-xl mx-auto my-4 py-8">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-center text-3xl font-bold">
          What Our Customers Say
        </h2>
        <p className="mt-2 text-center text-blue-200">
          Real stories from families who shop at Toy Haven.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {opinions.map((o) => (
            <div
              key={o.name}
              className="flex flex-col items-start rounded-2xl p-4 shadow-xl ring-2 ring-blue-100"
            >
              <Stars value={o.rating} />
              <p className="my-4 text-blue-100 italic">“{o.quote}”</p>
              <div    className="items-center justify-center rounded-2xl bg-blue-200 px-6 py-2 font-semibold ">
                <p className=" font-semibold text-blue-600">
                  - {o.name}
                </p>
                <p className="text-sm text-blue-500/70">{o.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}