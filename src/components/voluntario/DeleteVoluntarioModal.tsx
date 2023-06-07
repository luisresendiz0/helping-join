import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import ConfirmDialog from "../reportes/ConfirmDialog";
import { useNavigate } from "react-router-dom";
import { deleteEventoByBeneficiado } from "../../services/api/deleteEventoByBeneficiado";
import { useSetAtom } from "jotai";
import userAtom from "../../atoms/userAtom";
import tokenAtom from "../../atoms/tokenAtom";
import { deleteVoluntarioById } from "../../services/api/deleteVoluntarioById";

interface Props {
  voluntarioId: number;
}

const DeleteVoluntarioModal = (props: Props) => {
  const disclosure = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const setUser = useSetAtom(userAtom);
  const setToken = useSetAtom(tokenAtom);

  const handleConfirm = async () => {
    // TODO: update fn
    const result = await deleteVoluntarioById(props.voluntarioId);
    if (result) {
      toast.closeAll();
      toast({
        title: "Perfil eliminado",
        description: "El perfil se ha eliminado correctamente",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setUser(null);
      setToken(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/signin", { replace: true });
    }
  };

  return (
    <>
      <Button colorScheme="red" onClick={() => disclosure.onOpen()}>
        Eliminar cuenta
      </Button>
      <ConfirmDialog
        disclosure={disclosure}
        title="Eliminar cuenta"
        description="¿Estás seguro de que quieres eliminar tu cuenta?"
        confirmButtonText="Eliminar cuenta"
        confirmAction={handleConfirm}
      />
    </>
  );
};

export default DeleteVoluntarioModal;
