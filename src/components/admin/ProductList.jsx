// ProductList.js
import React, { useEffect, useState } from "react";
import { Container, Table, Thead, Tbody, Tr, Th, Td, Button, Flex, Text, Image } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useAppContext } from "../../AppProvider";
import { DeleteProduct, UpdateProduct } from "../../connect";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import EditModal from "../EditModal";
import ProductTableRow from "./ProductTableRow";
import Pagination from "./Pagination";

function ProductList() {
  const { products, setProducts } = useAppContext();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productId, setProductId] = useState(null);

  const toast = useToast({
    position: "top-right",
  });

  const handleRemoveClick = (productId) => {
    setProductId(productId);
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = (productId) => {
    setProductId(productId);
    setIsEditModalOpen(true);
  };

  const handleEdit = async (editedProduct) => {
    if (editedProduct) {
      try {
        await UpdateProduct(editedProduct);

        const updatedProducts = products.map((product) =>
          product._id === editedProduct._id ? editedProduct : product
        );
        setProducts(updatedProducts);

        toast({
          title: "Produto Editado",
          description: "O produto foi editado com sucesso.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        setProductId(null);
        setIsEditModalOpen(false);
      } catch (error) {
        console.error("Error editing product:", error);
        toast({
          title: "Erro ao editar Produto",
          description: "Ocorreu um erro ao editar o produto.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleConfirmDelete = async () => {
    if (productId) {
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
      } finally {
        setProductId(null);
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
    if (productPdfUrl) {
      var parseUrl = productPdfUrl.split("/");
      var filename = parseUrl[parseUrl.length - 1];
      return decodeURIComponent(filename);
    }
    return "";
  };

  return (
    <Container maxW="full">
      <Table variant="simple" colorScheme="whiteAlpha">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Preço</Th>
            <Th>Imagem</Th>
            <Th>Anexo</Th>
            <Th>Editar</Th>
            <Th>Detalhes</Th>
            <Th>Remover</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentProducts.map((product) => (
            <ProductTableRow
              key={product._id}
              product={product}
              handleEditClick={handleEditClick}
              handleRemoveClick={handleRemoveClick}
              expandedProduct={expandedProduct}
              setExpandedProduct={setExpandedProduct}
            />
          ))}
        </Tbody>
      </Table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          product={products.find((product) => product._id === productId)}
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirmDelete={handleConfirmDelete}
        />
      )}
      {isEditModalOpen && (
        <EditModal
          product={products.find((product) => product._id === productId)}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEdit}
        />
      )}
    </Container>
  );
}

export default ProductList;
