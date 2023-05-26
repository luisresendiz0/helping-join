import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

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

interface MobileMenuProps {
  closeSession: () => void;
  userType: string;
  showDrawer: boolean;
  setShowDrawer: (value: boolean) => void;
}

const MobileMenu = (props: MobileMenuProps) => {
  const navigate = useNavigate();

  return (
    <Box
      display={{
        base: props.showDrawer ? "block" : "none",
        md: "none",
      }}
      w="100vw"
      h="100vh"
      position="fixed"
      top="0"
      left="0"
      backgroundColor="white"
      zIndex="100"
    >
      <Grid>
        {menuItems[props.userType as keyof typeof menuItems].map((item) => (
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
            onClick={() => {
              props.setShowDrawer(false);
              navigate(item.path);
            }}
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
          onClick={() => {
            props.setShowDrawer(false);
            props.closeSession();
          }}
        >
          <Text>Cerrar sesion</Text>
        </Flex>
      </Grid>
    </Box>
  );
};

export default MobileMenu;
