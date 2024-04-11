import React from "react";
import { createContext, useContext, useState } from "react";
import { PostReq } from "../utils/network.utils";

const authContext = createContext({
  login: null,
  loading: false,
  user: null,
  logout: () => {},
  registerWithEmailAndPassword: () => {},
});

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (email, password) => {
    return null;
  };

  const registerWithEmailAndPassword = async (data) => {
    try {
      setLoading(true);
      const res = await PostReq("/v1/auth/register", data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => null;

  return (
    <authContext.Provider
      value={{
        login,
        user,
        logout,
        loading,
        registerWithEmailAndPassword,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
