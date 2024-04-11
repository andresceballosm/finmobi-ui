import React from "react";
import Navbar from "../../components/global-components/navbar";
import Banner from "../../components/section-components/banner";
import Service from "../../components/section-components/service";
import WhyChooseUs from "../../components/section-components/why-choose-us";
import Footer from "../../components/global-components/footer";
import Steps from "../../components/section-components/steps/steps";
import { useHistory } from "react-router-dom";

const HomeComponent = () => {
  const history = useHistory();

  return (
    <div>
      <Navbar />
      <Banner />
      <Service />
      <WhyChooseUs />
      {/* <OurPartner /> */}
      <Steps />
      <Footer />
    </div>
  );
};

export default HomeComponent;
