import CustomerOpinion from "./components/CustomerOpinion/CustomerOpinion";
import Hero from "./components/Hero/Hero";
import PopularToys from "./components/PopularToys/PopularToys";
import Status from "./components/Status/Status";


export default function Home() {
  return (
    <div>
      
        <Hero/>
      <Status/>
      <PopularToys/>
<CustomerOpinion/>
      
    </div>
  );
}
