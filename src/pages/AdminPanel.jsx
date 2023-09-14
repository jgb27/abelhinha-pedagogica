import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Forms from "../components/admin/Forms";
import LayoutAdmin from "../components/admin/layout/LayoutAdmin";
import { useAppContext } from "../AppProvider";
import ListAllProducts from "../components/admin/ListAllProducts";
import ListAllUsers from "../components/admin/ListAllUsers";

const Admin = () => {
  const navigate = useNavigate();
  const { page } = useAppContext();

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login");
    }
  }, [])

  const CurrentPage = () => {
    switch (page) {
      case 'Produtos':
        return <ListAllProducts />
      case 'Usuários':
        return <ListAllUsers />
      case '+ Produtos':
        return <Forms />
      case '':
        return <></>
      default:
        return <h1>Not found: {page}</h1>
    }
  }

  return (
    <LayoutAdmin >
      {CurrentPage()}
    </LayoutAdmin >
  );
};

export default Admin;
