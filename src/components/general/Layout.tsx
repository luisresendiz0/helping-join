import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Progress,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { FunctionComponent, PropsWithChildren, useState } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { drawerAtom } from "../../atoms/drawerAtom";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useLocation, useNavigate } from "react-router-dom";
import userAtom from "../../atoms/userAtom";
import tokenAtom from "../../atoms/tokenAtom";

const menuItems = {
  voluntario: [
    { name: "Recomendaciones", path: "/recomendaciones" },
    { name: "Buscar", path: "/buscar" },
    { name: "Perfil", path: "/perfil" },
  ],
  moderador: [{ name: "Reportes", path: "/reportes" }],
  organizacion: [{ name: "Perfil", path: "/perfil-beneficiado" }],
  validacion: [],
};

const Layout: FunctionComponent<PropsWithChildren> = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);
  const [token, setToken] = useAtom(tokenAtom);

  const closeSession = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const userType =
    user && Object.keys(user).includes("id_voluntario")
      ? "voluntario"
      : user && Object.keys(user).includes("id_beneficiado")
      ? "organizacion"
      : user && Object.keys(user).includes("id_moderador")
      ? "moderador"
      : "validacion";

  return (
    <Grid
      w="100vw"
      h="100vh"
      templateRows="repeat(12, 1fr)"
      templateColumns="repeat(12, 1fr)"
    >
      <GridItem colSpan={12} borderBottom="1px solid" borderColor="pink.300">
        <Flex
          direction="row"
          justify="flex-start"
          align="center"
          w="full"
          h="full"
          paddingLeft={4}
        >
          <IconButton aria-label="Open drawer" icon={<HamburgerIcon />} />
          <Heading pl={4}>Helping Join</Heading>
        </Flex>
      </GridItem>
      <GridItem
        rowSpan={11}
        colSpan={2}
        borderRight="1px solid"
        borderColor="pink.300"
      >
        {menuItems[userType].map((item) => (
          <Flex
            key={item.name}
            sx={{
              width: "100%",
              height: "60px",
              backgroundColor:
                location.pathname === item.path ? "pink.100" : "",
              "&:hover": {
                backgroundColor:
                  location.pathname === item.path ? "pink.100" : "pink.50",
                cursor: "pointer",
              },
            }}
            align="center"
            justify="center"
            onClick={() => navigate(item.path)}
          >
            <Text color="pink.900">{item.name}</Text>
          </Flex>
        ))}
        <Flex
          sx={{
            width: "100%",
            height: "60px",
            backgroundColor: "",
            "&:hover": {
              backgroundColor: "pink.50",
              cursor: "pointer",
            },
          }}
          align="center"
          justify="center"
          onClick={closeSession}
        >
          <Text>Cerrar sesion</Text>
        </Flex>
      </GridItem>
      <GridItem
        rowSpan={11}
        colSpan={10}
        bg="white"
        p={location.pathname === "/buscar" ? 0 : 8}
        overflowY="scroll"
      >
        {props.children}
      </GridItem>
    </Grid>
  );
};

export default Layout;
