import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  Spacer,
  Flex,
  Badge,
  useColorMode,
  Center,
} from '@chakra-ui/react';

import { useParams } from "react-router-dom";
import Layout from "../components/layout/article";
import { useAppContext } from "../AppProvider";

const Details = () => {
  const { id } = useParams();
  const { products } = useAppContext();
  const { colorMode } = useColorMode();

  const product = products.find((product) => product._id == id);

  if (!product) {
    throw new Error("Product not found");
  }

  const textColor = colorMode == 'dark' ? 'white' : 'black'; // Define a cor do texto com base no modo de cores

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
      <Center mt='20%'>
        <Box
          borderWidth="0px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="lg"
        >
          <Flex
            alignItems='center'
            justifyContent='center'
          >
            <Image
              src={product.image_url}
              alt={product.name}
              borderRadius="md"
              objectFit="contain"
              height="400px"
              width="100%"
            />
            <Box mr='5%'>
              <Flex justifyContent="space-between">
                <Heading fontSize="2xl">{product.name}</Heading>
                <Badge colorScheme="green" variant="solid">
                  Em Estoque
                </Badge>
              </Flex>
              <Text mt={2} color={textColor} fontSize="lg" fontWeight="semibold">
                {formatPrice(product.price)}
              </Text>
              <Text mt={2} fontSize="md" color={textColor}  >
                {product.description}
              </Text>
              <Spacer />
              <Button
                colorScheme="teal"
                size="lg"
                width="100%"
                mt={4}
                fontSize="lg"
                fontWeight="bold"
              >
                Comprar agora
              </Button>
            </Box>
          </Flex>
        </Box>
      </Center>
    </Layout >
  );
}

export default Details;
