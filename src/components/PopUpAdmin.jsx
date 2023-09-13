import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useColorMode,
} from "@chakra-ui/react";
import ProductList from "./ProductListDashboard";

const PopUpAdmin = ({ isOpen, onClose, products }) => {
  const { colorMode } = useColorMode();

  const modalHeaderTextColor = { light: "black", dark: "white" };
  const modalContentBgColor = { light: "white", dark: "gray.800" };

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
