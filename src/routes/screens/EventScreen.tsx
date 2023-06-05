import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
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
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { getBeneficiadoById } from "../../services/api/getBeneficiadoById";

const EventScreen = () => {
  const navigate = useNavigate();
  const query = useParams();
  const userValue = useAtomValue(userAtom);
  const queryClient = useQueryClient();
  const toast = useToast();

  const user = userValue as Voluntario;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [descripcion, setDescripcion] = useState<string>("");

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["getEventById", Number(query.id), user?.id_voluntario],
    queryFn: () => getEventById(Number(query.id), user?.id_voluntario),
  });

  const beneficiadoQuery = useQuery({
    queryKey: ["getBeneficiadoById", data?.id_beneficiado],
    queryFn: () => getBeneficiadoById(data?.id_beneficiado || 0),
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

  const handleOnChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 128) return;
    setDescripcion(e.target.value);
  };

  const handleOnClickEnviar = async () => {
    try {
      await createReporte(Number(query.id), user.id_voluntario, descripcion);
      setDescripcion("");
      onClose();
      toast({
        title: "Reporte enviado",
        description: "Su reporte ha sido enviado a nuestros moderadores",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
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

        {beneficiadoQuery.data ? (
          <Box
            mt={8}
            borderWidth={1}
            borderColor="orange.400"
            borderRadius={8}
            padding={4}
            onClick={() =>
              navigate(
                `/perfil-beneficiado-by-voluntario/${beneficiadoQuery.data.id_beneficiado}`
              )
            }
          >
            <VStack spacing={4}>
              <Avatar
                src={beneficiadoQuery.data.imagen}
                size="md"
                name={beneficiadoQuery.data.nombre}
              />
              <Heading size="md">{beneficiadoQuery.data.nombre}</Heading>
            </VStack>
          </Box>
        ) : (
          <CircularProgress isIndeterminate color="orange.300" />
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
              Caracteres restantes: {128 - descripcion.length}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="orange" mr={3} onClick={handleOnClickEnviar}>
              Enviar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EventScreen;
