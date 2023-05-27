import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import { FunctionComponent, PropsWithChildren } from "react";
import Beneficiado from "../../types/Beneficiado";
import EditarPerfilForm from "./EditarPerfilForm";
import { useAtomValue } from "jotai";
import userAtom from "../../atoms/userAtom";

interface EditarPerfilModalProps {
  beneficiado: Beneficiado;
}

const EditarPerfilModal: FunctionComponent<
  PropsWithChildren<EditarPerfilModalProps>
> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useAtomValue(userAtom);

  return (
    <>
      <Button onClick={onOpen} isDisabled={user?.verificado === 0}>
        Editar perfil
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={["full", "3xl"]}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar perfil</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditarPerfilForm
              beneficiado={props.beneficiado}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditarPerfilModal;
