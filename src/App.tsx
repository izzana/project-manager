import { ChakraProvider } from "@chakra-ui/react";
import { AppRoot } from "./App.styles";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <ChakraProvider>
     <AppRoot>
        <AppRoutes />
      </AppRoot>
    </ChakraProvider>
  );
}

