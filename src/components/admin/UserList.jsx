import React, { useState } from "react";
import {
  Container,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Flex,
  Button,
  useToast
} from "@chakra-ui/react";
import { DeleteUser } from "../../connect";
import DeleteConfirmationModal from "../DeleteConfirmationModal";

function UserList({ users }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  console.log(users)
  const toast = useToast({
    position: "bottom-right",
  });

  const handleConfirmDelete = async () => {
    if (userIdToDelete) {
      try {
        await DeleteUser(userIdToDelete);
        const updatedUsers = users.filter((user) => user._id !== userIdToDelete);
        setUsers(updatedUsers);

        toast({
          title: "Produto Removido",
          description: "O produto foi removido com sucesso.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Error removing user:", error);
        toast({
          title: "Erro ao Remover Produto",
          description: "Ocorreu um erro ao remover o produto.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setUserIdToDelete(null);
        setIsDeleteModalOpen(false);
      }
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const totalPages = Math.ceil(users.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Container maxW="full">
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Usuário</Th>
            <Th>Nome</Th>
            <Th>Email</Th>
            <Th>Nivel de Acesso</Th>
            <Th>Telefone</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentUsers.map((user) => (
            <React.Fragment key={user._id}>
              <Tr>
                <Td>{user.username}</Td>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.role}</Td>
                <Td>{user.fone}</Td>
              </Tr>
            </React.Fragment>
          ))}
        </Tbody>
      </Table>
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
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          user={users.filter((user) => user._id === userIdToDelete)}
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirmDelete={handleConfirmDelete}
        />
      )}
    </Container>
  );
}

export default UserList;
