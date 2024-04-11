import React, { useContext, useEffect } from "react";
import Step2 from "../components/step-2";
import { LeaseContext } from "../../../contexts/lease.context";
import withPageLayout from "../components/page-hoc";
import { Backdrop, CircularProgress } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";

const LeaseRequestStep2 = () => {
  const history = useHistory();
  const {
    setAccountNumber,
    leaseRequest,
    getLeaseRequest,
    loading,
  } = useContext(LeaseContext);
  const { id } = useParams();
  
  const nextStep = () => {
    history.push(`/lease-request/${id}/connect/1`);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleError = () => {
    history.push(`/lease-request`);
  };

  useEffect(() => {
    if (!leaseRequest) {
      getLeaseRequest(id, handleError);
    }
  }, [leaseRequest, getLeaseRequest, id, handleError]);

  return (
    <>
      {loading || !leaseRequest ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Step2
          nextStep={nextStep}
          setAccountNumber={setAccountNumber}
          totalAmount={leaseRequest?.total || 0}
        />
      )}
    </>
  );
};

export default withPageLayout(LeaseRequestStep2);
