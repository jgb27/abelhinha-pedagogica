import { Center, Box, Text, Image } from '@chakra-ui/react';
import { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

const NotFound = ({ title, image, description }) => {
  const [loading, setLoading] = useState(true);

  const handleIsLoading = () => {
    setLoading(false);
  };

  return (
    <Center>
      <Box textAlign="center">
        {title ? <Text fontSize="4xl" fontWeight="bold" color="red" mb={8}>
          {loading ? <LoadingSpinner /> : title}
        </Text> : <></>}
        <Image
          src={image}
          alt="Funny Image"
          onLoad={handleIsLoading}
        />
        {description ? <Text fontSize="4xl" fontWeight="bold" color="white" mb={8}>
          {loading ? <LoadingSpinner /> : description}
        </Text> : <></>}
      </Box>
    </Center>
  );
};

export default NotFound;
