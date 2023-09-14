import React from "react";
import Forms from "../components/admin/Forms";
import LayoutAdmin from "../components/admin/layout/LayoutAdmin";
import { useAppContext } from "../AppProvider";
import ListAllProducts from "../components/admin/ListAllProducts";
import ListAllUsers from "../components/admin/ListAllUsers";

const Admin = () => {
  const { page } = useAppContext();

  const CurrentPage = () => {
    switch (page) {
      case 'Produtos':
        return <ListAllProducts />
      case 'Usuários':
        return <ListAllUsers />
      case '+ Produtos':
        return <Forms />
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
