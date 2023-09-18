import React from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';

function RegisterForm({ navigate, handleSubmit, formData, handleInputChange }) {

  return (
    <form onSubmit={handleSubmit} mt={4} width="100%">
      <FormControl>
        <FormLabel mt={5} htmlFor="username">
          Nome Completo
        </FormLabel>
        <Input
          w='lg'
          textAlign="center"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel mt={5} htmlFor="email">
          E-mail
        </FormLabel>
        <Input
          textAlign="center"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel mt={5} htmlFor="username">
          Username
        </FormLabel>
        <Input
          textAlign="center"
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel mt={4} htmlFor="password">
          Password
        </FormLabel>
        <Input
          type="password"
          textAlign="center"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel mt={4} htmlFor="coPassword">
          Co-Password
        </FormLabel>
        <Input
          type="password"
          textAlign="center"
          id="coPassword"
          name="coPassword"
          value={formData.coPassword}
          onChange={handleInputChange}
          required
        />
      </FormControl>
      <Button type="submit" colorScheme="blue" mt={4} width="100%">
        Cadastrar
      </Button>
      <Button
        type="button"
        colorScheme="blue"
        variant="ghost"
        mt={4}
        width="100%"
        onClick={() => navigate('/login')}
      >
        Login
      </Button>
    </form>
  );
}

export default RegisterForm;
