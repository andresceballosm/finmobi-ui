import { Alert, Backdrop, CircularProgress } from "@mui/material";
import React, { useContext } from "react";
import Navbar from "../../../components/global-components/navbar";
import Footer from "../../../components/global-components/footer";
import PageHeader from "../../../components/global-components/page-header";
import { LeaseContext } from "../../../contexts/lease.context";

const PageLayout = ({ body }) => {
  const { error, loading } = useContext(LeaseContext);
  return (
    <div>
      <Navbar />
      <PageHeader headertitle="Solicitud" />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {error && <Alert severity="error">{error}</Alert>}
      {body}
      <Footer />
    </div>
  );
};

const withPageLayout = (WrappedComponent) => {
  return (props) => {
    return <PageLayout body={<WrappedComponent {...props} />} />;
  };
};

export default withPageLayout;
