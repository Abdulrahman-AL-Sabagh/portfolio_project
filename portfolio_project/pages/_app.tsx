import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import Home from  "."

function MyApp({ Component, pageProps }) {
  return( <ChakraProvider  >
    {Component.authPage ?  <Component {...pageProps}/> : <Home  {...pageProps}/> }

  </ChakraProvider>)
}


export default MyApp
