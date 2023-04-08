import { Flex } from '@chakra-ui/react'
import { Header } from './Header'
import { ProductModal } from './ProductModal'

export function Page({ children }) {
  return (
    <>
      <Flex
        sx={{
        flexDirection: 'column',
          width: '100%',
        }}
        p={8}
        margin="auto"
        maxW="6xl"
      >
        <Header />

        {children}
      </Flex>
      <ProductModal />
    </>
  )
}
