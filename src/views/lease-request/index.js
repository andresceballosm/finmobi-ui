import { lazy } from "react";

export const LeaseRequestStep1 = lazy(() =>
  import("./views/lease-request-step1"),
);
export const LeaseRequestStep2 = lazy(() =>
  import("./views/lease-request-step2"),
);
export const LeaseRequestStep3 = lazy(() =>
  import("./views/lease-request-step3"),
);
export const LeaseRequestStep4 = lazy(() =>
  import("./views/lease-request-step4"),
);

export const LeaseRequestStep5 = lazy(() =>
  import("./views/lease-request-step5"),
);

export const LeaseRequestStep6 = lazy(() =>
  import("./views/lease-request-step6"),
);

export const LeaseRequestStep7 = lazy(() =>
  import("./views/lease-request-step7"),
);

export const LeaseRequestOwner = lazy(() =>
  import("./views/lease-request-owner"),
);

export const LeaseRequestOwnerCancellation = lazy(() =>
  import("./views/lease-request-cancel"),
);

export const LeaseRequestBankAccount = lazy(() =>
  import("./views/lease-request-bank-account"),
);
