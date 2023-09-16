import {
  Box,
  Heading,
  VStack,
  Image,
  HStack,
  Flex,
  Avatar,
  Text
} from "@chakra-ui/react";

import { NavLink } from "react-router-dom"
import ThemeToggle from "../ThemeToggle";

const UserInfo = () => {
  const token = localStorage.getItem('token')
  return (
    token
      ? (<HStack spacing={{ base: '0', md: '6' }} position='absolute' left={[3, 8]} >
        <Flex alignItems={'center'} textAlign='center'>
          <VStack
            display={{ base: 'none', md: 'flex' }}
            alignItems="flex-start"
            spacing="1px"
            ml="2">
            <Text fontSize="sm">
              Logado
            </Text>
            <Text fontSize="xs" color="gray.600">
              não logado
            </Text>
          </VStack>
        </Flex>
      </HStack>)
      :
      <Box position="absolute" left={[3, 8]}>
        <NavLink to="/login" textDecoration="none">
          <Text
            color="white"
            bg="blue.500"
            padding="8px 16px"
            borderRadius="4px"
            fontSize="18px"
            fontWeight="bold"
            _hover={{
              bg: "green.400",
              color: "white",
            }}
          >
            Acesse sua conta
          </Text>
        </NavLink>
      </Box>
  )
}

const Header = ({ title, image }) => {

  return (
    <VStack
      as="header"
      align="center"
      justify="center"
      bg="gray.800"
      color="white"
      pt="1rem"
      pb="0.5rem"
    >
      <ThemeToggle position='absolute' spacing={[3, 8]} />
      <UserInfo />
      <Flex as="div" align="center" justify="center" gap="0.5rem">
        <Image src={image} alt="abelhinha" w="2rem" />
        <Heading as="h1" fontSize="1.5rem">
          {title}
        </Heading>
      </Flex>
      <Box
        as="nav"
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        gap="1rem"
      >
        <NavLink to="/">Home</NavLink>
        <NavLink to="/catalogo">Catalogo</NavLink>
        <NavLink to="/contato">Contato</NavLink>
      </Box>
    </VStack>
  );
}

export default Header;
