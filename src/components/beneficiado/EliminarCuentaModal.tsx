import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRef, FunctionComponent, PropsWithChildren } from "react";
import { deleteBeneficiadoById } from "../../services/api/deleteBeneficiadoById";
import { useSetAtom } from "jotai";
import userAtom from "../../atoms/userAtom";
import tokenAtom from "../../atoms/tokenAtom";

interface EliminarCuentaModalProps {
  beneficiadoId: number;
}

const EliminarCuentaModal: FunctionComponent<
  PropsWithChildren<EliminarCuentaModalProps>
> = (props) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const setUser = useSetAtom(userAtom);
  const setToken = useSetAtom(tokenAtom);

  const onDelete = async () => {
    try {
      await deleteBeneficiadoById(props.beneficiadoId);
      onClose();

      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      toast({
        title: "Cuenta eliminada",
        description: "La cuenta se eliminó correctamente",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        Eliminar cuenta
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Eliminar cuenta
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Estás seguro? No podrás revertir esta acción después.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={onDelete} ml={3}>
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default EliminarCuentaModal;
