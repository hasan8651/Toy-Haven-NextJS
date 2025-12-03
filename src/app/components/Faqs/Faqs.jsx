"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How long does delivery take?",
    answer:
      "Within Dhaka, orders usually arrive in 2–3 business days. Outside Dhaka, delivery may take 3–5 business days depending on the courier and location.",
  },
  {
    question: "What is your return and refund policy?",
    answer:
      "You can request a return within 7 days of receiving your order if the toy is unused, in its original packaging, and has all tags/labels attached. Once we receive and inspect the item, we’ll process your refund or exchange.",
  },
  {
    question: "Are your toys safe for children?",
    answer:
      "Yes. We only source toys that meet international safety standards (such as EN71/ASTM) and are free from toxic materials like BPA and lead. We also clearly mention recommended age on each product page.",
  },
  {
    question: "Where are your products made?",
    answer:
      "We work with trusted local and international brands. Product origin (e.g. Bangladesh, China, EU) is mentioned on each product detail page so you can make an informed choice.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept cash on delivery (COD), major mobile banking options (like bKash/Nagad), and online card payments depending on availability in your region.",
  },
  {
    question: "How do I know if a toy is right for my child's age?",
    answer:
      "Every toy on ToyTopia includes a recommended age range (e.g. Age 3+). You can also use filters like ‘Shop by Age’ on our site to quickly find age-appropriate toys.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="bg-sky-50 py-12">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-center text-3xl font-bold text-sky-900">
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          ডেলিভারি, রিটার্ন, সেফটি আর প্রোডাক্ট সম্পর্কিত কমন প্রশ্নের উত্তর।
        </p>

        <div className="mt-8 space-y-3">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                className="rounded-xl bg-white shadow-sm ring-1 ring-slate-100"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                >
                  <span className="text-sm font-semibold text-slate-900">
                    {item.question}
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-sky-700 text-xs">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 text-sm text-slate-600">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}