import React, { useState } from 'react';
import { Heading, Button, FormControl, FormLabel, Input, VStack, Image, Box, Text, useColorMode, useToast } from '@chakra-ui/react';
import Layout from '../components/layout/article';
import { AccessPage } from '../connect';
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  const toast = useToast({
    position: 'top-right',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  try{
    const response = await AccessPage(formData);

    console.log(response)

    if (response.token) {
      localStorage.setItem("token", response.token)
      toast({
        title: "Login efetuado com sucesso",
        description: response.message,
        status: "success",
        duration: 2500,
        isClosable: true,
      });
      navigate("/admin");
      } 
    } catch (error) {
      toast({
        title: "Error ao efetuar o login",
        description: error.message,
        status: "error",
        duration: 2500,
        isClosable: true,
      });
    }
  };

  return (
    <Layout title="login">
      <Box
        bg={colorMode === 'light' ? "white" : "gray.800"}
        p={6}
        rounded="lg"
        shadow="md"
        maxW="md"
        mx="auto"
      >
        <VStack spacing={4}>
          <Image src="/logo.svg" alt="abelhinha" w="5rem" />
          <Heading as="h1" fontSize="1.5rem" textAlign="center">
            Abelhinha Pedagógica
          </Heading>
          <Text fontSize="sm" color="gray.500" textAlign="center">
            Acesso administrativo
          </Text>
          <form onSubmit={handleSubmit} mt={4} width="100%">
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="blue"
              mt={4}
              width="100%"
            >
              Login
            </Button>
          </form>
        </VStack>
      </Box>
    </Layout>
  );
}

export default Login;
