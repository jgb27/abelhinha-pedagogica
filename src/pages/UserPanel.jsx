import LayoutUser from "../components/user/layout/LayoutUser";
import { useAppContext } from "../AppProvider";
import ProductListUser from "../components/user/ProductListUser";
import { useNavigate } from 'react-router-dom'

const userPanel = () => {
  const { page, setPage } = useAppContext();
  const navigate = useNavigate();

  const CurrentPage = () => {
    switch (page) {
      case 'Produtos':
        return <ProductListUser />
      case 'Loja':
        setPage('Produtos')
        return navigate('/catalogo')
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
