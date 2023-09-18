import React, { useState } from 'react';
import { Button, useColorMode, Box } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa'; // Importe os ícones de sol e lua

function ThemeToggle({ spacing, position }) {
  const { toggleColorMode } = useColorMode();
  const [currentMode, setCurrentMode] = useState('light');

  const handleModeToggle = () => {
    if (currentMode === 'light') {
      toggleColorMode('dark');
      setCurrentMode('dark');
    } else {
      toggleColorMode('light');
      setCurrentMode('light');
    }
  };

  return (
    <Box position={position} left='5px' right={spacing} >
      <Button bg='transparent' onClick={handleModeToggle}>
        {currentMode === 'light' ? <FaMoon /> : <FaSun />}
      </Button>
    </Box >
  );
}

export default ThemeToggle;
