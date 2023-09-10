import Layout from "../components/layout/article"
import ProductCard from "../components/ProductCard";
import { Box, Text, Flex, Button } from '@chakra-ui/react';
import { useState } from "react";
import { motion } from "framer-motion";
import { useAppContext } from "../AppProvider";

const Catalogo = () => {
  const { products } = useAppContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [productFields, setProductFields] = useState(products)
  const productsPerPage = 3;

  const totalPages = Math.ceil(productFields.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const ProductForList = productFields.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Layout title="Catalogo" >
      <Box w="100%" h="100%">
        <motion.div
          initial={{ opacity: 0 }
          }
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}>
          <Text fontSize="2xl" fontWeight="bold" textAlign="left">
            Catálogo
          </Text>
        </motion.div>

        <motion.div
          initial={{ y: 100 }
          }
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.5 }}
        >
          <Flex mt={1} flexDirection={['column', 'row', 'row']} align="center" justify="center" p="1rem" gap="1rem">

            {ProductForList.map(({ _id, name, price, tags, imageUrl }) => {
              return (
                <ProductCard
                  key={_id}
                  id={_id}
                  imageUrl={imageUrl}
                  name={name}
                  price={price}
                  tags={tags}
                />
              )
            })}
          </Flex>
        </motion.div>

        <Flex justify="center" mt="1rem" mb="1rem" align="center">
          <Button
            onClick={handlePrevPage}
            bg="transparent"
            color={currentPage === 1 ? "gray.500" : "black"}
            _hover={currentPage === 1 ? { bg: "transparent", color: "gray.500" } : { bg: "transparent", color: "black" }}
            isDisabled={currentPage === 1}
          >
            Anterior
          </Button>
          <Text ml="1rem" mr="1rem" mt="0.5rem">
            {currentPage} de {totalPages}
          </Text>
          <Button
            onClick={handleNextPage}
            bg="transparent"
            color={currentPage === totalPages ? "gray.500" : "black"}
            _hover={currentPage === totalPages ? { bg: "transparent", color: "gray.500" } : { bg: "transparent", color: "black" }}
            isDisabled={currentPage === totalPages}
          >
            Próxima
          </Button>
        </Flex>
      </Box>
    </Layout>
  )
}

export default Catalogo;
