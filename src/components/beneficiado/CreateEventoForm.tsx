import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Tag,
  TagLabel,
  Text,
  Textarea,
  VStack,
  Wrap,
  WrapItem,
  useToast,
} from "@chakra-ui/react";
import { getCategorias } from "../../services/api/getCaegorias";
import { useAtom } from "jotai";
import categoriasAtom from "../../atoms/categoriasAtom";
import {
  useEffect,
  useState,
  FunctionComponent,
  PropsWithChildren,
} from "react";
import { EventoWithCategories } from "../../types/Evento";
import { useForm } from "react-hook-form";
import { uploadImage } from "../../services/firebase/uploadImage";
import { createEvento } from "../../services/api/createEvento";
import { useMutation, useQueryClient } from "react-query";

type Inputs = {
  titulo: string;
  descripcion: string;
  fecha_inicio: string;
  fecha_fin: string;
  calle: string;
  numero_exterior: string;
  numero_interior: string;
  colonia: string;
  alcaldia: string;
  codigo_postal: string;
  entidad: string;
  imagen: FileList | null;
};

interface CreaseEventoFormProps {
  beneficiadoId: number;
  onClose: () => void;
}

const CreateEventoForm: FunctionComponent<
  PropsWithChildren<CreaseEventoFormProps>
> = (props) => {
  const [categorias, setCategorias] = useAtom(categoriasAtom);
  const [catsSelected, setCatsSelected] = useState<number[]>([]);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    reset,
  } = useForm<Inputs>();

  const toggleCatSelected = (id: number) => {
    if (catsSelected.includes(id)) {
      setCatsSelected(catsSelected.filter((cat) => cat !== id));
    } else {
      setCatsSelected([...catsSelected, id]);
    }
  };

  const onSubmit = async (data: Inputs) => {
    if (data.imagen === null) {
      throw new Error("No se ha seleccionado una imagen");
    }

    if (catsSelected.length === 0) {
      toast({
        title: "Error",
        description: "No se ha seleccionado al menos una categoria",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      throw new Error("No se ha seleccionado al menos una categoria");
    }

    try {
      setIsLoading(true);
      const imageUrl = await uploadImage(data.imagen[0]);

      const evento: EventoWithCategories = {
        id_evento: 0,
        id_beneficiado: props.beneficiadoId,
        nombre: data.titulo,
        descripcion: data.descripcion,
        fecha_inicio: data.fecha_inicio,
        fecha_fin: data.fecha_fin,
        calle: data.calle,
        numero_exterior: data.numero_exterior,
        numero_interior: data.numero_interior,
        colonia: data.colonia,
        alcaldia: data.alcaldia,
        codigo_postal: data.codigo_postal,
        entidad: data.entidad,
        imagen: imageUrl,
        categorias: catsSelected,
        interesados: 0,
        interesado: false,
        reportado: false,
      };

      console.log(evento);

      const isSuccess = await createEvento(evento);

      if (isSuccess) {
        console.log("evento creado");
        props.onClose();
        toast({
          title: "Evento creado",
          description: "El evento se ha creado correctamente",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createMutation = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries("eventosBeneficiado");
      reset({
        titulo: "",
        descripcion: "",
        fecha_inicio: "",
        fecha_fin: "",
        calle: "",
        numero_exterior: "",
        numero_interior: "",
        colonia: "",
        alcaldia: "",
        codigo_postal: "",
        entidad: "",
        imagen: null,
      });
      setCatsSelected([]);
    },
  });

  useEffect(() => {
    const fetchCategorias = async () => {
      if (categorias.length > 0) {
        return console.log("categorias ya cargadas");
      }

      try {
        const result = await getCategorias();

        if (result.success) {
          setCategorias(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategorias();
  }, []);

  return (
    <Box>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Título</FormLabel>
          <Input
            isInvalid={errors.titulo ? true : false}
            type="text"
            {...register("titulo", {
              required: true,
            })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Descripcion</FormLabel>
          <Textarea
            isInvalid={errors.descripcion ? true : false}
            placeholder="Agregar una descripción"
            {...register("descripcion", {
              required: true,
            })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Fecha de inicio</FormLabel>
          <Input
            isInvalid={errors.fecha_inicio ? true : false}
            placeholder="Selecciona fecha y hora"
            size="md"
            type="datetime-local"
            {...register("fecha_inicio", {
              required: true,
            })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Fecha de fin</FormLabel>
          <Input
            isInvalid={errors.fecha_fin ? true : false}
            placeholder="Selecciona fecha y hora"
            size="md"
            type="datetime-local"
            {...register("fecha_fin", {
              required: true,
            })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Imagen</FormLabel>
          <Input
            isInvalid={errors.imagen ? true : false}
            type="file"
            {...register("imagen", {
              required: true,
            })}
          />
        </FormControl>
        <Heading size="md">Ubicación</Heading>
        <FormControl>
          <FormLabel>Calle</FormLabel>
          <Input
            isInvalid={errors.calle ? true : false}
            type="text"
            {...register("calle", {
              required: true,
            })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Número exterior</FormLabel>
          <Input
            isInvalid={errors.numero_exterior ? true : false}
            type="text"
            {...register("numero_exterior", {
              required: true,
            })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Número interior</FormLabel>
          <Input
            isInvalid={errors.numero_interior ? true : false}
            type="text"
            {...register("numero_interior")}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Colonia</FormLabel>
          <Input
            isInvalid={errors.colonia ? true : false}
            type="text"
            {...register("colonia", {
              required: true,
            })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Código postal</FormLabel>
          <Input
            isInvalid={errors.codigo_postal ? true : false}
            type="text"
            {...register("codigo_postal", {
              required: true,
            })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Alcaldia</FormLabel>
          <Input
            isInvalid={errors.alcaldia ? true : false}
            type="text"
            {...register("alcaldia", {
              required: true,
            })}
          />
        </FormControl>

        <Heading size="md">Categorias</Heading>
        <Text>Selecciona las categorias que apliquen</Text>
        <SimpleGrid columns={1} spacing={2}>
          {categorias
            .sort((a, b) => {
              var nombreA = a.nombre.toLowerCase();
              var nombreB = b.nombre.toLowerCase();

              if (nombreA < nombreB) {
                return -1;
              }
              if (nombreA > nombreB) {
                return 1;
              }
              return 0;
            })
            .map((categoria, index) => (
              <Tag
                key={categoria.id_categoria}
                size="lg"
                cursor="pointer"
                colorScheme={
                  catsSelected.includes(categoria.id_categoria)
                    ? "pink"
                    : "gray"
                }
                onClick={() => toggleCatSelected(categoria.id_categoria)}
              >
                <TagLabel>{categoria.nombre}</TagLabel>
              </Tag>
            ))}
        </SimpleGrid>
        <Button
          isLoading={isLoading}
          colorScheme="pink"
          onClick={handleSubmit((data) => createMutation.mutate(data))}
        >
          Crear evento
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateEventoForm;
