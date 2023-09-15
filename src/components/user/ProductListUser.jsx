import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  IconButton,
  useToast,
  Collapse,
  Box,
  Flex,
  Button,
  Image,
} from "@chakra-ui/react";

import { AttachmentIcon, DeleteIcon, DownloadIcon, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

import { DeleteProduct, GetProductsByUser } from "../../connect";
import DeleteConfirmationModal from "../DeleteConfirmationModal";

function ProductListUser() {
  const [products, setProducts] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await GetProductsByUser()
        setProducts(product)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const toast = useToast({
    position: "top-right",
  });

  const formatPrice = (price) => {
    return price.toString().replace(".", ",")
  };

  const handleRemoveClick = (productId) => {
    setProductIdToDelete(productId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (productIdToDelete) {
      try {
        await DeleteProduct(productIdToDelete);
        const updatedProducts = products.filter((product) => product._id !== productIdToDelete);
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
      } finally {
        setProductIdToDelete(null);
        setIsDeleteModalOpen(false);
      }
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const totalPages = Math.ceil(products.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const [expandedProduct, setExpandedProduct] = useState(null);

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

  const getNamePdf = (productPdfUrl) => {
    var parseUrl = productPdfUrl.split("/");
    var filename = parseUrl[parseUrl.length - 1];
    return decodeURIComponent(filename)
  }

  return (
    <Container maxW="full" >
      <Table variant="simple" colorScheme="whiteAlpha">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Preço</Th>
            <Th>Imagem</Th>
            <Th>Expandir</Th>
            <Th>Download</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentProducts.map((product) => (
            <React.Fragment key={product._id}>
              <Tr>
                <Td>{product.name}</Td>
                <Td>R$ {formatPrice(product.price)}</Td>
                <Td>
                  <Image src={product.image_url} alt={product.name} boxSize="50px" />
                </Td>
                <Td>
                  <Flex gap={2}>
                    <IconButton
                      icon={expandedProduct === product._id ? <TriangleUpIcon color='green.600' /> : <TriangleDownIcon color='red.300' />}
                      onClick={() => setExpandedProduct(expandedProduct === product._id ? null : product._id)}
                      aria-label={`Expandir ${product.name}`}
                    />
                  </Flex>
                </Td>
                <Td>
                  {product.pdf_url && (<IconButton
                    icon={<DownloadIcon color="green.300" />}
                    onClick={() => {
                      const href = product.pdf_url;
                      window.open(href, '_blank')
                    }}
                    aria-label={`Download ${product.name}`}
                  />)}
                </Td>
              </Tr>
              <Tr>
                <Td colSpan={5} border='none'>
                  <Collapse in={expandedProduct === product._id}>
                    <Box p={4} bg="transparent" borderRadius="none" border='none'>
                      <Text fontSize="lg" fontWeight="light">
                        <strong>Descrição do Produto:</strong> {product.description}
                      </Text>
                      <Text mt={4} fontSize="lg" fontWeight="light">
                        <strong>Tags:</strong> {product.tags.join(", ")}
                      </Text>
                      <Text mt={4} fontSize="lg" fontWeight="light">
                        <strong>Anexo:</strong> {getNamePdf(product.pdf_url)}
                      </Text>
                    </Box>
                  </Collapse>
                </Td>
              </Tr>
            </React.Fragment>
          ))}
        </Tbody>
      </Table >
      <Flex justify="center" mt="1rem" mb="1rem" align="center">
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
        <Text ml="1rem" mr="1rem" mt="0.5rem">
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
      {
        isDeleteModalOpen && (
          <DeleteConfirmationModal
            product={products.filter((product) => product._id === productIdToDelete)}
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirmDelete={handleConfirmDelete}
          />
        )
      }
    </Container >
  );
}

export default ProductListUser;
