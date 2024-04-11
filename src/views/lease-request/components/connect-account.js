import React, { useContext, useEffect, useState } from "react";
import { BelvoContext } from "../../../contexts/belvo.context";
import { LeaseContext } from "../../../contexts/lease.context";
import useScript from "../../../hooks/useScript.hook";
import { Backdrop, CircularProgress } from "@mui/material";
import { Link, useHistory } from "react-router-dom";

const ConnectAccount = ({ nextStep, description, refreshLink }) => {
  const history = useHistory();
  const { setBelvoAuthToken } = useContext(BelvoContext);
  const {
    leaseRequest,
    error,
    setError,
    setLoading,
    setLeaseRequest,
  } = useContext(LeaseContext);

  useScript(
    "https://cdn.belvo.io/belvo-widget-1-stable.js",
    leaseRequest.id,
    setError,
    nextStep,
    setLoading,
    setLeaseRequest,
    setBelvoAuthToken,
  );

  return (
    <div id="belvo" className="container pd-top-60 mg-bottom-100">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!error}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {error ? (
        <div className="col-12">
          <div className="col-12 mt-1">
            <button
              className="col-12 btn btn-yellow"
              onClick={() =>
                history.push(`/lease-request/${leaseRequest.id}/accounts`)
              }
            >
              Continuar
            </button>
          </div>
          <div className="col-12 mb-5  mt-2 wp-caption-text">
            <button
              className="col-12 btn"
              onClick={() => history.push(refreshLink)}
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      ) : (
        <p>{description}</p>
      )}
    </div>
  );
};

export default ConnectAccount;
