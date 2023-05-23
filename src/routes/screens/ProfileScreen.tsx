import {
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
import { useAtomValue } from "jotai";
import userAtom from "../../atoms/userAtom";
import Voluntario from "../../types/Voluntario";
import { useQuery } from "react-query";
import { getEventosInteres } from "../../services/api/getEventosInteres";
import Evento from "../../types/Evento";
import { format } from "date-fns";
import { getPastEventosInteres } from "../../services/api/getPastEventosInteres";

const ProfileScreen = () => {
  const userFromAtom = useAtomValue(userAtom);
  const user = userFromAtom as Voluntario;

  const eventosInteresQuery = useQuery<Evento[]>("eventosInteres", () =>
    getEventosInteres(user.id_voluntario)
  );

  const eventosPasadosInteresQuery = useQuery<Evento[]>(
    "eventosPasadosInteres",
    () => getPastEventosInteres(user.id_voluntario)
  );

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
        <GridItem colSpan={1}>
          <Image src={profile} rounded="full" w={250} h={250} />
        </GridItem>
        <GridItem colSpan={3}>
          <Heading size="md" mb={2}>
            {user.nombre}
          </Heading>
          <Text mb={8} color="blue.500">
            {user.email}
          </Text>
          <Text>
            Como alguien que se preocupa profundamente por la gente que me
            rodea, encuentro una gran satisfacción al ayudar a aquellos que más
            lo necesitan. Para mí, es importante ser empático y tratar a los
            demás con respeto y compasión, independientemente de sus
            antecedentes o circunstancias.
          </Text>
          <HStack mt={8}>
            <Button>Editar perfil</Button>
            <Button>Cambiar contraseña</Button>
          </HStack>
        </GridItem>
      </Grid>
      <SimpleGrid spacing={40} columns={2}>
        <Box>
          <Heading mb={8} size="lg">
            Eventos de interes ⭐
          </Heading>
          {eventosInteresQuery.data && (
            <SimpleGrid columns={2} spacing={10} w="full" h="container.sm">
              {eventosInteresQuery.data.map((evento) => (
                <Box
                  key={evento.id_evento}
                  h={200}
                  borderColor="pink.300"
                  borderWidth={1}
                  borderStyle="solid"
                  borderRadius={8}
                  p={4}
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
                  h={200}
                  borderColor="pink.300"
                  borderWidth={1}
                  borderStyle="solid"
                  borderRadius={8}
                  p={4}
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
