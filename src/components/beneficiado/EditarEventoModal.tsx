import { Box, Button } from "@chakra-ui/react";
import Evento from "../../types/Evento";

interface Props {
  evento: Evento;
}

const EditarEventoModal = (props: Props) => {
  return (
    <Box>
      <Button colorScheme="pink">Editar</Button>
    </Box>
  );
};

export default EditarEventoModal;
