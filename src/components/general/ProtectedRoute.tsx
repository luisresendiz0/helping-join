import { useAtomValue, useSetAtom } from "jotai";
import { FunctionComponent, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import userAtom from "../../atoms/userAtom";
import tokenAtom from "../../atoms/tokenAtom";
import { validateToken } from "../../services/api/validateToken";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase/config";
import firebaseUserAtom from "../../atoms/firebaseUserAtom";
import { useToast } from "@chakra-ui/react";

const ProtectedRoute: FunctionComponent<PropsWithChildren> = (props) => {
  const user = useAtomValue(userAtom);
  const setUser = useSetAtom(userAtom);
  const setToken = useSetAtom(tokenAtom);

  useEffect(() => {
    const findTokenAndRecoversUser = async () => {
      const token = localStorage.getItem("token");
      console.log(token);
      if (token) {
        const isTokenValid = await validateToken(token);

        if (isTokenValid) {
          setToken(token);
          const localuser = localStorage.getItem("user");
          if (localuser) {
            console.log(localuser);
            const user = JSON.parse(localuser);
            setUser(user);
          }
        }
      }
    };

    findTokenAndRecoversUser();
  }, []);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{props.children}</>;
};

export default ProtectedRoute;
