import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import profile from "../../assets/profile1.webp";

const ProfileScreen = () => {
  return (
    <Box>
      <Grid
        borderColor="gray.300"
        borderWidth={1}
        borderStyle="solid"
        borderRadius={8}
        mb={8}
        p={8}
        templateColumns="repeat(4, 1fr)"
      >
        <GridItem colSpan={1}>
          <Image src={profile} rounded="full" w={250} h={250} />
        </GridItem>
        <GridItem colSpan={3}>
          <Heading size="md" mb={2}>
            Lorem ipsum dolor sit amet consectetur.
          </Heading>
          <Text mb={8} color="blue.500">
            correo@usuario.com
          </Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum, saepe
            commodi. Impedit optio earum consectetur aliquid ratione! Quam, eos
            distinctio magnam consequatur repellat nesciunt amet neque. A
            distinctio ex aspernatur.
          </Text>
        </GridItem>
      </Grid>
      <SimpleGrid spacing={40} columns={2}>
        <Box>
          <Heading mb={8} size="lg">
            Eventos de interes
          </Heading>
          <SimpleGrid columns={2} spacing={10} w="full" h="container.sm">
            <Box
              h={200}
              borderColor="gray.300"
              borderWidth={1}
              borderStyle="solid"
              borderRadius={8}
            />
            <Box
              h={200}
              borderColor="gray.300"
              borderWidth={1}
              borderStyle="solid"
              borderRadius={8}
            />
            <Box
              h={200}
              borderColor="gray.300"
              borderWidth={1}
              borderStyle="solid"
              borderRadius={8}
            />
            <Box
              h={200}
              borderColor="gray.300"
              borderWidth={1}
              borderStyle="solid"
              borderRadius={8}
            />
            <Box
              h={200}
              borderColor="gray.300"
              borderWidth={1}
              borderStyle="solid"
              borderRadius={8}
            />
            <Box
              h={200}
              borderColor="gray.300"
              borderWidth={1}
              borderStyle="solid"
              borderRadius={8}
            />
          </SimpleGrid>
        </Box>
        <Box>
          <Heading mb={8} size="lg">
            Participaciones anteriores
          </Heading>
          <SimpleGrid columns={2} spacing={10} w="full" h="container.sm">
            <Box
              h={200}
              borderColor="gray.300"
              borderWidth={1}
              borderStyle="solid"
              borderRadius={8}
            />
            <Box
              h={200}
              borderColor="gray.300"
              borderWidth={1}
              borderStyle="solid"
              borderRadius={8}
            />
            <Box
              h={200}
              borderColor="gray.300"
              borderWidth={1}
              borderStyle="solid"
              borderRadius={8}
            />
            <Box
              h={200}
              borderColor="gray.300"
              borderWidth={1}
              borderStyle="solid"
              borderRadius={8}
            />
            <Box
              h={200}
              borderColor="gray.300"
              borderWidth={1}
              borderStyle="solid"
              borderRadius={8}
            />
            <Box
              h={200}
              borderColor="gray.300"
              borderWidth={1}
              borderStyle="solid"
              borderRadius={8}
            />
          </SimpleGrid>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default ProfileScreen;
