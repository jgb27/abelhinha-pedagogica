import Layout from '../components/layout/article'
import { Box, Text, Center, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export const NotFound = ({ title, text, isRedirect }) => {

  return (
    <Box textAlign="center">
      <Text fontSize="6xl" fontWeight="bold">
        404
      </Text>
      <Text fontSize="2xl" fontWeight='semibold' mb={4}>
        {title}
      </Text>
      <Text fontSize='lg' color='gray.500'>
        {text}
      </Text>
      {
        isRedirect ?
          <>
            <Text fontSize='lg' color='gray.500' mb={8}>
              {isRedirect.copy}
            </Text>
            <Link to={`/${isRedirect.toRedirect}`}>
              <Button colorScheme='teal'>Acessar</Button>
            </Link>
          </> :
          <></>
      }
    </Box>
  )
}

export const NotFoundPage = ({ title, text, isRedirect }) => {
  return (
    <Layout>
      <Center mt='20%'>
        <NotFound isRedirect={isRedirect} title={title} text={text} />
      </Center>
    </Layout>
  )
}

export default NotFoundPage;
