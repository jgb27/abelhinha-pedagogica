import Layout from "../components/layout/article"
import { Flex, Image, Text } from "@chakra-ui/react";
import { FaFilePdf } from 'react-icons/fa'
import { ImPrinter } from 'react-icons/im'
import { BsScissors } from 'react-icons/bs'
import CardInfo from "../components/Card";
import ProductCard from '../components/ProductCard'

const cardFields = [
  {
    icon: <FaFilePdf fontSize="3rem" />,
    title: "CHEGA NO SEU EMAIL",
    description: "Arquivos 100% digital. Após a compra você recebe acesso dos arquivos em formato PDF."
  },
  {
    icon: <ImPrinter fontSize="3rem" />,
    title: "VOCÊ IMPRIME",
    description: "Você pode imprimir quando quiser, pois o acesso é VITALÍCIO e quantas vezes desejar. Os arquivos estão organizados e separados em formato PDF."
  },
  {
    icon: <BsScissors fontSize="3rem" />,
    title: "COLOCA EM PRÁTICA",
    description: "Agora é hora de escolher as atividades e começar a colocar em prática! Transforme o aprendizado em uma forma mais divertida e interativa.."
  },
]

const productFields = [{
  id: 1,
  imageUrl: "/src/assets/tmpImg.jpg",
  name: "Atividades para colorir 1",
  price: 30.00,
  tags: ["Atividades", "Imprimir"],
  url: "https://www.google.com.br",
  description: "Um belo produto para sua criança brincar e se divertir"
},
{
  id: 2,
  imageUrl: "/src/assets/tmpImg.jpg",
  name: "Atividades para colorir 2",
  price: 291.90,
  tags: ["Atividades", "Imprimir"],
  url: "https://www.google.com.br",
  description: "Um belo produto para sua criança brincar e se divertir"

},
{
  id: 3,
  imageUrl: "/src/assets/tmpImg.jpg",
  name: "Atividades para colorir 3",
  price: 21.90,
  tags: ["Atividades", "Imprimir"],
  url: "https://www.google.com.br",
  description: "Um belo produto para sua criança brincar e se divertir"
},
{
  id: 4,
  imageUrl: "/src/assets/tmpImg.jpg",
  name: "Atividades para colorir 4",
  price: 21.90,
  tags: ["Atividades", "Imprimir"],
  url: "https://www.google.com.br",
  description: "Um belo produto para sua criança brincar e se divertir"
},]

const Home = () => {
  const banner = "/src/assets/banner.svg"
  const lastProduct = productFields.length;

  return (
    <Layout title="Home" >
      <Flex direction="column" align='center'>
        <Image pt="1em" src={banner} alt="banner" w={['100%', '60%']} h={['100%', '60%']} />
        <Flex mt={1} flexDirection={['column', 'row', 'row']} align="center" justify="center" p="1rem" gap="1rem">
          {cardFields.map(({ icon, title, description }) => {
            return (
              <CardInfo key={title} icon={icon} title={title} description={description} />
            )
          })}
        </Flex>
        <Text fontSize="2rem" fontWeight="bold" textAlign="center" >
          Produtos recentes
        </Text>
        <Flex mt={1} flexDirection={['column', 'row', 'row']} align="center" justify="center" p="1rem" gap="1rem">
          {productFields.slice((lastProduct - 3), lastProduct).map(({ id, name, price, tags, imageUrl }) => {
            return (
              <ProductCard
                key={id}
                id={id}
                imageUrl={imageUrl}
                name={name}
                price={price}
                tags={tags}
              />
            )
          })}
        </Flex>
      </Flex>
    </Layout>
  )
}

export default Home;
