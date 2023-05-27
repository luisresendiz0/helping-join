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
import userAtom from "../../atoms/userAtom";
import { useAtomValue } from "jotai";

interface UpdatePasswordModalProps {
  beneficiadoId: number;
}

const UpdatePasswordModal: FunctionComponent<
  PropsWithChildren<UpdatePasswordModalProps>
> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useAtomValue(userAtom);

  return (
    <>
      <Button onClick={onOpen} isDisabled={user?.verificado === 0}>
        Cambiar contraseña
      </Button>
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
