import {
  Box,
  Heading,
  SimpleGrid,
  Tag,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Recomendation } from "../../types/Recomendation";
import { generateRecomendationsById } from "../../services/api/generateRecomendationsById";
import { getRecomendationsById } from "../../services/api/getRecomendationsById";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import userAtom from "../../atoms/userAtom";
import { useAtomValue } from "jotai";
import Voluntario from "../../types/Voluntario";

const RecommendationsScreen = () => {
  const userValue = useAtomValue(userAtom);
  const user = userValue as Voluntario;

  const [recomendations, setRecomendations] = useState<Array<Recomendation>>(
    []
  );
  const navigate = useNavigate();

  useEffect(() => {
    const findRecomendations = async () => {
      const voluntarioId = user.id_voluntario || 0;
      try {
        await generateRecomendationsById(voluntarioId);
        const data = await getRecomendationsById(voluntarioId);
        setRecomendations(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    findRecomendations();
  }, []);

  const handleOnClick = (id: number) => {
    navigate(`/eventos/${id}`);
  };

  if (!recomendations.length) return <Box>No hay recomendaciones</Box>;

  return (
    <Box>
      <Heading mb={8}>Recomendaciones</Heading>
      <SimpleGrid columns={[1, 4]} spacing={8} w="full">
        {recomendations.map((recomendation) => {
          return (
            <Box
              key={recomendation.id_evento}
              w="100%"
              h="100%"
              borderColor="pink.300"
              borderWidth={1}
              borderStyle="solid"
              borderRadius={8}
              p={4}
              onClick={() => handleOnClick(recomendation.id_evento)}
            >
              <Text fontWeight="bold" fontSize={18}>
                {recomendation.nombre}
              </Text>
              <Text>
                Inicia:{" "}
                {format(
                  new Date(recomendation.fecha_inicio),
                  "dd LLLL yyyy hh:mm aaa"
                )}
              </Text>
              <Text>
                Termina:{" "}
                {format(
                  new Date(recomendation.fecha_fin),
                  "dd LLLL yyyy hh:mm aaa"
                )}
              </Text>
              <Wrap mt={2}>
                {recomendation.categorias.split(",").map((cat) => (
                  <WrapItem key={cat}>
                    <Tag>{cat}</Tag>
                  </WrapItem>
                ))}
              </Wrap>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default RecommendationsScreen;
