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

interface CreaseEventoModalProps {
  beneficiadoId: number;
}

const CreateEventoModal: FunctionComponent<
  PropsWithChildren<CreaseEventoModalProps>
> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button colorScheme="pink" onClick={onOpen}>
        Crear evento
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
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
