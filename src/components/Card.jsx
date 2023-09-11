import React from 'react';
import {
  Box,
  Flex,
  Text,
  useColorMode,
} from '@chakra-ui/react';

const CardInfo = ({ icon, title, description }) => {
  const { colorMode } = useColorMode();

  // Defina cores diferentes para o modo claro e escuro
  const cardBgColor = { light: 'white', dark: 'gray.800' };
  const cardTextColor = { light: 'gray.800', dark: 'white' };
  const boxShadowColor = { light: 'rgba(0, 0, 0, 0.4)', dark: 'rgba(255, 255, 255, 0.4)' };

  return (
    <Box
      w={["20rem", "15rem", "20rem"]}
      h={["10.5rem", "16rem", "14rem"]}
      bg={cardBgColor[colorMode]}
      borderRadius="0.5rem"
      boxShadow={`0 0 2rem ${boxShadowColor[colorMode]}`}
      p="1rem"
    >
      <Flex
        flexDirection="column"
        ml="1rem"
        justify="center"
        align="center"
        textAlign="center"
        gap={["0.3rem", "0.3rem", "0.5rem"]}
      >
        {icon}
        <Text
          fontSize={['0.8rem', '1.5rem', '1.5rem']}
          fontWeight="bold"
          color={cardTextColor[colorMode]}
        >
          {title}
        </Text>
        <Text
          fontSize={['0.8rem', '1rem', '1rem']}
          fontWeight="light"
          color={cardTextColor[colorMode]}
        >
          {description}
        </Text>
      </Flex>
    </Box>
  );
};

export default CardInfo;
