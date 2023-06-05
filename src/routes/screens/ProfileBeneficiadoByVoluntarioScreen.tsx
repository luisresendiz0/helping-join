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
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import Beneficiado from "../../types/Beneficiado";
import { useQuery } from "react-query";
import { getEventosByBeneficiadoId } from "../../services/api/getEventosByBeneficiadoId";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { getBeneficiadoById } from "../../services/api/getBeneficiadoById";
import LocationMap from "../../components/general/LocationMap";

const ProfileBeneficiadoByVoluntarioScreen = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { id } = params as { id: string };
  const beneficiadoId = parseInt(id);

  const { data } = useQuery({
    queryKey: ["getBeneficiadoById", beneficiadoId],
    queryFn: () => getBeneficiadoById(beneficiadoId),
  });

  const user = data as Beneficiado;
  const direccion = `${user?.calle} ${user?.numero_exterior}, ${user?.colonia}, ${user?.codigo_postal}, ${user?.alcaldia}, ${user?.entidad}`;

  const query = useQuery({
    queryKey: ["eventosBeneficiado", beneficiadoId],
    queryFn: () => getEventosByBeneficiadoId(beneficiadoId),
  });

  return (
    <Box>
      <Grid
        borderColor="orange.300"
        borderWidth={1}
        borderStyle="solid"
        borderRadius={8}
        mb={8}
        p={8}
        backgroundColor="white"
        templateColumns="repeat(4, 1fr)"
      >
        <GridItem colSpan={[4, 1]}>
          <Avatar
            size="2xl"
            name={user?.nombre}
            src={user?.imagen}
            bg="orange.100"
            mb={4}
          />
        </GridItem>
        <GridItem colSpan={[4, 2]}>
          <Text fontSize="sm">Nombre de la organización</Text>
          <Heading size="md" mb={4}>
            {user?.nombre}
          </Heading>
          <Text fontSize="sm">Correo electrónico</Text>
          <Text mb={4} color="orange.500">
            {user?.email}
          </Text>
          {user?.descripcion && (
            <>
              <Text fontSize="sm">Descripción</Text>
              <Text>{user?.descripcion}</Text>
            </>
          )}

          <Stack my={4} wrap="wrap" direction={["column", "row"]}>
            {user?.facebook && (
              <Link href={user?.facebook} isExternal color="facebook.500">
                Facebook <ExternalLinkIcon mx="2px" />
              </Link>
            )}
            {user?.twitter && (
              <Link href={user?.twitter} isExternal color="twitter.500">
                Twitter <ExternalLinkIcon mx="2px" />
              </Link>
            )}
            {user?.instagram && (
              <Link href={user?.instagram} isExternal color="orange.500">
                Instagram <ExternalLinkIcon mx="2px" />
              </Link>
            )}
            {user?.web && (
              <Link href={user?.web} isExternal color="orange.500">
                Pagina web <ExternalLinkIcon mx="2px" />
              </Link>
            )}
          </Stack>
        </GridItem>
        <GridItem colSpan={[4, 1]}>
          <LocationMap currentAddress={direccion} cp={user?.codigo_postal} />
          <Text fontSize="sm" mt={4}>
            Dirección
          </Text>
          <Text>{direccion}</Text>
        </GridItem>
      </Grid>
      <Heading mb={8} size="lg">
        Mis eventos
      </Heading>
      {query.data?.length === 0 ? (
        <Text>No hay eventos creados.</Text>
      ) : (
        <SimpleGrid columns={[1, 4]} spacing={10} w="full" h="container.sm">
          {query.data?.map((evento) => (
            <Box
              key={evento.id_evento}
              h={220}
              borderColor="orange.300"
              borderWidth={1}
              borderStyle="solid"
              borderRadius={8}
              p={4}
              cursor="pointer"
              backgroundColor="white"
              onClick={() => navigate(`/eventos/${evento.id_evento}`)}
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

export default ProfileBeneficiadoByVoluntarioScreen;
