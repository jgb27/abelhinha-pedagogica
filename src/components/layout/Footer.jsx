import { Box, Flex, Link, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      as="footer"
      w="100%"
      bg="gray.800"
      color="white"
      py="2"
      textAlign="center"
      position="fixed"
      bottom="0"
      left="0"
    >
      <Flex h="100%" align="center" justify="center">
        <Text fontSize="0.8rem" textAlign="center">
          Desenvolvido por{" "}
          <Link
            href="https://github.com/jgbispo"
            target="_blank"
            rel="noopener noreferrer"
            color="yellow.500"
          >
            João Gustavo Bispo
          </Link>{" "}
          &copy; {new Date().getFullYear()} - Abelhinha Pedagógica
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
