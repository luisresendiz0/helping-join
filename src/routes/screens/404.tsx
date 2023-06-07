import { Box, Heading, Image } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import userAtom from "../../atoms/userAtom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const navigate = useNavigate();
  const u = useAtomValue(userAtom);

  console.log("404", u);

  useEffect(() => {
    if (!u) {
      navigate("/signin", { replace: true });
    }
  }, []);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flex={1}>
      <Box>
        <Image src="/404.png" />
        <Heading textAlign="center">404</Heading>
      </Box>
    </Box>
  );
};

export default NotFound;
