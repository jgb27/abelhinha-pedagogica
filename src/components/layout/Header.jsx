import {
  Box,
  Heading,
  VStack,
  Image,
  Flex
} from "@chakra-ui/react";

import { NavLink } from "react-router-dom"
import ThemeToggle from "../ThemeToggle";

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
      <ThemeToggle possition='absolute' spacing={[3, 8]} />
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
        <NavLink to="/login">Access</NavLink>
      </Box>
    </VStack>
  );
}

export default Header;
