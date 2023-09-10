import React from "react";
import { useAppContext } from "../AppProvider";

import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import ProductList from "./ProductListDashboard";

const PopUpAdmin = ({ isOpen, onClose }) => {
  const { products } = useAppContext();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Product List</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ProductList products={products} />
        </ModalBody>
        <Button colorScheme="teal" onClick={onClose} mt={4}>
          Close
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default PopUpAdmin;

