import { Backdrop, CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { LeaseContext } from "../../../contexts/lease.context";

const LeaseRequestAnalyze = ({ nextStep }) => {
  const [requestSent, setRequestSent] = useState(false);
  const { leaseRequest, analyzeLeaseRequest } = useContext(LeaseContext);
  console.log("leaseRequest=== ", leaseRequest);

  const analyzeRequest = (id) => {
    const data = {
      id,
    };
    analyzeLeaseRequest(data, nextStep);
  };

  useEffect(() => {
    if (leaseRequest && !requestSent) {
      analyzeRequest(leaseRequest?.id);
      setRequestSent(true);
    }
  }, [leaseRequest]);

  return (
    <div className="container pd-top-60 mg-bottom-100">
      <div className="single-intro style-two text-center">
        <div className="thumb">2</div>
        <div className="details">
          <h4 className="title">Estamos analizando la solicitud</h4>
          <p>Esto puede tardar unos minutos...</p>
        </div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </div>
  );
};

export default LeaseRequestAnalyze;
