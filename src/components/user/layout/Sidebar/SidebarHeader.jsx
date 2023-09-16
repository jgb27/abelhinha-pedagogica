import { Box, Flex, Image, CloseButton, Text, useColorMode, IconButton, Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { FiPackage, FiUser, FiXCircle, FiShoppingCart } from "react-icons/fi"
import { useAppContext } from "../../../../AppProvider"

const NavItem = ({ icon, children, name }) => {
  const { colorMode } = useColorMode();
  const { page, setPage } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Box
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group">
        <Button
          cursor="pointer"
          bg='transparent'
          color={page == name ? 'yellow.500' : colorMode === 'dark' ? 'white' : 'black'}
          _hover={{
            color: 'yellow.500',
          }}
          onClick={() => {
            if (name == 'Exit') {
              handleLogout()
            } else {
              setPage(name)
            }
          }}
        >
          {icon && (
            <IconButton
              mr="4"
              color={page == name ? 'yellow.500' : colorMode === 'dark' ? 'white' : 'black'}
              _groupHover={{
                color: 'yellow.500',
              }}
              bg='transparent'
              icon={icon}
              isRound={true}
            />
          )}
          {children}
        </Button>
      </Flex>
    </Box>
  )
}

const SidebarContent = ({ onClose, ...rest }) => {
  const { colorMode } = useColorMode();

  const LinkItems = [
    { name: 'Produtos', icon: <FiPackage /> },
    { name: 'Loja', icon: <FiShoppingCart /> },
    { name: 'Exit', icon: <FiXCircle /> }
  ]

  return (
    <Box
      transition="3s ease"
      bg={colorMode === 'dark' ? 'gray.900' : 'white'}
      borderRight="1px"
      borderRightColor={colorMode === 'dark' ? 'gray.700' : 'gray.700'}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" gap={2} alignItems="center" textAlign='center' mx="8" justifyContent="space-between">
        <Image
          src={'https://abelhinha-bucket.s3.sa-east-1.amazonaws.com/logo.svg'}
          height={10}
        />
        <Text
          fontSize="lg"
          fontFamily="monospace"
          fontWeight="bold"
          textAlign="center"
        >
          Abelhinha Pedagógica
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {
        LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} name={link.name}>
            {link.name}
          </NavItem>
        ))
      }
    </Box >
  )
}

export default SidebarContent;
