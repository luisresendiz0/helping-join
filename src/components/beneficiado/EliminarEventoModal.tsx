import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import ConfirmDialog from "../reportes/ConfirmDialog";
import { useNavigate } from "react-router-dom";
import { deleteEventoByBeneficiado } from "../../services/api/deleteEventoByBeneficiado";

interface Props {
  eventoId: number;
}

const EliminarEventoModal = (props: Props) => {
  const disclosure = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const handleConfirm = async () => {
    const result = await deleteEventoByBeneficiado(props.eventoId);
    if (result) {
      toast({
        title: "Evento eliminado",
        description: "El evento se ha eliminado correctamente",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/perfil-beneficiado", { replace: true });
    }
  };

  return (
    <>
      <Button colorScheme="red" onClick={() => disclosure.onOpen()}>
        Eliminar
      </Button>
      <ConfirmDialog
        disclosure={disclosure}
        title="Eliminar evento"
        description="¿Estás seguro de que quieres eliminar este evento?"
        confirmButtonText="Eliminar evento"
        confirmAction={handleConfirm}
      />
    </>
  );
};

export default EliminarEventoModal;
