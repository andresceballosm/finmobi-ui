import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom";
import { AuthProvider } from "./contexts/auth.context";
import { LeaseProvider } from "./contexts/lease.context";
import { BelvoProvider } from "./contexts/belvo.context";
import Routes from "./navigation/routes";

const Root = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <AuthProvider>
          <BelvoProvider>
            <LeaseProvider>
              <Routes />
            </LeaseProvider>
          </BelvoProvider>
        </AuthProvider>
      </Suspense>
    </Router>
  );
};

export default Root;

ReactDOM.render(<Root />, document.getElementById("realdeal"));
