import React from "react";
import Forms from "../components/admin/Forms";
import LayoutAdmin from "../components/admin/layout/LayoutAdmin";
import { useAppContext } from "../AppProvider";
import ListAllProducts from "../components/admin/ListAllProducts";
import ListAllUsers from "../components/admin/ListAllUsers";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const { page, setPage } = useAppContext();
  const navigate = useNavigate();

  const CurrentPage = () => {
    switch (page) {
      case 'Produtos':
        return <ListAllProducts />
      case 'Usuários':
        return <ListAllUsers />
      case '+ Produtos':
        return <Forms />
      // case '+ Usuários':
      //   return <RegisterForm />
      case 'Loja':
        setPage('Produtos')
        return navigate('/catalogo')
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
