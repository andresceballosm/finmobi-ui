import React from "react";
import { createContext, useState } from "react";
import { PostReq } from "../utils/network.utils";

export const BelvoContext = createContext({
  loading: false,
  getAccounts: (data) => {},
  error: null,
  setError: () => {},
  setLoading: () => {},
  setBelvoAuthToken: () => {},
});

export function BelvoProvider({ children }) {
  const [error, setError] = useState(null);
  const [belvoAuthToken, setBelvoAuthToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAccounts = async (leaseRequest, nextStep) => {
    console.log("LINK === ", leaseRequest.link);
    try {
      setLoading(true);
      const data = {
        link: leaseRequest.link,
      };
      const res = await PostReq("/v1/belvo/accounts", data);
      console.log("res accounts ", res);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BelvoContext.Provider
      value={{
        getAccounts,
        loading,
        error,
        setError,
        setLoading,
        setBelvoAuthToken,
      }}
    >
      {children}
    </BelvoContext.Provider>
  );
}
