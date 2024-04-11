import React from "react";
import { createContext, useContext, useState } from "react";

const listingContext = createContext({
  loading: false,
  listings: [],
  listing: null,
});

export const useListings = () => {
  const context = useContext(listingContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};

export function ListingsProvider({ children }) {
  const [listings, setListings] = useState([]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <listingContext.Provider
      value={{
        listing,
        listings,
        loading,
      }}
    >
      {children}
    </listingContext.Provider>
  );
}
