import Layout from "../components/layout/article";
import NotFound from "../components/NotFound"
import ProductCard from "../components/ProductCard";
import { Box, Text, Flex, Button, useColorMode, useToast, Input, Select, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAppContext } from "../AppProvider";
import { FindProduct } from "../connect";
import LoadingSpinner from "../components/LoadingSpinner";

const Catalogo = () => {
  const image = "https://abelhinha-bucket.s3.sa-east-1.amazonaws.com/404.svg" || "/assets/404.svg"
  const { products } = useAppContext();
  const { colorMode } = useColorMode();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productFields, setProductFields] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('name');
  const productsPerPage = 6;
  const toast = useToast({
    position: "top-right"
  });

  useEffect(() => {
    setProductFields(products);
    handleIsLoading();
  }, [products]);

  const totalPages = Math.ceil(productFields.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const ProductForList = productFields.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleIsLoading = () => {
    setLoading(false);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearch = async () => {
    try {
      if (searchTerm) {
        const { product } = await FindProduct({ name: searchTerm, term: searchOption })
        setProductFields(product)
      } else {
        setProductFields(products);
      }
    } catch (error) {
      toast({
        title: "Erro find product",
        description: error,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const NextPrev = () => {
    return (
      <Flex justify="center" mt={4} mb={4} alignItems="center">
        <Button
          onClick={handlePrevPage}
          bg="transparent"
          color={currentPage === 1 ? "gray.500" : "white"}
          _hover={
            currentPage === 1
              ? { bg: "transparent", color: "gray.500" }
              : { bg: "transparent", color: "gray.300" }
          }
          isDisabled={currentPage === 1}
        >
          Anterior
        </Button>
        <Text mx={4}>
          {currentPage} de {totalPages}
        </Text>
        <Button
          onClick={handleNextPage}
          bg="transparent"
          color={currentPage === totalPages ? "gray.500" : "white"}
          _hover={
            currentPage === totalPages
              ? { bg: "transparent", color: "gray.500" }
              : { bg: "transparent", color: "gray.300" }
          }
          isDisabled={currentPage === totalPages}
        >
          Próxima
        </Button>
      </Flex>
    )
  }

  return (
    <Layout title="Catalogo">
      <Box w="100%" h="100%">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Flex
            flexDirection={["column", "column", "row"]}
            alignItems="center"
            justifyContent="space-between"
            padding={4}
          >
            <Text
              fontSize="2xl"
              fontWeight="bold"
              textAlign="center"
              color={colorMode === "dark" ? "white" : "black"}
            >
              Catálogo
            </Text>
            <Flex alignItems="center" mt={4} flexDirection={["column", "column", "row"]}>
              <Input
                flex="1"
                border="none"
                mt={2}
                placeholder={`Pesquisar itens por`}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  handleSearch()
                }}
                onBlur={handleSearch}
              />
              <Select
                flex="1"
                cursor="po"
                border="none"
                mt={2}
                _focus={{
                  border: "none"
                }}
                value={searchOption}
                onChange={(e) => {
                  setSearchOption(e.target.value)
                  handleSearch()
                }}
              >
                <option value="name">Nome</option>
                <option value="tag">Tag</option>
              </Select>
            </Flex>
          </Flex>
        </motion.div>

        {!loading
          ? <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.7 }}
          >
            {ProductForList > 3 ? <NextPrev /> : <></>}
            <Flex
              mt={4}
              flexWrap="wrap"
              flexDirection="row"
              align="center"
              justify="center"
              gap={3}
            >
              {
                ProductForList.length > 0 ? ProductForList.map(({ _id, name, price, tags, image_url }) => {
                  return (
                    <ProductCard
                      key={_id}
                      id={_id}
                      imageUrl={image_url}
                      name={name}
                      price={price}
                      tags={tags}
                    />
                  );
                })
                  :
                  <NotFound title="Not found" image={image} />
              }
            </Flex>
          </motion.div>
          : <Center><LoadingSpinner loading={loading} /></Center>
        }
        <NextPrev />
      </Box>
    </Layout>
  );
};

export default Catalogo;
