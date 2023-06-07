import { Box, Text, Wrap, WrapItem, Tag } from "@chakra-ui/react";
import Evento from "../../types/Evento";
import { FunctionComponent, PropsWithChildren } from "react";
import { format } from "date-fns";
import DateText from "../general/DateText";

interface Cats {
  categorias: string;
}

interface EventoWCats extends Evento, Cats {}

interface EventoItemProps {
  evento: Evento;
  onClick: (id: number) => void;
}

const EventoItem: FunctionComponent<PropsWithChildren<EventoItemProps>> = (
  props
) => {
  const evento = props.evento as unknown as EventoWCats;

  return (
    <Box
      key={evento.id_evento}
      w="100%"
      h="100%"
      borderColor="orange.300"
      borderWidth={1}
      borderStyle="solid"
      borderRadius={8}
      backgroundColor="white"
      p={4}
      onClick={() => props.onClick(evento.id_evento)}
    >
      <Text fontWeight="bold" fontSize={18}>
        {evento.nombre}
      </Text>
      <Text mb={2}>{evento.descripcion.substring(0, 40)}...</Text>
      <Text fontSize="sm">Fecha de inicio</Text>

      <DateText date={evento.fecha_inicio} />
      <Text fontSize="sm">Fecha de fin</Text>
      <DateText date={evento.fecha_fin} />
      <Wrap mt={2}>
        {evento.categorias.split(",").map((cat) => (
          <WrapItem key={cat}>
            <Tag>{cat}</Tag>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};

export default EventoItem;
