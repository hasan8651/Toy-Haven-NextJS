import { Herr_Von_Muellerhoff } from "next/font/google";
import CustomerOpinion from "./components/CustomerOpinion/CustomerOpinion";
import Hero from "./components/Hero/Hero";
import PopularToys from "./components/PopularToys/PopularToys";
import Status from "./components/Status/Status";
import TrustSafetySection from "./components/TrustSafetySection/TrustSafetySection";
import NewsLetter from "./components/NewsLetter/NewsLetter";

export default function Home() {
  return (
    <div>
      <Hero />
             <Status />
      <PopularToys />
      <TrustSafetySection/>
      <CustomerOpinion />
      <NewsLetter/>
    </div>
  );
}
