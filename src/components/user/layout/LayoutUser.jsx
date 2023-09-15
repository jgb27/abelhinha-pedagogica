import {
  Box,
  useColorMode,
  Drawer,
  DrawerContent,
} from '@chakra-ui/react'

import SidebarContent from './Sidebar/SidebarHeader'
import MobileNav from './Sidebar/MobileNav'
import { useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { GetUser } from '../../../connect';

const LayoutUser = ({ children }) => {
  const [user, setUser] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode } = useColorMode();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { user } = await GetUser();
        setUser(user)
      } catch (error) {
        console.error('Error fetching products: ', error)
      }
    }

    fetchData()
  }, [])

  return (
    <Box minH="100vh" bg={colorMode === 'dark' ? 'gray.900' : 'gray.200'}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} username={user.name} role={user.role} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

export default LayoutUser; 
