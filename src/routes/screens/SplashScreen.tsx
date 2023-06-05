import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Slideshow from "../../components/splash/Slideshow";
import { useRef } from "react";

const SplashScreen = () => {
  const objetivoRef = useRef<HTMLDivElement>(null);
  return (
    <Box>
      <Slideshow objetivoRef={objetivoRef} />
      <Flex justify="center" align="center" w="100vw" h="100vh">
        <Box paddingX={{ base: 8, md: 64 }} ref={objetivoRef}>
          <Heading textAlign="center" mb={8} color="orange.500">
            Objetivo
          </Heading>
          <Text textAlign="center">
            Somos un grupo de alumnos de la Escuela Superior de Computo que
            buscan desarrollar un prototipo de aplicación web progresiva que
            permita conectar organizaciones de beneficencia o civiles
            independientes que necesiten apoyo para llevar a cabo sus eventos
            específicos con personas interesadas en ofrecer dicho apoyo, ya sea
            en especie o como voluntariado. Todo esto mediante la implementación
            de un modelo de recomendación.
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default SplashScreen;
