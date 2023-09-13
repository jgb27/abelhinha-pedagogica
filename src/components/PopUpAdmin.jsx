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
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent
        bg={modalContentBgColor[colorMode]}
        color={modalHeaderTextColor[colorMode]}
        boxShadow="lg"
        borderRadius="md"
        p={4}
      >
        <ModalCloseButton />
        <ModalBody>
          <ProductList products={products} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PopUpAdmin;
