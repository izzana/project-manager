import { ChakraProvider } from "@chakra-ui/react";
import { Container, InnerLayout, Layout } from "./App.styles";
import AppRoutes from "./routes/AppRoutes";
import SearchBar from "./components/SearchBar/SearchBar";

export default function App() {
  return (
    <ChakraProvider>
      <Layout>
        <SearchBar />
        <InnerLayout>
          <Container>
            <AppRoutes />
          </Container>
        </InnerLayout>
      </Layout>
    </ChakraProvider>
  );
}

