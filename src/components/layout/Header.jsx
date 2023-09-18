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

const UserInfo = ({ display }) => {
  const token = localStorage.getItem('token')
  if (token) {
    const role = localStorage.getItem('role')
    return (
      <Box display={display} position="absolute" left={[3, 8]}>
        <NavLink to={role == 'admin' ? '/admin' : '/user'} textDecoration="none">
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
            Área do cliente
          </Text>
        </NavLink>
      </Box>
    )
  } else {
    return (
      <Box display={display} position="absolute" left={[3, 8]}>
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
            Acessa sua conta
          </Text>
        </NavLink>
      </Box>
    )
  }
}

const Header = ({ title, image }) => {

  const LinkItems = [
    { name: 'Home', to: '/' },
    { name: 'Catalogo', to: '/catalogo' },
    { name: 'Contato', to: '/contato' },
    { name: 'Acesse sua Conta', to: '/login' }
  ]

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

      <UserInfo display={{ base: 'none', md: 'block' }} />
      <Flex as="div" align="center" justify="center" gap="0.5rem">
        <Image src={image} alt="abelhinha" w="2rem" />
        <Heading as="h1" fontSize="1.5rem">
          {title}
        </Heading>
        <ThemeToggle position='relative' spacing={[3, 8]} />
      </Flex>
      <Box
        as="nav"
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        gap="1rem"
      >
        {LinkItems.map((link) => {
          if (link.to == '/login') {
            return (
              <Box display={{ base: 'block', md: 'none' }}>
                <NavLink
                  to={link.to}>
                  {link.name}
                </NavLink>
              </Box>
            )
          };
          return <NavLink to={link.to}>{link.name}</NavLink>
        })}
      </Box>
    </VStack>
  );
}

export default Header;
