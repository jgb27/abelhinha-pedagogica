import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";

function Pagination({ currentPage, totalPages, handlePrevPage, handleNextPage }) {
  return (
    <Flex justify="center" mt="1rem" mb="1rem" align="center">
      <Button
        onClick={handlePrevPage}
        bg="transparent"
        color={currentPage === 1 ? "gray.500" : "white"}
        _hover={
          currentPage === 1
            ? { bg: "transparent", color: "gray.500" }
            : { bg: "transparent", color: "gray.300" }
        }
        isDisabled={currentPage === 1}
      >
        Anterior
      </Button>
      <Text ml="1rem" mr="1rem" mt="0.5rem">
        {currentPage} de {totalPages}
      </Text>
      <Button
        onClick={handleNextPage}
        bg="transparent"
        color={currentPage === totalPages ? "gray.500" : "white"}
        _hover={
          currentPage === totalPages
            ? { bg: "transparent", color: "gray.500" }
            : { bg: "transparent", color: "gray.300" }
        }
        isDisabled={currentPage === totalPages}
      >
        Próxima
      </Button>
    </Flex>
  );
}

export default Pagination;
