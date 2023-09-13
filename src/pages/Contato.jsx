import Layout from "../components/layout/article"
import { useState, useEffect } from 'react';
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
  Button,
  useColorMode
} from '@chakra-ui/react';
import LoadingSpinner from "../components/LoadingSpinner";

const Contato = () => {
  const { colorMode } = useColorMode();
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({
    name: '',
    message: '',
    tel: '',
  });

  useEffect(() => {
    setTimeout(() => {
      handleIsLoading()
    }, 700)
  }, [])

  const handleIsLoading = () => {
    setLoading(false)
  }

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

  const ContatoPage = () => {
    return (
      <Box
        mt={8}
        bg={colorMode === 'light' ? "white" : "gray.800"}
        p={6}
        rounded="lg"
        shadow="md"
        maxW="md"
        mx="auto"
      >
        <Flex flexDirection="column" align="center" justify="center" p="1rem" gap="1rem">
          <Heading as="h1" fontSize="2xl" mb={4}>
            Entre em Contato
          </Heading>
          <Box textAlign="center">
            <p>Vamos conversar, me mande uma mensagem pelo WhatsApp ou Instagram.</p>
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
                  border="1px solid #f1f1f1"
                  borderRadius="0.25rem"
                />
              </FormControl>
              <FormControl id="message" isRequired mt={6}>
                <FormLabel>Mensagem</FormLabel>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  border="1px solid #f1f1f1"
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
                <Button type="submit" variant="ghost" colorScheme="whatsapp" mt={4} size="lg">
                  Enviar Mensagem via WhatsApp
                </Button>
                <Link href="https://www.instagram.com/abelhinhapedagogica/" isExternal>
                  <Button variant="ghost" colorScheme="teal" size="lg">
                    Acessar o Instagram
                  </Button>
                </Link>
              </Flex>
            </form>
          </Box>
        </Flex>
      </Box>
    )
  }

  return (
    <Layout title="Contato" >
      {loading ? <Center><LoadingSpinner loading={loading} /></Center> : <ContatoPage />}
    </Layout>
  )
}

export default Contato;
