import React, { createContext, useContext, useState, useEffect } from "react";
import { GetAllProduct, GetAllUsers } from "./connect";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [productFields, setProductFields] = useState([]);
  const [page, setPage] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await GetAllProduct();
        setProductFields(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const appContextValue = {
    products: productFields,
    setProducts: setProductFields,
    page: page,
    setPage: setPage,
  };

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
