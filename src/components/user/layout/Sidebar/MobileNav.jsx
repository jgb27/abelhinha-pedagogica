import {
  FiMenu,
} from 'react-icons/fi'

import {
  IconButton,
  Avatar,
  Flex,
  HStack,
  VStack,
  useColorMode,
  Text,
} from '@chakra-ui/react'

import ThemeToggle from '../../../ThemeToggle'

const MobileNav = ({ onOpen, username, role, ...rest }) => {
  const { colorMode } = useColorMode();

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={colorMode === 'dark' ? 'gray.900' : 'white'}
      borderBottomWidth="1px"
      borderBottomColor={colorMode === 'dark' ? 'gray.700' : 'gray.700'}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="lg"
        fontFamily="monospace"
        fontWeight="bold"
        textAlign="center"
      >
        Abelhinha Pedagógica
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <ThemeToggle position='relative' spacing={4} />
        <Flex alignItems={'center'}>
          <HStack>
            <Avatar
              size={'sm'}
              src={'https://abelhinha-bucket.s3.sa-east-1.amazonaws.com/logo.svg'}
            />
            <VStack
              display={{ base: 'none', md: 'flex' }}
              alignItems="flex-start"
              spacing="1px"
              ml="2">
              <Text fontSize="sm">
                {username}
              </Text>
              <Text fontSize="xs" color="gray.600">
                {role}
              </Text>
            </VStack>
          </HStack>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default MobileNav;
