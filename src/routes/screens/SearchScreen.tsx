import { ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";
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
  Image,
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
import { useMutation, useQuery, useQueryClient } from "react-query";
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
import CivilItem from "../../components/eventos/CivilItem";
import { debounce } from "lodash";

interface Inputs {
  category: string;
  fecha_inicio: string;
  fecha_fin: string;
  alcaldia: string;
}

type OrderType = "nombre" | "fecha_inicio";

const SearchScreen = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [orderType, setOrderType] = useState<OrderType>("nombre");

  const [text, setText] = useState("");

  const debouncedText = debounce((value) => {
    setText(value);
  }, 500);

  const [areEventos, setAreEventos] = useState(true);
  const [areOrganizaciones, setAreOrganizaciones] = useState(true);
  const [areCiviles, setAreCiviles] = useState(true);

  const navigate = useNavigate();

  const { register, watch } = useForm<Inputs>();
  const category = watch("category");
  const fechaInicio = watch("fecha_inicio");
  const fechaFin = watch("fecha_fin");
  const alcaldia = watch("alcaldia");

  const queryClient = useQueryClient();

  const categoriesQuery = useQuery(["categories"], async () => {
    const result = await getCategorias();
    return result.data as Categoria[];
  });

  const searchQuery = useQuery({
    queryKey: ["search", areEventos, areOrganizaciones, areCiviles, text],
    queryFn: async () => {
      let type = "";
      if (areEventos) type += "eventos,";
      if (areOrganizaciones) type += "organizaciones,";
      if (areCiviles) type += "civiles";
      const result = await searchEvents(text, type);
      return result;
    },
  });

  const onSubmit = async () => {
    queryClient.invalidateQueries({ queryKey: ["search"] });
  };

  const filterBeneficiados = (beneficiados: Beneficiado[]) => {
    interface BeneficiadoWithCategorias extends Beneficiado {
      categorias: string;
    }
    const bwc = [...beneficiados] as BeneficiadoWithCategorias[];

    return bwc
      .filter((beneficiado) => {
        let ok = 0;

        if (
          category.length === 0 ||
          (category.length > 0 && beneficiado.categorias.includes(category))
        ) {
          ok += 1;
        }

        if (
          alcaldia.length === 0 ||
          (alcaldia.length > 0 && beneficiado.alcaldia === alcaldia)
        ) {
          ok += 1;
        }

        return ok === 2;
      })
      .sort((a, b) => {
        if (orderType === "nombre") {
          return a.nombre.localeCompare(b.nombre);
        } else {
          return 0;
        }
      })
      .slice(0, 9);
  };

  const filterEventos = (array: any[]) => {
    interface EventoWithCategorias extends Evento {
      categorias: string;
    }

    const eventos = [...array] as EventoWithCategorias[];

    return eventos
      .filter((evento) => {
        const ok: boolean[] = [];
        if (
          category.length === 0 ||
          evento.categorias.split(", ").includes(category)
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

        return ok.length > 2;
      })
      .sort((a, b) => {
        if (orderType === "nombre") {
          return a.nombre.localeCompare(b.nombre);
        } else {
          return (
            new Date(a.fecha_inicio).getTime() -
            new Date(b.fecha_inicio).getTime()
          );
        }
      })
      .slice(0, 9) as Evento[];
  };

  // poner aqui los eventos, organizaciones y civiles filtrados para no repetir en el return, validar solo 9 como maximo
  const eventosFiltrados = filterEventos(searchQuery.data?.eventos || []);
  const organizacionesFiltradas = filterBeneficiados(
    searchQuery.data?.organizaciones || []
  );
  const civilesFiltrados = filterBeneficiados(searchQuery.data?.civiles || []);

  return (
    <Grid
      flex={1}
      h="full"
      templateRows="repeat(11, 1fr)"
      templateColumns="repeat(10, 1fr)"
    >
      <GridItem rowSpan={11} colSpan={[10, 7]} p={8} overflowY="scroll">
        <Box
          backgroundColor="white"
          p={4}
          borderColor="orange.300"
          borderWidth={1}
          borderRadius={8}
          mb={8}
        >
          <Box mb={8} display="flex" alignItems="center">
            <FormControl>
              <Input
                size="lg"
                type="text"
                onChange={(e) => debouncedText(e.target.value)}
                placeholder="Busca por nombre de evento, organización, descripcion, etc."
              />
            </FormControl>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <Box>
                <Text fontSize="sm">Ordenar por</Text>
                <Select
                  placeholder="Ordenar por..."
                  w={200}
                  mr={4}
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value as OrderType)}
                >
                  <option value="nombre">Nombre</option>
                  <option value="fecha_inicio">Fecha de inicio</option>
                </Select>
              </Box>
              {searchQuery.isLoading && (
                <CircularProgress
                  isIndeterminate
                  color="orange.500"
                  size="25px"
                />
              )}
            </Box>
            <Button
              display={["block", "none"]}
              onClick={() => setShowFilters((prev) => !prev)}
            >
              Filtros
            </Button>
          </Box>
        </Box>
        {eventosFiltrados.length === 0 &&
          organizacionesFiltradas.length === 0 &&
          civilesFiltrados.length === 0 && (
            <Box>
              <Box display="flex" justifyContent="center">
                <Image src="/empty.png" w={["80%", "40%"]} />
              </Box>
              <Text textAlign="center">
                Lo siento, no se han encontrado resultados sobre esa búsqueda en
                particular.
              </Text>
            </Box>
          )}
        {eventosFiltrados.length ? (
          <Box mb={8}>
            <Heading size="lg" mb={4}>
              Eventos
            </Heading>
            <SimpleGrid spacing={4} columns={[1, 3]}>
              {eventosFiltrados.map((e) => (
                <EventoItem
                  key={e.id_evento}
                  evento={e}
                  onClick={() => navigate("/eventos/" + e.id_evento)}
                />
              ))}
            </SimpleGrid>
          </Box>
        ) : null}
        {organizacionesFiltradas.length ? (
          <Box mb={8}>
            <Heading size="lg" mb={4}>
              Organizaciones
            </Heading>
            <SimpleGrid spacing={4} columns={[1, 3]}>
              {organizacionesFiltradas.map((o) => (
                <CivilItem
                  key={o.id_beneficiado}
                  beneficiado={o}
                  onClick={() =>
                    navigate(
                      "/perfil-beneficiado-by-voluntario/" + o.id_beneficiado
                    )
                  }
                />
              ))}
            </SimpleGrid>
          </Box>
        ) : null}
        {civilesFiltrados.length ? (
          <Box mb={8}>
            <Heading size="lg" mb={4}>
              Civiles independientes
            </Heading>
            <SimpleGrid spacing={4} columns={[1, 3]}>
              {civilesFiltrados.map((o) => (
                <CivilItem
                  key={o.id_beneficiado}
                  beneficiado={o}
                  onClick={() =>
                    navigate(
                      "/perfil-beneficiado-by-voluntario/" + o.id_beneficiado
                    )
                  }
                />
              ))}
            </SimpleGrid>
          </Box>
        ) : null}
      </GridItem>
      <GridItem
        rowSpan={11}
        colSpan={[10, 3]}
        borderLeftWidth={[0, 1]}
        borderLeftColor={["transparent", "orange.300"]}
        p={4}
        position={["absolute", "relative"]}
        top={0}
        left={0}
        w={["100%", "auto"]}
        minH="full"
        display={[showFilters ? "block" : "none", "block"]}
        backgroundColor="white"
      >
        <Box
          onClick={() => setShowFilters(false)}
          p={4}
          display={["block", "none"]}
        >
          <CloseIcon />
        </Box>
        <Heading mb={8} size="md">
          Filtros
        </Heading>
        <VStack
          spacing={8}
          align="start"
          divider={<StackDivider borderColor="orange.200" />}
        >
          <VStack spacing={4} align="start">
            <Checkbox
              colorScheme="orange"
              isChecked={areEventos}
              onChange={() => setAreEventos((prev) => !prev)}
            >
              Eventos
            </Checkbox>
            <Checkbox
              colorScheme="orange"
              isChecked={areOrganizaciones}
              onChange={() => setAreOrganizaciones((prev) => !prev)}
            >
              Organizaciones
            </Checkbox>
            <Checkbox
              colorScheme="orange"
              isChecked={areCiviles}
              onChange={() => setAreCiviles((prev) => !prev)}
            >
              Civiles independientes
            </Checkbox>
          </VStack>

          <FormControl>
            <FormLabel>Categoria</FormLabel>
            <Select
              placeholder="Todas las categorias"
              {...register("category")}
            >
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
            <Select placeholder="Todas las alcaldias" {...register("alcaldia")}>
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
