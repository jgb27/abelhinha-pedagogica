import React, { useState } from 'react';
import { Button, useColorMode, Box } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa'; // Importe os ícones de sol e lua

function ThemeToggle() {
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
    <Box position="absolute" right={10} >
      <Button onClick={handleModeToggle}>
        {currentMode === 'light' ? <FaMoon /> : <FaSun />} {/* Ícones de sol e lua */}
      </Button>
    </Box >
  );
}

export default ThemeToggle;
