import {
  Box,
  Button,
  Heading,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { getReportes } from "../../services/api/getReportes";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Reporte from "../../types/Reporte";
import ConfirmDialog from "../../components/reportes/ConfirmDialog";
import { useState } from "react";
import { deleteEventoById } from "../../services/api/deleteEventoById";
import { mantenerEventoById } from "../../services/api/mantenerEventoById";
import { deleteBeneficiadoById } from "../../services/api/deleteBeneficiadoById";
import { useAtomValue } from "jotai";
import userAtom from "../../atoms/userAtom";
import NotFound from "./404";

const ReportesScreen = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();
  const u = useAtomValue(userAtom);
  console.log(u);

  const mantenerDisclosure = useDisclosure();
  const eliminarDisclosure = useDisclosure();
  const eliminarCuentaDisclosure = useDisclosure();

  const [id, setId] = useState<number>(0);

  const { data, isLoading, isFetching } = useQuery("reportes", getReportes);

  const handleOnClickVer = (eventoId: number) => {
    navigate(`${eventoId}`);
  };

  const handleOnClickMantener = (eventoId: number) => {
    mantenerDisclosure.onOpen();
    setId(eventoId);
  };

  const handleOnClickEliminarEvento = (eventoId: number) => {
    eliminarDisclosure.onOpen();
    setId(eventoId);
  };

  const handleOnClickEliminarCuenta = (beneficiadoId: number) => {
    eliminarCuentaDisclosure.onOpen();
    setId(beneficiadoId);
  };

  const confirmMantener = async () => {
    mantenerDisclosure.onClose();
    try {
      const result = await mantenerEventoById(id);
      if (result) {
        toast({
          title: "Evento mantenido",
          description: "El evento se ha mantenido exitosamente",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error al mantener evento",
          description: "Ha ocurrido un error al mantener el evento",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const confirmEliminarEvento = async () => {
    eliminarDisclosure.onClose();
    try {
      const result = await deleteEventoById(id);
      if (result) {
        toast({
          title: "Evento eliminado",
          description: "El evento ha sido eliminado exitosamente",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error al eliminar evento",
          description: "Ha ocurrido un error al eliminar el evento",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const confirmEliminarCuenta = async () => {
    eliminarCuentaDisclosure.onClose();
    try {
      const result = await deleteBeneficiadoById(id);
      if (result) {
        toast({
          title: "Cuenta eliminada",
          description: "La cuenta ha sido eliminada exitosamente",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error al eliminar cuenta",
          description: "Ha ocurrido un error al eliminar la cuenta",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMutation = useMutation({
    mutationFn: confirmEliminarEvento,
    onSuccess: () => {
      queryClient.invalidateQueries("reportes");
    },
  });

  const mantenerMutation = useMutation({
    mutationFn: confirmMantener,
    onSuccess: () => {
      queryClient.invalidateQueries("reportes");
    },
  });

  const deleteCuentaMutation = useMutation({
    mutationFn: confirmEliminarCuenta,
    onSuccess: () => {
      queryClient.invalidateQueries("reportes");
    },
  });

  if (u && u["id_moderador" as keyof typeof u] === undefined) {
    return <NotFound />;
  }

  if (isLoading)
    return (
      <Box>
        <Heading mb={4}>Reportes</Heading>
        <Box
          w="100%"
          bg="white"
          borderRadius="md"
          borderWidth={1}
          borderColor="orange.200"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          p={8}
        >
          <Text>Cargando...</Text>
        </Box>
      </Box>
    );

  if (!data || data.length === 0) {
    return (
      <Box>
        <Heading mb={4}>Reportes</Heading>
        <Box
          w="100%"
          bg="white"
          borderRadius="md"
          borderWidth={1}
          borderColor="orange.200"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          p={8}
        >
          <Text>No hay reportes</Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Heading mb={4}>Reportes</Heading>
      <Box
        w="100%"
        bg="white"
        borderRadius="md"
        borderWidth={1}
        borderColor="orange.200"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Reportes actualizados al momento</TableCaption>
            <Thead>
              <Tr>
                <Th>ID Evento</Th>
                <Th>Nombre</Th>
                <Th isNumeric>Reportes</Th>
                <Th isNumeric>Eventos eliminados</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.filter(r => r.estatus !== "verificado").map((reporte: Reporte) => {
                return (
                  <Tr key={reporte.id_evento}>
                    <Td>{reporte.id_evento}</Td>
                    <Td>{reporte.evento_nombre}</Td>
                    <Td isNumeric>{reporte.reportes}</Td>
                    <Td isNumeric>{reporte.eventos_eliminados}</Td>
                    <Td>
                      <Stack direction="row" spacing={4}>
                        <Button
                          colorScheme="orange"
                          size="sm"
                          onClick={() => handleOnClickVer(reporte.id_evento)}
                        >
                          Ver
                        </Button>
                        <Button
                          colorScheme="orange"
                          size="sm"
                          onClick={() =>
                            handleOnClickMantener(reporte.id_evento)
                          }
                        >
                          Mantener
                        </Button>
                        <Button
                          colorScheme="red"
                          size="sm"
                          onClick={() =>
                            handleOnClickEliminarEvento(reporte.id_evento)
                          }
                        >
                          Eliminar
                        </Button>
                        <Button
                          colorScheme="red"
                          size="sm"
                          onClick={() =>
                            handleOnClickEliminarCuenta(reporte.id_beneficiado)
                          }
                        >
                          Eliminar cuenta
                        </Button>
                      </Stack>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      <ConfirmDialog
        disclosure={mantenerDisclosure}
        title="Mantener evento"
        description="¿Estás seguro de que quieres mantener este evento?"
        confirmButtonText="Mantener"
        confirmButtonColor="teal"
        confirmAction={mantenerMutation.mutate}
      />
      <ConfirmDialog
        disclosure={eliminarDisclosure}
        title="Eliminar evento"
        description="¿Estás seguro de que quieres eliminar este evento?"
        confirmButtonText="Eliminar"
        confirmAction={deleteMutation.mutate}
      />
      <ConfirmDialog
        disclosure={eliminarCuentaDisclosure}
        title="Eliminar cuenta"
        description="¿Estás seguro de que quieres eliminar esta cuenta?"
        confirmButtonText="Eliminar cuenta"
        confirmAction={deleteCuentaMutation.mutate}
      />
    </Box>
  );
};

export default ReportesScreen;
