/** @format */

import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Home from ".";
import Signin from "./signin";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
