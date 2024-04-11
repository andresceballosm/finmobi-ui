import React, { useContext, useEffect } from "react";
import { LeaseContext } from "../../../contexts/lease.context";
import withPageLayout from "../components/page-hoc";
import { Backdrop, CircularProgress } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import ConnectAccount from "../components/connect-account";

const LeaseRequestStep4 = () => {
  const history = useHistory();
  const { leaseRequest, getLeaseRequest, loading } = useContext(LeaseContext);
  const { id } = useParams();
  console.log("id ", id);

  const nextStep = () => history.push(`/lease-request/${id}/accounts`);
  const handleError = () => history.push(`/lease-request`);

  useEffect(() => {
    if (!leaseRequest) {
      getLeaseRequest(id, handleError);
    }
  }, [leaseRequest, getLeaseRequest]);

  return (
    <>
      {!leaseRequest ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <ConnectAccount
          nextStep={nextStep}
          description="Estamos conectando su segunda cuenta bancaria.."
          refreshLink={`/lease-request/${id}/connect/2`}
        />
      )}
    </>
  );
};

export default withPageLayout(LeaseRequestStep4);
