import React, { useContext } from "react";
import { LeaseContext } from "../../../contexts/lease.context";

const publicUrl = process.env.REACT_APP_PUBLIC_URL + "/";

const LeaseRequestResult = ({ nextStep }) => {
  const { feedback } = useContext(LeaseContext);

  return (
    <div className="container pd-top-60 mg-bottom-100">
      <div className="single-intro style-two text-center">
        <div className="thumb">
          <img
            alt="img"
            src={
              feedback.error
                ? publicUrl + "assets/img/icons/32.png"
                : publicUrl + "assets/img/icons/6.png"
            }
          />
        </div>
        <div className="details">
          <h3 className="title">{feedback.title}</h3>
          <p>{feedback.body}</p>
        </div>
      </div>
    </div>
  );
};

export default LeaseRequestResult;
