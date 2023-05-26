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
import EditarPasswordForm from "./EditarPasswordForm";

interface EditarPasswordModalProps {
  voluntarioId: number;
}

const EditarPasswordModal: FunctionComponent<
  PropsWithChildren<EditarPasswordModalProps>
> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Cambiar contraseña</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cambiar contraseña</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditarPasswordForm
              voluntarioId={props.voluntarioId}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditarPasswordModal;
