import {
  HStack,
  Text,
  Box,
  Image,
  Link,
  Button,
  VStack,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";

import { useParams } from "react-router-dom";
import Layout from "../components/layout/article";
import { useAppContext } from "../AppProvider";

function Details() {
  const { id } = useParams();
  const { products } = useAppContext();

  try {
    const product = products.find((product) => product._id == id);

    if (!product) {
      throw new Error("Product not found");
    }

    const textColor = useColorModeValue("black", "white"); // Define a cor do texto com base no modo de cores

    const formatPrice = (price) => {
      return parseFloat(price.toString().replace(".", ",")).toLocaleString(
        "pt-BR",
        {
          style: "currency",
          currency: "BRL",
        }
      );
    };

    return (
      <Layout title={product.name}>
        <Center>
          <Text fontSize="3xl" fontWeight="bold" mb={4} color={textColor}>
            {product.name} - {formatPrice(product.price)}
          </Text>
        </Center>
        <HStack spacing={8} justifyContent="center">
          <Box
            bg={useColorModeValue("white", "gray.800")} // Cor de fundo dependente do modo de cores
            borderRadius="0.5rem"
            boxShadow="0 0 2rem rgba(0, 0, 0, 0.4)"
            p="1rem"
            textAlign="center"
          >
            <Image
              src={product.imageUrl}
              alt={product.name}
              objectFit="cover"
              borderRadius="0.5rem"
              maxW="100%"
              maxHeight="300px"
            />
          </Box>
        </HStack>
        <VStack mt={8} spacing={4} align="center">
          <Button colorScheme="blue" size="lg">
            <Link
              color="white"
              as="a"
              target="_blank"
              fontSize={["1rem", "1.5rem", "1.5rem"]}
              fontWeight="bold"
              href={product.url}
            >
              Comprar Agora
            </Link>
          </Button>
          <Box width="100%" maxWidth="600px">
            <Text fontSize="lg" fontWeight="bold" color={textColor}>
              Descrição do Produto
            </Text>
            <Text fontSize="lg" color={textColor}>
              {product.description}
            </Text>
          </Box>
        </VStack>
      </Layout>
    );
  } catch (err) {
    console.error(err);
    Navigate({ to: "/" });
    return null;
  }
}

export default Details;
