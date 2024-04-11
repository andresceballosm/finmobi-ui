import React from "react";
import { createContext, useState } from "react";
import { GetReq, PostReq } from "../utils/network.utils";

export const LeaseContext = createContext({
  loading: false,
  accountNumber: 0,
  setAccountNumber: () => {},
  quote: null,
  createLeaseRequest: () => {},
  leaseRequest: null,
  error: null,
  setError: () => {},
  setLoading: () => {},
  setLeaseRequest: () => {},
  analyzeLeaseRequest: () => {},
  createQuoteRequest: () => {},
  updateQuote: () => {},
  getLeaseRequest: () => {},
  removeLinkRequest: () => {},
  cancellationLeaseRequestOwner: () => {},
  createContract: () => {},
});

export function LeaseProvider({ children }) {
  const [leaseRequest, setLeaseRequest] = useState(null);
  const [accountsConnected, setAccountsConnected] = useState([]);
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [accountNumber, setAccountNumber] = useState(0);

  const [feedback, setFeedBack] = useState({
    title: "",
    body: "",
    error: false,
  });

  const getLeaseRequest = async (id, handleError) => {
    try {
      setLoading(true);
      const res = await GetReq(`/v1/lease/request/${id}`);
      console.log("res ", res);
      if (!res.data.error && res.status === 200) {
        setLeaseRequest(res.data.response);
      } else {
        handleError();
      }
    } catch (error) {
      setError(error?.message || "");
      setTimeout(() => {
        setError("");
      }, "10000");
    } finally {
      setLoading(false);
    }
  };

  const cancellationLeaseRequestOwner = async (data, handleResponse) => {
    try {
      setLoading(true);
      const res = await PostReq(`/v1/lease/cancellation/create`, data);
      console.log("response cancel ", res.data);
      if (!res.data.error && res.status === 200) {
        handleResponse({
          error: false,
          message: res.data.message,
        });
      } else {
        handleResponse({
          error: false,
          message: res.data.message,
        });
      }
    } catch (error) {
      setError(error?.message || "");
      setTimeout(() => {
        setError("");
      }, "10000");
    } finally {
      setLoading(false);
    }
  };

  const createLeaseRequest = async (data, nextStep) => {
    try {
      setLoading(true);
      const res = await PostReq("/v1/lease/request/create", data);
      if (!res.data.error && res.status === 201) {
        setLeaseRequest(res.data.leaseRequestTransformed);
        nextStep(res.data.leaseRequestTransformed);
      } else {
        setError(
          "Lo sentimos en el momento no es posible hacer la solicitud, intente más tarde.",
        );
      }
    } catch (error) {
      console.log("error?? ", error);
      setError(error?.message || "");
      setTimeout(() => {
        setError("");
      }, "10000");
    } finally {
      setLoading(false);
    }
  };

  const removeLinkRequest = async (data) => {
    try {
      setLoading(true);
      const res = await PostReq("/v1/lease/request/links/delete", data);
      console.log("LEASE AFTER REMOVe ", res.data);
      if (!res.data.error) {
        setLeaseRequest(res.data.lease);
      } else {
        setError(
          "Lo sentimos en el momento no es posible hacer la solicitud, intente más tarde.",
        );
      }
    } catch (error) {
      console.log("error?? ", error);
      setError(error?.message || "");
      setTimeout(() => {
        setError("");
      }, "10000");
    } finally {
      setLoading(false);
    }
  };

  const createQuoteRequest = async (data, nextStep) => {
    try {
      setLoading(true);
      const res = await PostReq("/v1/quote/create", data);
      console.log("res ", res);
      if (!res.data.error && res.status === 201) {
        setQuote(data);
        nextStep(res.data);
      }
    } catch (error) {
      setError(error?.message || "");
      setTimeout(() => {
        setError("");
      }, "10000");
    } finally {
      setLoading(false);
    }
  };

  const createContract = async (data, handleResponse) => {
    try {
      setLoading(true);
      const res = await PostReq("/v1/lease/contract/create", data);
      console.log("res ", res);
      if (!res.data.error && res.status === 200) {
        handleResponse(res.data.message);
      }
    } catch (error) {
      setError(error?.message || "");
      setTimeout(() => {
        setError("");
      }, "10000");
    } finally {
      setLoading(false);
    }
  };

  const analyzeLeaseRequest = async (data, nextStep) => {
    try {
      setLoading(true);
      const res = await PostReq("/v1/belvo/lease/analyze", data);
      if (!res.data?.error && res.status === 200) {
        setFeedBack({
          title: "Felicidades!",
          body: res.data?.response,
          error: false,
        });
      } else {
        setFeedBack({
          title: "Ouups",
          body: res.data?.response,
          error: true,
        });
      }
      nextStep();
    } catch (error) {
      setError(error?.message || "");
      setTimeout(() => {
        setError("");
      }, "10000");
    } finally {
      setLoading(false);
    }
  };

  const updateQuote = async (data, nextStep, errorAction) => {
    try {
      setLoading(true);
      const res = await PostReq("/v1/quote/update", data);
      if (res.data.error) {
        setError(
          "Lo sentimos en el momento no es posible procesar su solicitud, intente más tarde.",
        );
        setTimeout(() => {
          setError("");
        }, "10000");
        if (errorAction) {
          errorAction();
        }
      } else {
        if (nextStep) {
          nextStep();
        }
      }
    } catch (error) {
      setError(error?.message || "");
      setTimeout(() => {
        setError("");
      }, "10000");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LeaseContext.Provider
      value={{
        accountsConnected,
        analyzeLeaseRequest,
        createLeaseRequest,
        leaseRequest,
        loading,
        error,
        setError,
        setLoading,
        setLeaseRequest,
        feedback,
        createQuoteRequest,
        quote,
        updateQuote,
        accountNumber,
        setAccountNumber,
        getLeaseRequest,
        removeLinkRequest,
        cancellationLeaseRequestOwner,
        createContract,
      }}
    >
      {children}
    </LeaseContext.Provider>
  );
}
