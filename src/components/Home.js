import React from "react";
import Offers from "./products/Offers";
import MostDemandProducts from "./products/mostDemandProducts";
import LatestProducts from "./products/LatestProducts";

const Home = () => {
  return (
    <div className=" flex flex-col pb-6  bg-amber-400 bg-contain  gap-10">
      <LatestProducts></LatestProducts>

      <Offers></Offers>
      <MostDemandProducts></MostDemandProducts>
    </div>
  );
};

export default Home;
