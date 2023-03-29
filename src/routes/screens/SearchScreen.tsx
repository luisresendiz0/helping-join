import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  SimpleGrid,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

const SearchScreen = () => {
  const [search, setSearch] = useState("");

  return (
    <Grid
      w="100%"
      h="100%"
      templateRows="repeat(11, 1fr)"
      templateColumns="repeat(10, 1fr)"
    >
      <GridItem rowSpan={11} colSpan={8} p={8} overflowY="scroll">
        <FormControl mb={8}>
          <Input
            size="lg"
            variant="filled"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Busca por evento, organización, ciudad, etc."
          />
        </FormControl>
        <Box mb={8}>
          <Select placeholder="Ordenar por..." w={200}>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
            <option value="option4">Option 4</option>
            <option value="option5">Option 5</option>
            <option value="option6">Option 6</option>
          </Select>
        </Box>
        <SimpleGrid columns={3} spacing={10} w="full">
          <Box
            w="100%"
            h="200px"
            borderColor="gray.300"
            borderWidth={1}
            borderStyle="solid"
            borderRadius={8}
          />
          <Box
            w="100%"
            h="200px"
            borderColor="gray.300"
            borderWidth={1}
            borderStyle="solid"
            borderRadius={8}
          />
          <Box
            w="100%"
            h="200px"
            borderColor="gray.300"
            borderWidth={1}
            borderStyle="solid"
            borderRadius={8}
          />
          <Box
            w="100%"
            h="200px"
            borderColor="gray.300"
            borderWidth={1}
            borderStyle="solid"
            borderRadius={8}
          />
          <Box
            w="100%"
            h="200px"
            borderColor="gray.300"
            borderWidth={1}
            borderStyle="solid"
            borderRadius={8}
          />
          <Box
            w="100%"
            h="200px"
            borderColor="gray.300"
            borderWidth={1}
            borderStyle="solid"
            borderRadius={8}
          />
          <Box
            w="100%"
            h="200px"
            borderColor="gray.300"
            borderWidth={1}
            borderStyle="solid"
            borderRadius={8}
          />
          <Box
            w="100%"
            h="200px"
            borderColor="gray.300"
            borderWidth={1}
            borderStyle="solid"
            borderRadius={8}
          />
          <Box
            w="100%"
            h="200px"
            borderColor="gray.300"
            borderWidth={1}
            borderStyle="solid"
            borderRadius={8}
          />
          <Box
            w="100%"
            h="200px"
            borderColor="gray.300"
            borderWidth={1}
            borderStyle="solid"
            borderRadius={8}
          />
          <Box
            w="100%"
            h="200px"
            borderColor="gray.300"
            borderWidth={1}
            borderStyle="solid"
            borderRadius={8}
          />
          <Box
            w="100%"
            h="200px"
            borderColor="gray.300"
            borderWidth={1}
            borderStyle="solid"
            borderRadius={8}
          />
        </SimpleGrid>
      </GridItem>
      <GridItem
        rowSpan={11}
        colSpan={2}
        borderLeft="1px solid"
        borderColor="gray.300"
        p={4}
      >
        <Heading mb={8} size="md">
          Filtros
        </Heading>
        <VStack
          spacing={8}
          align="start"
          divider={<StackDivider borderColor="gray.200" />}
        >
          <VStack spacing={4} align="flex-start">
            <Checkbox defaultChecked>Eventos</Checkbox>
            <Checkbox>Organizaciones</Checkbox>
            <Checkbox>Civiles independientes</Checkbox>
          </VStack>
          <Select placeholder="Categoria">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
            <option value="option4">Option 4</option>
            <option value="option5">Option 5</option>
            <option value="option6">Option 6</option>
          </Select>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Fecha de inicio</FormLabel>
              <Input
                placeholder="Fecha de inicio"
                size="md"
                type="datetime-local"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Fecha de fin</FormLabel>
              <Input
                placeholder="Fecha de fin"
                size="md"
                type="datetime-local"
              />
            </FormControl>
          </VStack>
          <Select placeholder="Alcaldia">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
            <option value="option4">Option 4</option>
            <option value="option5">Option 5</option>
            <option value="option6">Option 6</option>
          </Select>
        </VStack>
      </GridItem>
    </Grid>
  );
};

export default SearchScreen;
