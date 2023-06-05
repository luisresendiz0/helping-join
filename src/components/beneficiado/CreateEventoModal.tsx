import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import CreateEventoForm from "./CreateEventoForm";
import { FunctionComponent, PropsWithChildren } from "react";
import { useAtomValue } from "jotai";
import userAtom from "../../atoms/userAtom";

interface CreaseEventoModalProps {
  beneficiadoId: number;
}

const CreateEventoModal: FunctionComponent<
  PropsWithChildren<CreaseEventoModalProps>
> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useAtomValue(userAtom);

  return (
    <>
      <Button
        colorScheme="orange"
        onClick={onOpen}
        isDisabled={user?.verificado === 0}
      >
        Crear evento
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={["full", "xl"]}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crear nuevo evento</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateEventoForm
              beneficiadoId={props.beneficiadoId}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateEventoModal;
