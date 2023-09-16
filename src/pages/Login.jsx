import React, { useEffect, useState } from 'react';
import { Heading, Button, FormControl, FormLabel, Input, VStack, Image, Box, useColorMode, useToast } from '@chakra-ui/react';
import Layout from '../components/layout/article';
import { AccessPage } from '../connect';
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const role = localStorage.getItem('role')
      navigate(role == 'admin' ? '/admin' : '/user');
    }
  })

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { colorMode } = useColorMode();

  const toast = useToast({
    position: 'bottom-right',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AccessPage(formData);

      if (response.token) {
        localStorage.setItem("token", response.token)
        toast({
          title: "Login efetuado com sucesso",
          description: response.message,
          status: "success",
          duration: 2500,
          isClosable: true,
        });

        setFormData({ username: '', password: '' })
        localStorage.setItem('role', response.role)
        navigate(response.role == 'admin' ? '/admin' : '/user');
      }
    } catch (error) {
      toast({
        title: "Error ao efetuar o login",
        description: error.message,
        status: "error",
        duration: 2500,
        isClosable: true,
      });

      const value = error.label;
      setFormData({ [value]: '' });
    }
  };

  return (
    <Layout title="login">
      <Box
        bg={colorMode === 'light' ? "white" : "gray.800"}
        p={6}
        rounded="lg"
        shadow="md"
        maxW="sm"
        mx="auto"
      >
        <VStack spacing={4}>
          <Image src="/logo.svg" alt="abelhinha" w="5rem" />
          <Heading as="h1" fontSize="1.5rem" textAlign="center">
            Abelhinha Pedagógica
          </Heading>
          <form onSubmit={handleSubmit} mt={4} width="100%">
            <FormControl>
              <FormLabel textAlign='center' htmlFor="username">Username</FormLabel>
              <Input
                textAlign='center'
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel mt={4} textAlign='center' htmlFor="password">Password</FormLabel>
              <Input
                type="password"
                textAlign='center'
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
