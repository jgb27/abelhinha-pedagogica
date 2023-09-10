import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";

function ProductImageUpload({ onImageUpload }) {

  const handleImageUpload = (e) => {
  };

  return (
    <FormControl mt={2}>
      <FormLabel>Imagem</FormLabel>
      <Input type="file" accept="image/*" onChange={handleImageUpload} border="none" />
    </FormControl>
  );
}

function AddTags({ tags, onTagsChange }) {
  const handleTagsChange = (e) => {
    const { value } = e.target;
    const newTags = value.split(',');
    onTagsChange(newTags);
  };

  return (
    <FormControl mt={2}>
      <FormLabel>Tags</FormLabel>
      <Input border="1px solid black" type="text" name="tags" value={tags.join(',')} onChange={handleTagsChange} />
    </FormControl>
  );
}

function FormAdd() {
  const [newProduct, setNewProduct] = useState({
    id: 0,
    image: "",
    title: "",
    price: 0,
    url: "",
    tags: [],
    description: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageUpload = (imageUrl) => {
    setNewProduct({ ...newProduct, image: imageUrl });
  };

  const handleTagsChange = (newTags) => {
    setNewProduct({ ...newProduct, tags: newTags });
  };

  const handleAddProduct = () => {
    onAddProduct(newProduct);
    setNewProduct({
      id: 0,
      image: "",
      title: "",
      price: 0,
      url: "",
      tags: [],
      description: "",
    });
  };

  return (
    <div>
      <Text fontSize="2xl" fontWeight="bold">Adicionar Produto</Text>
      <FormControl>
        <FormLabel>Nome</FormLabel>
        <Input
          border="1px solid black"
          type="text"
          name="title"
          value={newProduct.title}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl mt={2}>
        <FormLabel>Preço</FormLabel>
        <Input
          border="1px solid black"
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
        />
      </FormControl>
      <ProductImageUpload onImageUpload={() => { }} />
      <AddTags tags={newProduct.tags} onTagsChange={() => { }} />
      <FormControl mt={2}>
        <FormLabel>Link</FormLabel>
        <Input
          border="1px solid black"
          type="string"
          name="url"
          value={newProduct.url}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl mt={2}>
        <FormLabel>Descrição</FormLabel>
        <Textarea
          border="1px solid black"
          name="description"
          value={newProduct.description}
          onChange={handleInputChange}
        />
      </FormControl>
      <Button
        mt={4}
        colorScheme="teal"
        onClick={handleAddProduct}
        disabled={!newProduct.title || !newProduct.price || !newProduct.image}
      >
        Adicionar Produto
      </Button>
    </div>
  );
}

export default FormAdd;
