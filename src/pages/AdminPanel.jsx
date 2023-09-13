import React, { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import Layout from "../components/layout/article";
import { AddProduct } from "../connect";
import PopUpAdmin from "../components/PopUpAdmin";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      navigate("/login");
    }
  }, [])

  const [isProductListOpen, setProductListOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productPrice, setProductPrice] = useState(0);
  const [productUrl, setProductUrl] = useState("");
  const [productTags, setProductTags] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const toast = useToast();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

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
      imagem: productImage,
      price: productPrice,
      url: productUrl,
      tags: productTags,
      description: productDescription,
    };

    console.log(newProduct)
    const response = await AddProduct(newProduct)

    setProductName("");
    setProductImage(null);
    setProductPrice(0);
    setProductUrl("");
    setProductTags("");
    setProductDescription("");

    toast({
      title: `${response.message}`,
      description: `O produto ${response.product.name} foi adicionado`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

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
    <Layout title="Adicionar Produto">
      <form onSubmit={handleSubmit}>
        <Button
          type="button"
          colorScheme="red"
          mt={3}
          onClick={handleLogout}
        >
          Logout
        </Button>
        <FormControl isRequired mt={3}>
          <FormLabel>Nome do Produto</FormLabel>
          <Input
            type="text"
            placeholder="Nome do Produto"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </FormControl>
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
          <FormLabel>URL do Produto</FormLabel>
          <Input
            type="url"
            placeholder="URL do Produto"
            value={productUrl}
            onChange={(e) => setProductUrl(e.target.value)}
          />
        </FormControl>
        <FormControl mt={3}>
          <FormLabel>Tags (separadas por vírgula)</FormLabel>
          <Input
            type="text"
            placeholder="Tags (separadas por vírgula)"
            value={productTags}
            onChange={(e) => setProductTags(e.target.value)}
          />
        </FormControl>
        <FormControl mt={3}>
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
        <Button colorScheme="messenger" ml={3} mt={3} onClick={() => setProductListOpen(true)}>
          Listar todos os produtos
        </Button>

        <PopUpAdmin
          isOpen={isProductListOpen}
          onClose={() => { setProductListOpen(false) }}
        />
      </form>
    </Layout>
  );
};

export default Admin;
