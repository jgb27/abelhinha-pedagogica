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

import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/layout/article";
import { useAppContext } from "../AppProvider";
import { CreateOrder, GetProductsByUser } from '../connect';
import { useEffect, useState } from 'react';

const Details = () => {
  const { id } = useParams();
  const [isDisabled, setIsDisabled] = useState(false);
  const { products } = useAppContext();
  const { colorMode } = useColorMode();
  const navigate = useNavigate();

  const product = products.find((product) => product._id == id);

  useEffect(() => {
    const verify = async () => {
      const prod = await GetProductsByUser();
      const found = prod.some((p) => p._id == product._id);
      if (found) {
        setIsDisabled(true)
        return false;
      } else {
        setIsDisabled(false)
        return true;
      }
    }

    if (localStorage.getItem('token')) {
      verify()
    } else {
      setIsDisabled(false)
    }

  })

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

  const toBuy = async () => {
    if (localStorage.getItem('token')) {
      const { response } = await CreateOrder({
        productId: product._id,
        productName: product.name,
        productPrice: product.price
      });

      window.open(response.checkout, '_blank');
    } else {
      navigate('/login')
    }
  }

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
              <Flex justifyContent="space-between" alignItems='center'>
                <Heading fontSize="2xl">{product.name}</Heading>
                <Badge p={1.5} colorScheme={isDisabled ? "yellow" : "green"} variant="outline">
                  {isDisabled ? "Adquirido" : "Disponível"}
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
                onClick={() => {
                  isDisabled
                    ? navigate('/login')
                    : toBuy()
                }}
              >
                {isDisabled ? "Acesse o produto" : "Compre agora"}
              </Button>
            </Box>
          </Flex>
        </Box>
      </Center>
    </Layout >
  );
}

export default Details;
