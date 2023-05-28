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
import DisplayEvento from "../../components/eventos/DisplayEvento";
import Voluntario from "../../types/Voluntario";
import Beneficiado from "../../types/Beneficiado";
import EditarEventoModal from "../../components/beneficiado/EditarEventoModal";

const EventoBeneficiadoScreen = () => {
  const query = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["getEventBeneficiadoById", Number(query.id), 1],
    queryFn: () => getEventById(Number(query.id), 1),
  });

  if (isLoading || !data) return <p>Cargando...</p>;

  return (
    <Box>
      <DisplayEvento evento={data}>
        <EditarEventoModal evento={data} />
      </DisplayEvento>
    </Box>
  );
};

export default EventoBeneficiadoScreen;
