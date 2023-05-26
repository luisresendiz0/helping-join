import { ChakraProvider } from "@chakra-ui/react";
import { FunctionComponent, PropsWithChildren } from "react";
import Routes from "./routes/Routes";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const AppState: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>{children}</ChakraProvider>
    </QueryClientProvider>
  );
};

const App = () => {
  return (
    <AppState>
      <Routes />
    </AppState>
  );
};

export default App;
