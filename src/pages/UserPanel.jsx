import LayoutUser from "../components/user/layout/LayoutUser";
import { useAppContext } from "../AppProvider";

const userPanel = () => {
  const { page } = useAppContext();

  const CurrentPage = () => {
    switch (page) {
      case 'Produtos':
        return <h1>Produtos</h1>
      case 'Minha Conta':
        return <h1>Minha Conta</h1>
      default:
        return <h1>Not found: {page}</h1>
    }
  }

  return (
    <LayoutUser>
      {CurrentPage}
    </LayoutUser>
  )
}

export default userPanel;
