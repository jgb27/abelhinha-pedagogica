import Layout from "../components/layout/article"
import { useState } from 'react';
import {
  Box,
  Flex,
  Center,
  Link,
  Textarea,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Button
} from '@chakra-ui/react';

const Contato = () => {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    tel: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const msg = `${currentTime()}Me chamo ${formData.name}. ${formData.message}`;

      setFormData({
        name: '',
        message: '',
        tel: '',
      });

      window.open(
        `https://api.whatsapp.com/send?phone=5527998450547&text=${encodeURIComponent(msg)}`,
        '_blank'
      );
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  const currentTime = () => {
    const now = new Date();
    const currentHour = now.getHours();

    if (currentHour >= 6 && currentHour < 12) {
      return 'Bom dia! ';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Boa tarde! ';
    } else {
      return 'Boa noite! ';
    }
  };

  return (
    <Layout title="Contato" >
      <Center p={16}>
        <Flex flexDirection="column" align="center" justify="center" p="1rem" gap="1rem">
          <Heading as="h1" fontSize="2xl" mb={4}>
            Entre em Contato
          </Heading>
          <Box>
            <p>Vamos conversar sobre o seu projeto via WhatsApp ou Instagram.</p>
          </Box>
          <Box w="80%">
            <form onSubmit={handleSubmit}>
              <FormControl id="name" isRequired>
                <FormLabel>Nome</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  border="1px solid black"
                  borderRadius="0.25rem"
                />
              </FormControl>
              <FormControl id="message" isRequired mt={2}>
                <FormLabel>Mensagem</FormLabel>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  border="1px solid black"
                  borderRadius="0.25rem"
                  resize="vertical"
                />
              </FormControl>
              <Flex
                justify="center"
                gap={2}
                flexDirection="column"
                align="center"
              >
                <Button type="submit" colorScheme="whatsapp" mt={4} size="lg">
                  Enviar Mensagem via WhatsApp
                </Button>
                <Link href="https://www.instagram.com/abelhinhapedagogica/" isExternal>
                  <Button colorScheme="teal" size="lg">
                    Acessar o Instagram
                  </Button>
                </Link>
              </Flex>
            </form>
          </Box>
        </Flex>
      </Center>
    </Layout>
  )
}

export default Contato;
