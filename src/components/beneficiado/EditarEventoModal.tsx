import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Evento from "../../types/Evento";
import EditarEventoForm from "./EditarEventoForm";

interface Props {
  evento: Evento;
}

const EditarEventoModal = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <Button colorScheme="pink" onClick={onOpen}>
        Editar
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={["full", "2xl"]}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crear nuevo evento</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditarEventoForm evento={props.evento} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EditarEventoModal;
