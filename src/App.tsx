import { ChakraProvider } from "@chakra-ui/react";
import { FunctionComponent, PropsWithChildren, useEffect, useRef, useState } from "react";
import Routes from "./routes/Routes";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase/config";
import { useSetAtom } from "jotai";
import userAtom from "./atoms/userAtom";

const AppState: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};

const App = () => {
  const setUser = useSetAtom(userAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    })

    return sub;
  }, []);

  console.log(loading);

  if(loading) {
    return null;
  }

  return (
    <AppState>
      <Routes />
    </AppState>
  );
}

export default App;
