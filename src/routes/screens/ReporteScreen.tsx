import { Avatar, Badge, Box, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../../services/api/getEventById";
import { getReportesByEventoId } from "../../services/api/getReportesByEventoId";
import { useQuery } from "react-query";
import DisplayEvento from "../../components/eventos/DisplayEvento";
import { format } from "date-fns";

const ReporteScreen = () => {
  const params = useParams();

  const eventoId = Number(params.id);

  const evento = useQuery("eventoById", () => getEventById(eventoId, 1));
  const reportes = useQuery("reportesByEventoId", () =>
    getReportesByEventoId(eventoId)
  );

  if (evento.isLoading || reportes.isLoading) return <Text>Cargando...</Text>;

  if (!evento.data || !reportes.data) return <Text>No hay datos</Text>;

  return (
    <Box>
      <DisplayEvento evento={evento.data} />
      <SimpleGrid columns={[1, 3]} spacing={4} mt={4}>
        {reportes.data.map((reporte) => (
          <Box
            key={reporte.id_reporte}
            w="100%"
            bg="white"
            borderRadius="md"
            borderWidth={1}
            borderColor="pink.200"
            p={4}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <HStack>
              <Avatar
                size="xs"
                name={reporte.voluntario_nombre}
                src={reporte.voluntario_imagen}
              />
              <Text as="b">{reporte.voluntario_nombre}</Text>
              <Badge>
                {format(new Date(reporte.fecha), "dd LLLL yyyy hh:mm aaa")}
              </Badge>
            </HStack>
            <Text>{reporte.descripcion}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ReporteScreen;
