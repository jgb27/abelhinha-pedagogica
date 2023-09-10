import {
  Box,
  Flex,
  Text,
  Image,
} from '@chakra-ui/react';
import { Link } from "react-router-dom"

const ProductCard = ({ id, name, price, tags, imageUrl }) => {
  const convertPrice = (price) => {
    return price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  };

  const renderTags = () => {
    return tags.map((tag) => (
      <Box
        key={tag}
        bg="gray.200"
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
      w={["20rem", "15rem", "20rem"]}
      h={["9rem", "16rem", "25rem"]}
      bg="white"
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
        gap={["0.3rem", "0.3rem", "0.5rem"]}
      >
        <Image src={imageUrl} alt={name} w={['7rem', '10rem', '16rem']} h={['7rem', '10rem', '16rem']} />
        <Flex
          flexDirection="column"
          ml="1rem"
          justify="center"
          align="center"
          textAlign="center"
          gap={["0.3rem", "0.3rem", "0.5rem"]}
        >
          <Link to={`/details/${id}`}> {name} </Link>
          <Text fontSize={['1rem', '1rem', '1rem']}>{convertPrice(price)}</Text>
        </Flex>
        <Flex
          display={["none", "flex", "flex"]}
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
