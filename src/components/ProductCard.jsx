import React from 'react';
import { Box, Flex, Text, Image, useColorMode } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, name, price, tags, imageUrl }) => {
  const { colorMode } = useColorMode();

  // Defina cores diferentes para o modo claro e escuro
  const cardBgColor = { light: 'white', dark: 'gray.800' };
  const cardTextColor = { light: 'black', dark: 'white' };
  const tagBgColor = { light: 'gray.200', dark: 'gray.600' };

  const convertPrice = (price) => {
    return price.toString().replace('.', ',')
  };

  const renderTags = () => {
    const tagsForList = tags.length >= 3 ? tags.slice(tags.length - 3) : tags
    return tagsForList.map((tag) => (
      <Box
        key={tag}
        bg={tagBgColor[colorMode]}
        borderRadius="0.5rem"
        px="0.3rem"
        py="0.2rem"
      >
        <Text
          fontSize={['0.8rem', '1rem', '0.7rem']}
        >
          {tag}
        </Text>
      </Box>
    ));
  };

  return (
    <Box
      w={['20rem', '15rem', '20rem']}
      h={['9rem', '16rem', '25rem']}
      bg={cardBgColor[colorMode]}
      borderRadius="0.5rem"
      boxShadow="0 0 2rem rgba(0, 0, 0, 0.4)"
      p="1rem"
    >
      <Flex
        flexDirection={['row', 'column']}
        ml="1rem"
        justify="center"
        align="center"
        textAlign="center"
        gap={['0.3rem', '0.3rem', '0.5rem']}
      >
        <Image src={imageUrl} alt={name} w={['7rem', '10rem', '16rem']} h={['7rem', '10rem', '16rem']} />
        <Flex
          flexDirection="column"
          ml="1rem"
          justify="center"
          align="center"
          textAlign="center"
          gap={['0.3rem', '0.3rem', '0.5rem']}
        >
          <Link to={`/details/${id}`} style={{ color: cardTextColor[colorMode] }}>
            {name}
          </Link>
          <Text fontSize={['1rem', '1rem', '1rem']} color={cardTextColor[colorMode]}>
            R$ {convertPrice(price)}
          </Text>
        </Flex>
        <Flex
          display={['none', 'flex', 'flex']}
          flexWrap="wrap"
          flexDirection="row"
          justify="center"
          align="center"
          textAlign="center"
          gap="0.5rem"
        >
          {renderTags()}
        </Flex>
      </Flex>
    </Box>
  );
};

export default ProductCard;
