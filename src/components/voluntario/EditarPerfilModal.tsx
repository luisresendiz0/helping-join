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
import Voluntario from "../../types/Voluntario";
import EditarPerfilForm from "./EditarPerfilForm";

interface EditarPerfilModalProps {
  voluntario: Voluntario;
}

const EditarPerfilModal: FunctionComponent<
  PropsWithChildren<EditarPerfilModalProps>
> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Editar perfil</Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar perfil</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditarPerfilForm voluntario={props.voluntario} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditarPerfilModal;
