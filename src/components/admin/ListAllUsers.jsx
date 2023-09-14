import { Box, Text, Flex, Button, useColorMode, useToast, Input, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LoadingSpinner from "../LoadingSpinner";
import UserList from "./UserList";
import { GetAllUsers } from "../../connect";

const ListAllUsers = () => {
  const { colorMode } = useColorMode();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersFields, setUsersFields] = useState([{}]);
  const [searchTerm, setSearchTerm] = useState('');
  const usersPerPage = 10;
  const toast = useToast({
    position: "top-right"
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { users } = await GetAllUsers();
        console.log(users)
        setUsersFields(users)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
    handleIsLoading();
  }, []);

  const totalPages = Math.ceil(usersFields.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const UsersForList = usersFields.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleIsLoading = () => {
    setLoading(false);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearch = async () => {
    try {
      toast({
        title: "Não há essa funcionalidade",
        description: "Funcionalidade não implementada",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erro find product",
        description: error,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const NextPrev = () => {
    return (
      <Flex justify="center" mt={4} mb={4} alignItems="center">
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
        <Text mx={4}>
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
    )
  }

  return (
    <Box w="100%" h="100%">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Flex
          flexDirection={["column", "column", "row"]}
          alignItems="center"
          justifyContent="space-between"
          padding={4}
        >
          <Text
            fontSize="2xl"
            fontWeight="bold"
            textAlign="center"
            color={colorMode === "dark" ? "white" : "black"}
          >
            Todos os usuários
          </Text>
          <Flex alignItems="center" mt={4} flexDirection={["column", "column", "row"]}>
            <Input
              flex="1"
              border="none"
              mt={2}
              placeholder={`Pesquisar itens por`}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                handleSearch()
              }}
              onBlur={handleSearch}
            />
          </Flex>
        </Flex>
      </motion.div>

      {!loading
        ? <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.7 }}
        >
          {UsersForList > 3 ? <NextPrev /> : <></>}
          <Flex
            mt={4}
            flexWrap="wrap"
            flexDirection="row"
            align="center"
            justify="center"
            gap={3}
          >
            <UserList users={UsersForList} />
          </Flex>
        </motion.div>
        : <Center><LoadingSpinner loading={loading} /></Center>
      }
    </Box>
  );
};

export default ListAllUsers;
