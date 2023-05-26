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

interface EditarPerfilModalProps {
  beneficiado: Beneficiado;
}

const EditarPerfilModal: FunctionComponent<
  PropsWithChildren<EditarPerfilModalProps>
> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Editar perfil</Button>

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
