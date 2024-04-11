import React, { useContext, useEffect } from "react";
import { LeaseContext } from "../../../contexts/lease.context";
import withPageLayout from "../components/page-hoc";
import { useHistory, useParams } from "react-router-dom";
import LeaseRequestResult from "../components/lease-request-result";

const LeaseRequestStep7 = () => {
  const history = useHistory();
  const { leaseRequest, getLeaseRequest } = useContext(LeaseContext);
  const { id } = useParams();

  const nextStep = () => {};
  const handleError = () => history.push(`/lease-request`);

  useEffect(() => {
    if (!leaseRequest) {
      getLeaseRequest(id, handleError);
    }
  }, [leaseRequest, getLeaseRequest, id]);

  return <LeaseRequestResult nextStep={nextStep} />;
};

export default withPageLayout(LeaseRequestStep7);
