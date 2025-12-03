"use client";

import { useState } from "react";

export default function NewsLetter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    //  in future need dynamic API route (/api/newsletter)
    setSubmitted(true);
  };

  return (
    <section className="bg-blue-500 py-8">
      <div className="mx-auto max-w-5xl px-4 text-center text-white">
        <h2 className="text-3xl font-bold">Join the Toy Haven Club</h2>
        <p className="mt-2 text-sm md:text-md text-blue-200">
          Get <span className="font-semibold">10% off</span> on your first
          order, plus exclusive deals and parenting tips in your inbox.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col items-center gap-3 md:flex-row md:justify-center"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full max-w-md rounded-xl border border-blue-200 bg-white text-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            className="w-full max-w-40 rounded-full bg-white/80 px-5 py-2 font-semibold text-blue-600 shadow transition hover:bg-white/50 cursor-pointer"
          >
            Subscribe
          </button>
        </form>

        {submitted && (
          <p className="mt-3 text-sm text-blue-200">
            Thanks for subscribing! Check your inbox for a welcome gift. 🎁
          </p>
        )}
      </div>
    </section>
  );
}
