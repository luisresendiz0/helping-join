import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { FunctionComponent, PropsWithChildren, useState } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { drawerAtom } from "../../atoms/drawerAtom";
import { useSetAtom } from "jotai";
import { useLocation, useNavigate } from "react-router-dom";

const menuItems = [
  { name: "Recomendaciones", path: "/recomendaciones" },
  { name: "Buscar", path: "/buscar" },
  { name: "Perfil", path: "/perfil" },
  { name: "Evento", path: "/eventos/1" },
];

const Layout: FunctionComponent<PropsWithChildren> = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Grid
      w="100vw"
      h="100vh"
      templateRows="repeat(12, 1fr)"
      templateColumns="repeat(12, 1fr)"
    >
      <GridItem colSpan={12} borderBottom="1px solid" borderColor="gray.300">
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
        borderColor="gray.300"
      >
        {menuItems.map((item) => (
          <Flex
            key={item.name}
            sx={{
              width: "100%",
              height: "60px",
              backgroundColor:
                location.pathname === item.path ? "gray.100" : "",
              "&:hover": {
                backgroundColor:
                  location.pathname === item.path ? "gray.100" : "gray.50",
                cursor: "pointer",
              },
            }}
            align="center"
            justify="center"
            onClick={() => navigate(item.path)}
          >
            <Text>{item.name}</Text>
          </Flex>
        ))}
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
