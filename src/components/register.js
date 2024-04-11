import React from "react";
import Navbar from "./global-components/navbar";
import PageHeader from "./global-components/page-header";
import RegistraionSection from "./section-components/register/register";
import Footer from "./global-components/footer";

const Register = () => {
  return (
    <div>
      <Navbar />
      <PageHeader headertitle="Registro" />
      <RegistraionSection />
      <Footer />
    </div>
  );
};

export default Register;
