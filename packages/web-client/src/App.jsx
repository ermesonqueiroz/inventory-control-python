import { ChakraProvider } from '@chakra-ui/react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { Home } from './screens/Home'
import { theme } from "./styles"
import { ProductProvider } from './contexts/product'
import "@fontsource/raleway/variable.css"
import "@fontsource/inter/variable.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  }
])

function App() {
  return (
    <ProductProvider>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </ProductProvider>
  )
}

export default App
