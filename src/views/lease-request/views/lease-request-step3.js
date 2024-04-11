import React, { useContext, useEffect } from "react";
import { LeaseContext } from "../../../contexts/lease.context";
import withPageLayout from "../components/page-hoc";
import { Backdrop, CircularProgress } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import ConnectAccount from "../components/connect-account";

const LeaseRequestStep3 = () => {
  const history = useHistory();
  const { accountNumber, leaseRequest, getLeaseRequest, loading } = useContext(
    LeaseContext,
  );
  const { id } = useParams();

  const nextStep = () => {
    history.push(`/lease-request/${id}/connect/2`);
  };
  const nextTwoStep = () => history.push(`/lease-request/${id}/analyze`);
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
          nextStep={accountNumber === 2 ? nextStep : nextTwoStep}
          description="Estamos conectando su cuenta bancaria.."
          refreshLink={`/lease-request/${id}/connect/1`}
        />
      )}
    </>
  );
};

export default withPageLayout(LeaseRequestStep3);
