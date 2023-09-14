import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Forms from "../components/admin/Forms";
import LayoutAdmin from "../components/admin/layout/LayoutAdmin";
import { useAppContext } from "../AppProvider";
import HomeAdmin from "../components/admin/HomeAdmin";

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
        return <HomeAdmin />
      case 'Usuário':
        return <h1>User</h1>
      case '+ Produtos':
        return <Forms />
      default:
        return <h1>{page}</h1>
    }
  }

  return (
    <LayoutAdmin >
      {CurrentPage()}
    </LayoutAdmin >
  );
};

export default Admin;
