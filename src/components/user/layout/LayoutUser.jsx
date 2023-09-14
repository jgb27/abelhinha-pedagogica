import {
  Box,
  useColorMode,
  Drawer,
  DrawerContent,
} from '@chakra-ui/react'

import SidebarContent from './Sidebar/SidebarHeader'
import MobileNav from './Sidebar/MobileNav'
import { useDisclosure } from '@chakra-ui/react';

const LayoutUser = ({ children }) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure()
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
      <MobileNav onOpen={onOpen} username={'João Bispo'} role={'Client'} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

export default LayoutUser; 
