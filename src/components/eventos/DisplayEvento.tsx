import {
  Box,
  Grid,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Evento from "../../types/Evento";
import { FunctionComponent, PropsWithChildren } from "react";
import { format } from "date-fns";
import LocationMap from "../general/LocationMap";

interface DisplayEventoProps {
  evento: Evento;
}

const DisplayEvento: FunctionComponent<
  PropsWithChildren<DisplayEventoProps>
> = (props) => {
  const currentDirection = `${props.evento.calle} ${props.evento.numero_exterior}, ${props.evento.colonia}, ${props.evento.alcaldia}, ${props.evento.entidad}, ${props.evento.codigo_postal}, Mexico`;
  const cp = `${props.evento.codigo_postal}`;
  return (
    <Box
      w="100%"
      bg="white"
      borderRadius="md"
      borderWidth={1}
      borderColor="orange.200"
      p={4}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(6, 1fr)"
        gap={4}
      >
        <GridItem colSpan={[6, 4]} rowSpan={2}>
          <Heading size="lg" mb={4}>
            {props.evento.nombre}
          </Heading>
          <Text mb={4}>{props.evento.descripcion}</Text>

          <Image src={props.evento.imagen} alt={props.evento.nombre} />
        </GridItem>
        <GridItem colSpan={[6, 2]}>
          <LocationMap currentAddress={currentDirection} cp={cp} />
          <Box mt={4}>
            <Text as="b">Fecha inicio: </Text>
            <Text>
              {format(
                new Date(props.evento.fecha_inicio),
                "dd LLLL yyyy hh:mm aaa"
              )}
            </Text>
            <Text as="b">Fecha fin:</Text>
            <Text>
              {format(
                new Date(props.evento.fecha_fin),
                "dd LLLL yyyy hh:mm aaa"
              )}
            </Text>
            <Text as="b">Dirección:</Text>
            <Text>📍 {currentDirection}</Text>
            <Text as="b">Interesados:</Text>
            <Text>{props.evento.interesados}</Text>
          </Box>
        </GridItem>
        <GridItem colSpan={[6, 2]}>{props.children}</GridItem>
      </Grid>
    </Box>
  );
};

export default DisplayEvento;
