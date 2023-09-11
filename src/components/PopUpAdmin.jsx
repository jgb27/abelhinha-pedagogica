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
  useColorMode,
} from "@chakra-ui/react";
import ProductList from "./ProductListDashboard";

const PopUpAdmin = ({ isOpen, onClose }) => {
  const { products } = useAppContext();
  const { colorMode } = useColorMode();

  const modalHeaderBgColor = { light: "teal.200", dark: "gray.700" };
  const modalHeaderTextColor = { light: "black", dark: "white" };
  const modalContentBgColor = { light: "white", dark: "gray.800" };
  const closeButtonColorScheme = { light: "teal", dark: "teal" };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent
        bg={modalContentBgColor[colorMode]}
        color={modalHeaderTextColor[colorMode]}
      >
        <ModalHeader
          bg={modalHeaderBgColor[colorMode]}
          color={modalHeaderTextColor[colorMode]}
        >
          Product List
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ProductList products={products} />
        </ModalBody>
        <Button
          colorScheme={closeButtonColorScheme[colorMode]}
          onClick={onClose}
          mt={4}
        >
          Close
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default PopUpAdmin;
