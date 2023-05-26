import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
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
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
  StackDivider,
  Tag,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { searchEvents } from "../../services/api/search";
import { Controller, useForm } from "react-hook-form";
import { getCategorias } from "../../services/api/getCaegorias";
import Categoria from "../../types/Categoria";
import estados from "../../utils/estados.json";
import { format } from "date-fns";
import EventoItem from "../../components/eventos/EventoItem";
import { useNavigate } from "react-router-dom";
import Beneficiado from "../../types/Beneficiado";
import Evento from "../../types/Evento";
import isBeneficiadoArray from "../../utils/isBeneficiadoArray";

interface Inputs {
  text: string;
  type: string;
  category: string;
  fecha_inicio: string;
  fecha_fin: string;
  alcaldia: string;
}

const SearchScreen = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [resultados, setResultados] = useState<Evento[] | Beneficiado[]>([]);

  const navigate = useNavigate();

  const { register, handleSubmit, control, watch } = useForm<Inputs>();
  const category = watch("category");
  const fechaInicio = watch("fecha_inicio");
  const fechaFin = watch("fecha_fin");
  const alcaldia = watch("alcaldia");

  const categoriesQuery = useQuery(["categories"], async () => {
    const result = await getCategorias();
    return result.data as Categoria[];
  });

  const onSubmit = async (data: Inputs) => {
    console.log(data);
    try {
      setIsFetching(true);
      const eventos = await searchEvents({
        ...data,
        entidad: "Ciudad de Mexico",
      } as any);
      console.log(eventos);
      setResultados(eventos);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  const filterBeneficiados = (array: any[]) => {
    const beneficiados = [...array] as Beneficiado[];

    return beneficiados.filter((beneficiado) => {
      // if (category.length > 0 && beneficiado.categories.includes(category)) {
      //   return true;
      // }

      if (alcaldia.length > 0 && beneficiado.alcaldia === alcaldia) {
        return true;
      }

      return false;
    });
  };

  const filterEventos = (array: any[]) => {
    console.log(category, alcaldia, fechaInicio, fechaFin);
    interface EventoWithCategorias extends Evento {
      categorias: string;
    }

    const eventos = [...array] as EventoWithCategorias[];

    return eventos.filter((evento) => {
      const ok: boolean[] = [];
      if (
        category.length === 0 ||
        evento.categorias
          .split(", ")
          .map((c) => c.split(":")[1])
          .includes(category)
      ) {
        ok.push(true);
      }

      if (alcaldia.length === 0 || evento.alcaldia === alcaldia) {
        ok.push(true);
      }

      if (fechaInicio && fechaFin) {
        const fechaInicioDate = new Date(fechaInicio);
        const fechaFinDate = new Date(fechaFin);
        const fechaEventoDate = new Date(evento.fecha_inicio);

        if (
          fechaEventoDate.getTime() >= fechaInicioDate.getTime() &&
          fechaEventoDate.getTime() <= fechaFinDate.getTime()
        ) {
          ok.push(true);
        }
      }

      return ok.length >= 2;
    }) as Evento[];
  };

  return (
    <Grid
      w="100%"
      h="100%"
      templateRows="repeat(11, 1fr)"
      templateColumns="repeat(10, 1fr)"
    >
      <GridItem rowSpan={11} colSpan={7} p={8} overflowY="scroll">
        <Box mb={8} display="flex" alignItems="center">
          <FormControl mr={4}>
            <Input
              size="lg"
              type="text"
              {...register("text")}
              placeholder="Busca por nombre de evento, organización, ciudad, etc."
            />
          </FormControl>
          <Button colorScheme="pink" size="lg" onClick={handleSubmit(onSubmit)}>
            Buscar
          </Button>
        </Box>

        <Box mb={8} display="flex" alignItems="center">
          <Select placeholder="Ordenar por..." w={200} mr={4}>
            <option value="option1">Nombre</option>
            <option value="option2">Fecha de inicio</option>
          </Select>
          {isFetching && (
            <CircularProgress isIndeterminate color="pink.500" size="25px" />
          )}
        </Box>

        {resultados ? (
          <SimpleGrid columns={3} spacing={10} w="full">
            {isBeneficiadoArray(resultados)
              ? filterBeneficiados(resultados).map((beneficiado, i) => {
                  return <Text key={i}>{beneficiado.nombre}</Text>;
                })
              : filterEventos(resultados).map((item, i) => {
                  const evento = item as Evento;
                  return (
                    <EventoItem
                      key={i}
                      evento={evento}
                      onClick={() => navigate(`/eventos/${evento.id_evento}`)}
                    />
                  );
                })}
          </SimpleGrid>
        ) : null}
      </GridItem>
      <GridItem
        rowSpan={11}
        colSpan={3}
        borderLeft="1px solid"
        borderColor="pink.300"
        p={4}
      >
        <Heading mb={8} size="md">
          Filtros
        </Heading>
        <VStack
          spacing={8}
          align="start"
          divider={<StackDivider borderColor="pink.200" />}
        >
          <Controller
            name="type"
            control={control}
            render={({ field: { onChange, value } }) => (
              <RadioGroup value={value} onChange={onChange}>
                <Stack direction="column">
                  <Radio value="evento">Eventos</Radio>
                  <Radio value="organizacion">Organizaciones</Radio>
                  <Radio value="civil">Civiles independientes</Radio>
                </Stack>
              </RadioGroup>
            )}
          />

          <FormControl>
            <FormLabel>Categoria</FormLabel>
            <Select placeholder="Categoria" {...register("category")}>
              {categoriesQuery.data?.map((category) => (
                <option key={category.id_categoria} value={category.nombre}>
                  {category.nombre}
                </option>
              ))}
            </Select>
          </FormControl>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Fecha de inicio</FormLabel>
              <Input
                defaultValue={new Date().toISOString().slice(0, -5)}
                {...register("fecha_inicio")}
                placeholder="Fecha de inicio"
                size="md"
                type="datetime-local"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Fecha de fin</FormLabel>
              <Input
                defaultValue={new Date(new Date().getTime() + 36000 * 20000)
                  .toISOString()
                  .slice(0, -5)}
                {...register("fecha_fin")}
                placeholder="Fecha de fin"
                size="md"
                type="datetime-local"
              />
            </FormControl>
          </VStack>
          <FormControl>
            <FormLabel>Alcaldia</FormLabel>
            <Select placeholder="Alcaldia" {...register("alcaldia")}>
              {estados["Ciudad de Mexico"].map((alcaldia) => (
                <option key={alcaldia} value={alcaldia}>
                  {alcaldia}
                </option>
              ))}
            </Select>
          </FormControl>
        </VStack>
      </GridItem>
    </Grid>
  );
};

export default SearchScreen;
