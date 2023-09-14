import { Box, Flex, Image, Text, useColorModeValue, IconButton, Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { FiHome, FiPackage, FiUsers, FiXCircle } from "react-icons/fi"
import { useEffect, useState } from "react"
import { useAppContext } from "../../../../AppProvider"

const NavItem = ({ icon, children, name }) => {
  const { page, setPage } = useAppContext();

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
          color={page == name ? 'yellow.500' : 'white'}
          _hover={{
            color: 'yellow.500',
          }}
          onClick={() => {
            setPage(name)
          }}
        >
          {icon && (
            <IconButton
              mr="4"
              color={page == name ? 'yellow.500' : 'white'}
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
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const LinkItems = [
    { name: 'Home', icon: <FiHome /> },
    { name: 'Produtos', icon: <FiPackage /> },
    { name: 'Usuários', icon: <FiUsers /> },
    { name: 'Exit', icon: <FiXCircle />, onPress: handleLogout }
  ]

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
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
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} name={link.name}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

export default SidebarContent;
