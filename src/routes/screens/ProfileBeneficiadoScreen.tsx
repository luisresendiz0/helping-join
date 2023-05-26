import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import profile from "../../assets/profile1.webp";
import { useAtomValue } from "jotai";
import userAtom from "../../atoms/userAtom";
import Beneficiado from "../../types/Beneficiado";
import CreateEventoForm from "../../components/beneficiado/CreateEventoForm";
import { useQuery } from "react-query";
import { getEventosByBeneficiadoId } from "../../services/api/getEventosByBeneficiadoId";
import { format } from "date-fns";
import CreateEventoModal from "../../components/beneficiado/CreateEventoModal";
import EliminarCuentaModal from "../../components/beneficiado/EliminarCuentaModal";
import EditarPerfilModal from "../../components/beneficiado/EditarPerfilModal";
import UpdatePasswordModal from "../../components/beneficiado/UpdatePasswordModal";
import { useNavigate } from "react-router-dom";

const ProfileBeneficiadoScreen = () => {
  const userFromAtom = useAtomValue(userAtom);
  const user = userFromAtom as Beneficiado;
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ["eventosBeneficiado", user.id_beneficiado],
    queryFn: () => getEventosByBeneficiadoId(user.id_beneficiado),
  });

  return (
    <Box>
      <Grid
        borderColor="pink.300"
        borderWidth={1}
        borderStyle="solid"
        borderRadius={8}
        mb={8}
        p={8}
        templateColumns="repeat(4, 1fr)"
      >
        <GridItem colSpan={[4, 1]}>
          <Avatar
            size="2xl"
            name={user.nombre}
            src={user.imagen}
            bg="pink.100"
            mb={4}
          />
        </GridItem>
        <GridItem colSpan={[4, 3]}>
          <Text fontSize="sm">Nombre de la organizacion</Text>
          <Heading size="md" mb={4}>
            {user.nombre}
          </Heading>
          <Text fontSize="sm">Correo electronico</Text>
          <Text mb={4} color="pink.500">
            {user.email}
          </Text>
          <Text fontSize="sm">Descripcion</Text>
          <Text>{user.descripcion}</Text>
          <Stack mt={8} wrap="wrap">
            <CreateEventoModal beneficiadoId={user.id_beneficiado} />
            <EditarPerfilModal beneficiado={user} />
            <UpdatePasswordModal beneficiadoId={user.id_beneficiado} />
            <EliminarCuentaModal beneficiadoId={user.id_beneficiado} />
          </Stack>
        </GridItem>
      </Grid>
      <Heading mb={8} size="lg">
        Mis eventos
      </Heading>
      {query.data?.length === 0 ? (
        <Text>
          No hay eventos creados, da clic en el boton "Crear evento" para crear
          uno.
        </Text>
      ) : (
        <SimpleGrid columns={[1, 4]} spacing={10} w="full" h="container.sm">
          {query.data?.map((evento) => (
            <Box
              key={evento.id_evento}
              h={200}
              borderColor="pink.300"
              borderWidth={1}
              borderStyle="solid"
              borderRadius={8}
              p={4}
              onClick={() =>
                navigate(`/eventos-beneficiado/${evento.id_evento}`)
              }
            >
              <Heading size="md" mb={2}>
                {evento.nombre}
              </Heading>
              <Text mb={2}>{evento.descripcion.substring(0, 40)}...</Text>
              <Text fontSize="sm">Fecha de inicio</Text>
              <Text mb={2}>
                {format(
                  new Date(evento.fecha_inicio),
                  "dd LLLL yyyy hh:mm aaa"
                )}
              </Text>
              <Text fontSize="sm">Fecha de fin</Text>
              <Text mb={2}>
                {format(new Date(evento.fecha_fin), "dd LLLL yyyy hh:mm aaa")}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default ProfileBeneficiadoScreen;
