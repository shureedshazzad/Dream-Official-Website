import Header from "../components/Header";
import Goals from "../components/Goals";
import WhyDonate from "../components/WhyDonate";
import Eligibility from "../components/Eligibility";



import React from 'react'

function Homescreen() {
  return (
    <div>
        <Header/>
        <Goals/>
        <WhyDonate/>
        <Eligibility/>
    </div>
  );
}

export default Homescreen