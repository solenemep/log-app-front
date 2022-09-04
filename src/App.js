import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import IznesApp from "./components/IznesApp";

const App = () => {
  return (
    <ChakraProvider>
      <IznesApp />
    </ChakraProvider>
  );
};

export default App;
