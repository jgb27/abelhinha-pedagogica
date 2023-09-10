import { Box, Flex, Link, Text } from "@chakra-ui/react"

const Footer = () => {
  return (
    <Box
      as="footer"
      w="100%"
      h="3rem"
      bg="gray.800"
      color="white"
      position="fixed"
      bottom="0"
      left="0"
    >
      <Flex h="100%" align="center" justify="center" >
        <Text fontSize="0.8rem" textAlign="center">
          {/* Informação sobre o desenvolvedor */}
          <Flex as="div" align="center" justify="center" gap="0.5rem">
            <Text>Desenvolvido por </Text>
            <Link href="https://github.com/jgbispo" target="blank"><Text color="yellow.500">João Gustavo Bispo</Text></Link>
          </Flex>
          &copy; {new Date().getFullYear()} - Abelhinha Pedagógica
        </Text>
      </Flex>
    </Box >
  )
}

export default Footer;
