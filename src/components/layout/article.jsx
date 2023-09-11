import { motion } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import { Container } from '@chakra-ui/react'

const Layout = ({ children, title }) => {

  return (
    <>
      <Header title="Abelhinha Pedagógica" image="/logo.svg" />
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Container maxW={`container.${title == "login" ? "sm" : "lg"}`} mt={title == "login" ? "20" : 0} pb={16}>
          {children}
        </Container>
      </motion.article>
      <Footer />
    </>
  )
}

export default Layout
