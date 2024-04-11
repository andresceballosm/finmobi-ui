import React, { lazy, Suspense } from "react";
import { withRouter } from "react-router-dom";

const LazyLoad = (importFunc) => {
  const LazyComponent = lazy(importFunc);
  const LazyComponentWithRouter = withRouter(LazyComponent);

  return (props) => (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponentWithRouter {...props} />
    </Suspense>
  );
};

export default LazyLoad;
