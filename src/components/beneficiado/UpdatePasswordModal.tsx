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
import UpdatePasswordForm from "./UpdatePasswordForm";

interface UpdatePasswordModalProps {
  beneficiadoId: number;
}

const UpdatePasswordModal: FunctionComponent<
  PropsWithChildren<UpdatePasswordModalProps>
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
            <UpdatePasswordForm
              beneficiadoId={props.beneficiadoId}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdatePasswordModal;
