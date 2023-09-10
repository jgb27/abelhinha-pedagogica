import { Container, Table, Tbody, Td, Text, Th, Thead, Tr, IconButton, useToast } from "@chakra-ui/react";
import { AiFillDelete } from 'react-icons/ai';
import { useAppContext } from "../AppProvider";
import { DeleteProduct } from "../connect";

function ProductList() {
  const { products, setProducts } = useAppContext();
  const toast = useToast({
    position: "top-right",
  });

  const formatPrice = (price) => {
    return parseFloat(price.toString().replace(".", ",")).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleRemoveClick = async (productId) => {
    try {
      await DeleteProduct(productId);
      const updatedProducts = products.filter((product) => product._id !== productId);
      setProducts(updatedProducts);

      toast({
        title: "Produto Removido",
        description: "O produto foi removido com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error removing product:", error);
      toast({
        title: "Erro ao Remover Produto",
        description: "Ocorreu um erro ao remover o produto.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.xl" mb={8}>
      <Text fontSize="xl">Lista de Produtos</Text>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Preço</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <Tr key={product._id}>
              <Td>{product.name}</Td>
              <Td>{formatPrice(product.price)}</Td>
              <Td>
                <IconButton
                  icon={<AiFillDelete />}
                  onClick={() => handleRemoveClick(product._id)}
                  aria-label={`Remover ${product.name}`}
                  colorScheme="red"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  );
}

export default ProductList;
