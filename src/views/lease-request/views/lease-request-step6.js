import React, { useContext, useEffect } from "react";
import LeaseRequestAnalyze from "../components/lease-request-analyze";
import { LeaseContext } from "../../../contexts/lease.context";
import withPageLayout from "../components/page-hoc";
import { useHistory, useParams } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";

const LeaseRequestStep6 = () => {
  const history = useHistory();
  const { leaseRequest, getLeaseRequest } = useContext(LeaseContext);
  const { id } = useParams();

  const nextStep = () => history.push(`/lease-request/${id}/result`);
  const handleError = () => history.push(`/lease-request`);

  useEffect(() => {
    if (!leaseRequest) {
      getLeaseRequest(id, handleError);
    }
  }, [leaseRequest, getLeaseRequest, id]);

  return (
    <>
      {!leaseRequest ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <LeaseRequestAnalyze nextStep={nextStep} />
      )}
    </>
  );
};

export default withPageLayout(LeaseRequestStep6);
