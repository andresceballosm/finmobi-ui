import React from "react";
import { useHistory } from "react-router-dom";
import LeaseRequestForm from "../components/lease-request-form";
import withPageLayout from "../components/page-hoc";

const LeaseRequestStep1 = () => {
  const history = useHistory();
  const nextStep = (leaseRequest) => {
    history.push(`/lease-request/${leaseRequest.id}`);
  };
  return <LeaseRequestForm nextStep={nextStep} />;
};

export default withPageLayout(LeaseRequestStep1);
