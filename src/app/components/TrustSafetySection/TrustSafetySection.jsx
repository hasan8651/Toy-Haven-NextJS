const trustPoints = [
  {
    title: "Safety Certified Toys",
    description:
      "We only stock toys that meet international safety standards and age guidelines.",
    icon: "🛡️",
  },
  {
    title: "Eco-Friendly Materials",
    description:
      "Many of our toys use sustainable wood, non-toxic paints, and recyclable packaging.",
    icon: "🌱",
  },
  {
    title: "7-Day Return Policy",
    description:
      "If something isn't right, you can request a return or exchange within 7 days.",
    icon: "↩️",
  },
  {
    title: "Secure Payment",
    description:
      "Encrypted checkout with trusted payment partners so your data stays safe.",
    icon: "💳",
  },
];

export default function TrustSafetySection() {
  return (
    <section className="bg-blue-500 text-white rounded-md shadow-xl mx-auto my-4 py-8">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-center text-3xl font-bold">
          Why Parents Trust Toy Haven
        </h2>
        <p className="mt-2 text-center text-sm md:text-md text-blue-200">
Safe, sustainable, and trusted toy shopping in one place
        </p>

        <div className="mt-8 grid gap-4 grid-cols-2 md:grid-cols-4">
          {trustPoints.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-start rounded-2xl p-4 shadow-xl ring-2 ring-blue-100"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
                {item.icon}
              </div>
              <h3 className="mt-3 text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-blue-100">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}