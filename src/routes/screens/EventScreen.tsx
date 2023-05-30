import {
  Box,
  Button,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../../services/api/getEventById";
import { updateEventoInterest } from "../../services/api/updateEventoInterest";
import { createReporte } from "../../services/api/createReporte";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAtomValue } from "jotai";
import userAtom from "../../atoms/userAtom";
import { format } from "date-fns";
import LocationMap from "../../components/general/LocationMap";
import DisplayEvento from "../../components/eventos/DisplayEvento";
import Voluntario from "../../types/Voluntario";

const EventScreen = () => {
  const query = useParams();
  const userValue = useAtomValue(userAtom);
  const queryClient = useQueryClient();

  const user = userValue as Voluntario;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [descripcion, setDescripcion] = useState<string>("");

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["getEventById", Number(query.id), user?.id_voluntario],
    queryFn: () => getEventById(Number(query.id), user?.id_voluntario),
  });

  const meInteresaMutation = useMutation({
    mutationFn: () =>
      updateEventoInterest(Number(query.id), user?.id_voluntario),
    onSuccess: () => {
      queryClient.invalidateQueries([
        "getEventById",
        Number(query.id),
        user?.id_voluntario,
      ]);
    },
  });

  const currentDirection = `${data?.calle} ${data?.numero_exterior}, ${data?.colonia}, ${data?.alcaldia}, ${data?.entidad}, ${data?.codigo_postal}, Mexico`;

  const handleOnChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 128) return;
    setDescripcion(e.target.value);
  };

  const handleOnClickEnviar = async () => {
    try {
      await createReporte(Number(query.id), user.id_voluntario, descripcion);
      setDescripcion("");
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading || !data) return <p>Cargando...</p>;

  return (
    <Box>
      <DisplayEvento evento={data}>
        <HStack mt={4}>
          <Button
            isDisabled={data.interesado > 0 || user.verificado === 0}
            colorScheme="yellow"
            onClick={() => meInteresaMutation.mutate()}
          >
            Me interesa
          </Button>
          <Button
            isDisabled={data.reportado > 0 || user.verificado === 0}
            colorScheme="red"
            onClick={onOpen}
          >
            Reportar
          </Button>
        </HStack>
        {user.verificado === 0 && (
          <Text fontSize="xs" color="red.500">
            Para poder interactuar con los eventos primero debes verificar tu
            cuenta
          </Text>
        )}
      </DisplayEvento>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nuevo reporte</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder="Escribe cual es el motivo de tu reporte"
              value={descripcion}
              onChange={handleOnChangeText}
            />
            <Text fontSize="xs">
              caracteres restantes: {128 - descripcion.length}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="blue" mr={3} onClick={handleOnClickEnviar}>
              Enviar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EventScreen;
