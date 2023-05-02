import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Recomendation } from "../../types/Recomendation";
import { generateRecomendationsById } from "../../services/api/generateRecomendationsById";
import { getRecomendationsById } from "../../services/api/getRecomendationsById";
import { useNavigate } from "react-router-dom";

const RecommendationsScreen = () => {
  const [recomendations, setRecomendations] = useState<Array<Recomendation>>([]);
  const [cats, setCats] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const findRecomendations = async () => {
      const voluntarioId = 3;
      try {
        await generateRecomendationsById(voluntarioId);
        const data = await getRecomendationsById(voluntarioId);
        console.log(data);
        setRecomendations(data.data);
        setCats(data.cats);
      } catch (error) {
        console.error(error);
      }
    }

    findRecomendations();
  }, [])

  const handleOnClick = (id: number) => {
    navigate(`/eventos/${id}`);
  }

  return (
    <Box>
      <Heading mb={8}>Recomendaciones</Heading>
      <Text mb={8}>Categorias: {cats}</Text>
      <SimpleGrid columns={4} spacing={10} w="full" h="container.sm">
        {recomendations.map(recomendation => {
          return (
            <Box
              key={recomendation.id_evento}
              w="100%"
              h="100%"
              borderColor="gray.300"
              borderWidth={1}
              borderStyle="solid"
              borderRadius={8}
              onClick={() => handleOnClick(recomendation.id_evento)}
            >
              <Text>Evento id: {recomendation.id_evento}</Text>
              <Text>Nombre: {recomendation.nombre}</Text>
              <Text>Fecha inicio: {recomendation.fecha_inicio}</Text>
              <Text>Fecha fin: {recomendation.fecha_fin}</Text>
              <Text>Descripcion: {recomendation.descripcion}</Text>
              <Text>Categorias: {recomendation.categorias}</Text>
            </Box>
          )
        })}
        
      </SimpleGrid>
    </Box>
  );
};

export default RecommendationsScreen;
