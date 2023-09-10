import {
  Container,
  HStack,
  Text,
  Box,
  Image,
  Link,
  Button,
  VStack,
  Center,
} from "@chakra-ui/react";

import { useParams } from "react-router-dom";
import Layout from "../components/layout/article";

const productFields = [{
  id: 1,
  imageUrl: "/src/assets/tmpImg.jpg",
  name: "Atividades para colorir 1",
  price: 30.00,
  tags: ["Atividades", "Imprimir"],
  url: "https://www.google.com.br",
  description: "Um belo produto para sua criança brincar e se divertir"
},
{
  id: 2,
  imageUrl: "/src/assets/tmpImg.jpg",
  name: "Atividades para colorir 2",
  price: 291.90,
  tags: ["Atividades", "Imprimir"],
  url: "https://www.google.com.br",
  description: "Um belo produto para sua criança brincar e se divertir"

},
{
  id: 3,
  imageUrl: "/src/assets/tmpImg.jpg",
  name: "Atividades para colorir 3",
  price: 21.90,
  tags: ["Atividades", "Imprimir"],
  url: "https://www.google.com.br",
  description: "Um belo produto para sua criança brincar e se divertir"
},
{
  id: 4,
  imageUrl: "/src/assets/tmpImg.jpg",
  name: "Atividades para colorir 4",
  price: 21.90,
  tags: ["Atividades", "Imprimir"],
  url: "https://www.google.com.br",
  description: "Um belo produto para sua criança brincar e se divertir"
},]

function Details() {
  const { id } = useParams();
  const product = productFields.find((product) => product.id.toString() === id);

  const formatPrice = (price) => {
    return parseFloat(price.toString().replace('.', ',')).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <Layout title={product.name}>
      <Center>
        <Text fontSize="3xl" fontWeight="bold" mb={4}>
          {product.name} - {formatPrice(product.price)}
        </Text>
      </Center>
      <HStack spacing={8} justifyContent="center">
        <Box
          bg="white"
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
            fontSize={['1rem', '1.5rem', '1.5rem']}
            fontWeight="bold"
            href={product.url}
          >
            Comprar Agora
          </Link>
        </Button>
        <Box width="100%" maxWidth="600px">
          <Text fontSize="lg" fontWeight="bold">
            Descrição do Produto
          </Text>
          <Text fontSize="lg">{product.description}</Text>
        </Box>
      </VStack>
    </Layout>
  );
}

export default Details;
