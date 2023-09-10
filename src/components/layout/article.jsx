import { motion } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: -0, y: 20 }
}

const Layout = ({ children, title }) => {
  return (
    <>
      <Header title="Abelhinha Pedagógica" image="/public/logo.svg" />
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.article>
      <Footer />
    </>
  )
}

export default Layout
