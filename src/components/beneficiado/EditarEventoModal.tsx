import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Evento from "../../types/Evento";
import EditarEventoForm from "./EditarEventoForm";
import { useAtomValue } from "jotai";
import userAtom from "../../atoms/userAtom";

interface Props {
  evento: Evento;
}

const EditarEventoModal = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useAtomValue(userAtom);
  return (
    <Box>
      <Button
        colorScheme="orange"
        onClick={onOpen}
        isDisabled={user?.verificado === 0}
      >
        Editar
      </Button>
      {user?.verificado === 0 && (
        <Text fontSize="xs" color="red.500">
          Debes verificar tu cuenta para poder editar eventos
        </Text>
      )}
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
