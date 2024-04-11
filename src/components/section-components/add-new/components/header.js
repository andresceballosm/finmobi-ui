import React from "react";
const publicUrl = process.env.REACT_APP_PUBLIC_URL + "/";

export const Header = ({ title, icon }) => (
  <div className="col-md-4">
    <div className="section-title">
      <h4>
        <img src={publicUrl + icon} alt="img" />
        {title}
      </h4>
    </div>
  </div>
);
