import { ChakraProvider } from "@chakra-ui/react";
import { FunctionComponent, PropsWithChildren } from "react";
import Routes from "./routes/Routes";

const AppState: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};

function App() {
  return (
    <AppState>
      <Routes />
    </AppState>
  );
}

export default App;
