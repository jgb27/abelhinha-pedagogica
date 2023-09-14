import {
  Box,
  useColorMode,
  Drawer,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react'

import SidebarContent from './Sidebar/SidebarHeader'
import MobileNav from './Sidebar/MobileNav'

const LayoutAdmin = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode } = useColorMode();

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
      <MobileNav onOpen={onOpen} username="Claudete" role="Admin" />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

export default LayoutAdmin; 
