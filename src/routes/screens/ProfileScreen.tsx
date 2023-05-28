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
  Text,
} from "@chakra-ui/react";
import profile from "../../assets/profile1.webp";
import { useAtomValue, useSetAtom } from "jotai";
import userAtom from "../../atoms/userAtom";
import Voluntario from "../../types/Voluntario";
import { useQuery } from "react-query";
import { getEventosInteres } from "../../services/api/getEventosInteres";
import Evento from "../../types/Evento";
import { format } from "date-fns";
import { getPastEventosInteres } from "../../services/api/getPastEventosInteres";
import EditarPerfilModal from "../../components/voluntario/EditarPerfilModal";
import { getVountarioById } from "../../services/api/getVoluntarioById";
import EditarPasswordModal from "../../components/voluntario/EditarPasswordModal";
import { useNavigate } from "react-router-dom";

const ProfileScreen = () => {
  const userFromAtom = useAtomValue(userAtom);
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();

  const user = userFromAtom as Voluntario;

  const eventosInteresQuery = useQuery<Evento[]>("eventosInteres", () =>
    getEventosInteres(user.id_voluntario)
  );

  const eventosPasadosInteresQuery = useQuery<Evento[]>(
    "eventosPasadosInteres",
    () => getPastEventosInteres(user.id_voluntario)
  );

  const userQuery = useQuery<Voluntario>("userData", () => getUserData());

  const getUserData = async () => {
    const data = await getVountarioById(user.id_voluntario);
    setUser(data.data);
    localStorage.setItem("user", JSON.stringify(data.data));
    return data.data as Voluntario;
  };

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
          <Box display="flex" justifyContent="center" alignItems="center" p={4}>
            <Avatar
              size="2xl"
              name={userQuery.data?.nombre}
              src={userQuery.data?.imagen}
              bg="pink.100"
            />
          </Box>
        </GridItem>
        <GridItem colSpan={[4, 3]}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems={["center", "flex-start"]}
          >
            <Heading size="md" mb={2} textAlign="center">
              {userQuery.data?.nombre}
            </Heading>
            <Text mb={8} color="blue.500">
              {userQuery.data?.email}
            </Text>
          </Box>
          <HStack mt={8}>
            <EditarPerfilModal voluntario={userQuery.data as Voluntario} />
            <EditarPasswordModal voluntarioId={user.id_voluntario} />
          </HStack>
        </GridItem>
      </Grid>
      <SimpleGrid spacing={20} columns={[1, 2]}>
        <Box>
          <Heading mb={8} size="lg">
            Eventos de interés ⭐
          </Heading>
          {eventosInteresQuery.data && (
            <SimpleGrid columns={2} spacing={[4, 8]} w="full">
              {eventosInteresQuery.data.map((evento) => (
                <Box
                  key={evento.id_evento}
                  h={200}
                  borderColor="pink.300"
                  borderWidth={1}
                  borderStyle="solid"
                  borderRadius={8}
                  p={4}
                  onClick={() => navigate(`/eventos/${evento.id_evento}`)}
                >
                  <Text fontWeight="bold">{evento.nombre}</Text>
                  <Text>
                    Inicia:{" "}
                    {format(
                      new Date(evento.fecha_inicio),
                      "dd LLLL yyyy hh:mm aaa"
                    )}
                  </Text>
                  <Text>
                    Termina:{" "}
                    {format(
                      new Date(evento.fecha_fin),
                      "dd LLLL yyyy hh:mm aaa"
                    )}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Box>
        <Box>
          <Heading mb={8} size="lg">
            Participaciones anteriores
          </Heading>
          {eventosPasadosInteresQuery.data && (
            <SimpleGrid columns={2} spacing={10} w="full" h="container.sm">
              {eventosPasadosInteresQuery.data.map((evento) => (
                <Box
                  key={evento.id_evento}
                  h={200}
                  borderColor="pink.300"
                  borderWidth={1}
                  borderStyle="solid"
                  borderRadius={8}
                  p={4}
                  onClick={() => navigate(`/eventos/${evento.id_evento}`)}
                >
                  <Text fontWeight="bold">{evento.nombre}</Text>
                  <Text>
                    Inicia:{" "}
                    {format(
                      new Date(evento.fecha_inicio),
                      "dd LLLL yyyy hh:mm aaa"
                    )}
                  </Text>
                  <Text>
                    Termina:{" "}
                    {format(
                      new Date(evento.fecha_fin),
                      "dd LLLL yyyy hh:mm aaa"
                    )}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default ProfileScreen;
