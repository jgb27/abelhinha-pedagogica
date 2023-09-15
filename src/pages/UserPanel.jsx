import LayoutUser from "../components/user/layout/LayoutUser";
import { useAppContext } from "../AppProvider";
import ProductListUser from "../components/user/ProductListUser";

const userPanel = () => {
  const { page } = useAppContext();

  const CurrentPage = () => {
    switch (page) {
      case 'Produtos':
        return <ProductListUser />
      case 'Minha Conta':
        return <h1>Minha Conta</h1>
      default:
        return <h1>Not found: {page}</h1>
    }
  }

  return (
    <LayoutUser>
      {CurrentPage()}
    </LayoutUser>
  )
}

export default userPanel;
