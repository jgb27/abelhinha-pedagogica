import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useColorMode,
  Button,
  Input,
  Textarea,
  ModalHeader,
  Text,
  FormLabel,
  Flex,
  FormControl,
  Box,
  Image,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";

const EditModal = ({ isOpen, onClose, product, onSave }) => {
  const { colorMode } = useColorMode();

  const [productName, setProductName] = useState(product.name);
  const [productPrice, setProductPrice] = useState(product.price);
  const [productTags, setProductTags] = useState(product.tags.join(", "));
  const [productDescription, setProductDescription] = useState(product.description);
  const [productImage, setProductImage] = useState(null);
  const [productPdf, setProductPdf] = useState(null);

  const handleSave = async () => {
    const editedProduct = {
      _id: product._id,
      name: productName,
      price: productPrice,
      tags: productTags.split(",").map((tag) => tag.trim()),
      description: productDescription,
      imagem_url: !productImage ? product.imagem_url : productImage,
      pdf_url: !productPdf ? product.pdf_url : productPdf,
    };

    await onSave(editedProduct);
  };

  const ImageDropZone = () => {
    const onDrop = (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setProductImage(acceptedFiles[0]);
      }
    };

    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: "image/*",
      multiple: false,
    });

    return (
      <FormControl isRequired mt={3}>
        <FormLabel>Imagem do Produto</FormLabel>
        <Box
          {...getRootProps()}
          border="2px dashed #e2e8f0"
          borderRadius="md"
          p={4}
          textAlign="center"
          cursor="pointer"
        >
          <input {...getInputProps()} />
          <Text>Arraste ou Procure uma imagem aqui</Text>
        </Box>
        {productImage && (
          <Box mt={3}>
            <Text>Imagem selecionada:</Text>
            <Image src={URL.createObjectURL(productImage)} maxH="150px" />
          </Box>
        )}
      </FormControl>
    );
  };

  const PdfDropZone = () => {
    const onDrop = (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setProductPdf(acceptedFiles[0]);
      }
    };

    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: "application/pdf",
      multiple: false,
    });

    return (
      <FormControl isRequired mt={3}>
        <FormLabel>PDF do produto</FormLabel>
        <Box
          {...getRootProps()}
          border="2px dashed #e2e8f0"
          borderRadius="md"
          p={4}
          textAlign="center"
          cursor="pointer"
        >
          <input {...getInputProps()} />
          <Text>Arraste ou Procure um pdf aqui</Text>
        </Box>
        {productPdf && (
          <Box mt={3}>
            <Text color="green.300">Arquivo selecionado: {productPdf.name}</Text>
          </Box>
        )}
      </FormControl>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent
        bg={colorMode === "dark" ? "gray.800" : "white"}
        color={colorMode === "dark" ? "white" : "black"}
        boxShadow="lg"
        borderRadius="md"
        p={4}
      >
        <ModalCloseButton />
        <ModalHeader>
          <Text fontSize="xl" fontWeight="bold">
            Editando Produto
          </Text>
        </ModalHeader>
        <ModalBody>
          <Flex direction="column">
            <FormLabel>Nome do Produto</FormLabel>
            <Input
              type="text"
              placeholder="Nome do Produto"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              mt={2}
              borderRadius="md"
              borderColor="gray.300"
            />
            <FormLabel mt={4}>Preço do Produto</FormLabel>
            <Input
              type="number"
              placeholder="Preço do Produto"
              value={productPrice}
              onChange={(e) => setProductPrice(parseFloat(e.target.value))}
              mt={2}
              borderRadius="md"
              borderColor="gray.300"
            />
            <FormLabel mt={4}>Tags (separadas por vírgula)</FormLabel>
            <Input
              type="text"
              placeholder="Tags (separadas por vírgula)"
              value={productTags}
              onChange={(e) => setProductTags(e.target.value)}
              mt={2}
              borderRadius="md"
              borderColor="gray.300"
            />
            <FormLabel mt={4}>Descrição do Produto</FormLabel>
            <Textarea
              placeholder="Descrição do Produto"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              mt={2}
              borderRadius="md"
              borderColor="gray.300"
              resize="vertical"
            />
          </Flex>
          <Flex mt={4} justifyContent="space-between">
            <PdfDropZone />
            <ImageDropZone />
          </Flex>
          <Button
            colorScheme="blue"
            onClick={handleSave}
            mt={4}
            borderRadius="md"
            _hover={{ bg: "blue.600" }}
            alignSelf="flex-end"
          >
            Salvar Alterações
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
