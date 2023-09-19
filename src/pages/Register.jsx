import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, VStack, Image, Heading, Text, useColorMode, useToast, HStack } from '@chakra-ui/react'
import Layout from '../components/layout/article';
import RegisterForm from '../components/RegisterForm';
import { CreateUser } from '../connect';

function Register() {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const toast = useToast();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const role = localStorage.getItem('role');
      navigate(role === 'admin' ? '/admin' : '/user');
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    coPassword: '',
    email: '',
    fone: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await CreateUser(formData);

      if (formData.password !== formData.coPassword) {
        toast({
          title: 'As senhas não são iguais',
          description: 'As senhas informadas não coincidem.',
          status: 'error',
          duration: 2500,
          isClosable: true,
        });
        return;
      }

      if (response.token) {
        localStorage.setItem('token', response.token);
        toast({
          title: 'Cadastro feito com sucesso',
          description: response.message,
          status: 'success',
          duration: 2500,
          isClosable: true,
        });

        setFormData({
          name: '',
          username: '',
          password: '',
          coPassword: '',
          email: '',
          fone: '',
        });
        localStorage.setItem('role', response.role);
        navigate(response.role === 'admin' ? '/admin' : '/user');
      }
    } catch (error) {
      toast({
        title: 'Erro ao efetuar o cadastro',
        description: error.message,
        status: 'error',
        duration: 2500,
        isClosable: true,
      });

      const value = error.label;
      setFormData({ ...formData, [value]: '' });
    }
  };

  return (
    <Layout title="form">
      <Box
        bg={colorMode === 'light' ? 'white' : 'gray.800'}
        p={3}
        rounded="lg"
        shadow="md"
        mx="auto"
      >
        <VStack>
          <HStack>
            <Image src="/logo.svg" alt="abelhinha" w="5rem" />
            <Heading as="h1" fontSize="2rem" textAlign="center">
              Abelhinha Pedagógica
            </Heading>
          </HStack>
          <Text as="span" fontSize="0.8rem" textAlign="center">
            Que bom saber que quer fazer parte da nossa colmeia
          </Text>
          <RegisterForm
            navigate={navigate}
            handleSubmit={handleSubmit}
            formData={formData}
            handleInputChange={handleInputChange}
          />
        </VStack>
      </Box>
    </Layout>
  );
}

export default Register;
