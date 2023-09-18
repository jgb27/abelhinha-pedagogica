import React, { useEffect, useState } from 'react';
import { Heading, Button, Text, FormControl, FormLabel, Input, VStack, Image, Box, useColorMode, useToast } from '@chakra-ui/react';
import Layout from '../components/layout/article';
import { CreateUser } from '../connect';
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const role = localStorage.getItem('role')
      navigate(role == 'admin' ? '/admin' : '/user');
    }
  })

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    coPassword: "",
    email: "",
    fone: ""
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
      const response = await CreateUser(formData);

      if (formData.password != formData.coPassword) {
        toast({
          title: "As senhas não são iguais",
          description: error.message,
          status: "error",
          duration: 2500,
          isClosable: true,
        });

        return
      }

      if (response.token) {
        localStorage.setItem("token", response.token)
        toast({
          title: "Cadastrado feito com sucesso",
          description: response.message,
          status: "success",
          duration: 2500,
          isClosable: true,
        });

        setFormData({ name: '', username: '', password: '', email: '', fone: '' })
        localStorage.setItem('role', response.role)
        navigate(response.role == 'admin' ? '/admin' : '/user');
      }
    } catch (error) {
      toast({
        title: "Error ao efetuar ao cadastrar",
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
    <Layout title="form">
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
          <Heading as="h1" fontSize="2rem" textAlign="center">
            Abelhinha Pedagógica
          </Heading>
          <Text as="span" fontSize="0.8rem" textAlign="center">
            Que bom saber que quer fazer parte da nossa cameia
          </Text>
          <form onSubmit={handleSubmit} mt={4} width="100%">
            <FormControl>
              <FormLabel mt={5} htmlFor="username">Name</FormLabel>
              <Input
                textAlign='center'
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel mt={5} htmlFor="username">E-mail</FormLabel>
              <Input
                textAlign='center'
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel mt={5} htmlFor="username">Username</FormLabel>
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
              <FormLabel mt={4} htmlFor="password">Password</FormLabel>
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
            <FormControl>
              <FormLabel mt={4} htmlFor="password">Co-Password</FormLabel>
              <Input
                type="password"
                textAlign='center'
                id="coPassword"
                name="coPassword"
                value={formData.coPassword}
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
              Cadastrar
            </Button>
            <Button
              type="button"
              colorScheme="blue"
              variant='ghost'
              mt={4}
              width="100%"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          </form>
        </VStack>
      </Box>
    </Layout>
  );
}

export default Register;
