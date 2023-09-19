import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Center,
} from "@chakra-ui/react";

function DeleteConfirmationModal({ product, isOpen, onClose, onConfirmDelete }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirmação de Exclusão</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Você tem certeza que deseja excluir: {product.name}</Text>
        </ModalBody>
        <ModalFooter>
          <Center w='100%'>
            <Button variant="outline" colorScheme="green" mr={3} onClick={onConfirmDelete}>
              Confirmar
            </Button>
            <Button variant="outline" colorScheme="red" onClick={onClose}>
              Cancelar
            </Button>
          </Center>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DeleteConfirmationModal;
