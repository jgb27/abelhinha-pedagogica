import {
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";

const CardInfo = ({ icon, title, description }) => {
  return (
    <Box
      w={["20rem", "15rem", "20rem"]}
      h={["10.5rem", "16rem", "14rem"]}
      bg="white"
      borderRadius="0.5rem"
      boxShadow="0 0 2rem rgba(0, 0, 0, 0.4)"
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
        >
          {title}
        </Text>
        <Text
          fontSize={['0.8rem', '1rem', '1rem']}
          fontWeight="light"
        >
          {description}
        </Text>
      </Flex>
    </Box>
  );
};

export default CardInfo;
