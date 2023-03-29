import { Box, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const EventScreen = () => {
  const query = useParams();

  return (
    <Box>
      <Heading mb={8}>{`Detalle de evento ${query.id}`}</Heading>
    </Box>
  );
};

export default EventScreen;
