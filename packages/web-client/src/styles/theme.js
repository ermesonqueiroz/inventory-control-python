import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  config: {
    initialColorMode: 'system',
    useSystemColorMode: false
  },
  fonts: {
    heading: `'RalewayVariable', sans-serif`,
    body: `'InterVariable', sans-serif`,
  },
})