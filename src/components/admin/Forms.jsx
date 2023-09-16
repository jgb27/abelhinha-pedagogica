import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Textarea,
  useToast,
  FormControl,
  FormLabel,
  Text,
  Image,
  useColorMode,
  Flex,
  Container
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { AddProduct } from "../../connect";
import { useAppContext } from "../../AppProvider"

const Forms = () => {
  const { colorMode } = useColorMode();
  const { products, setProducts } = useAppContext();
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productPdf, setProductPdf] = useState(null);
  const [productPrice, setProductPrice] = useState(0);
  const [productTags, setProductTags] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const toast = useToast({
    position: 'top-right'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName || !productImage || productPrice <= 0 || !productUrl) {
      toast({
        title: "Formulário Incompleto",
        description: "Por favor, preencha todos os campos obrigatórios.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newProduct = {
      name: productName,
      imagem_url: productImage,
      pdf_url: productPdf,
      price: productPrice,
      url: "",
      tags: productTags,
      description: productDescription,
    };

    try {

      const response = await AddProduct(newProduct).then(data => {
        setProducts([...products, data.product]);
        return data;
      })

      setProductName("");
      setProductImage(null);
      setProductPdf(null);
      setProductPrice(0);
      setProductTags("");
      setProductDescription("");

      toast({
        title: `${response.message}`,
        description: `O produto ${response.product.name} foi adicionado`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

    } catch (error) {
      toast({
        title: 'Não foi possível adicionar',
        description: `${error.response.data.message}`,
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
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
    )
  }

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
            <Text color='green.300'>Arquivo selecionado: {productPdf.name}</Text>
          </Box>
        )}

      </FormControl>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxW='container.lg' >
        <Text
          fontSize="2xl"
          fontWeight="bold"
          textAlign="center"
          color={colorMode === "dark" ? "white" : "black"}
        >
          Cadastrando produto
        </Text>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired mt={3}>
            <FormLabel>Nome do Produto</FormLabel>
            <Input
              type="text"
              placeholder="Nome do Produto"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </FormControl>
          <Flex gap={16}>
            <ImageDropZone />
            <PdfDropZone />
          </Flex>
          <FormControl isRequired mt={3}>
            <FormLabel>Preço</FormLabel>
            <Input
              type="number"
              placeholder="Preço"
              value={productPrice}
              onChange={(e) => setProductPrice(parseFloat(e.target.value))}
            />
          </FormControl>
          <FormControl isRequired mt={3}>
            <FormLabel>Tags (separadas por vírgula)</FormLabel>
            <Input
              type="text"
              placeholder="Tags (separadas por vírgula)"
              value={productTags}
              onChange={(e) => setProductTags(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired mt={3}>
            <FormLabel>Descrição</FormLabel>
            <Textarea
              placeholder="Descrição"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
          </FormControl>
          <Button type="submit" colorScheme="teal" mt={3}>
            Adicionar Produto
          </Button>
        </form>
      </Container>
    </motion.div>
  );
};

export default Forms;
