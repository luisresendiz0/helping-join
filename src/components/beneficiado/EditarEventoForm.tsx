import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import Evento from "../../types/Evento";
import { useForm } from "react-hook-form";
import { Form } from "react-router-dom";
import { updateEventoBeneficiado } from "../../services/api/updateEventoBeneficiado";
import { uploadImage } from "../../services/firebase/uploadImage";

interface Props {
  evento: Evento;
  onClose: () => void;
}

interface Inputs {
  nombre: string;
  descripcion: string;
  fecha_inicio: string;
  fecha_fin: string;
  calle: string;
  numero_exterior: string;
  numero_interior: string;
  colonia: string;
  codigo_postal: string;
  alcaldia: string;
  entidad: string;
  imagen: FileList;
}

const EditarEventoForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    // console.log(data);
    let onEvento = data as unknown as Evento;

    if (data.imagen.length > 0) {
      const url = await uploadImage(data.imagen[0]);
      onEvento.imagen = url;
    }

    const result = await updateEventoBeneficiado({
      ...props.evento,
      ...onEvento,
    });
    console.log(result);

    props.onClose();
  };
  return (
    <Box>
      <FormControl isInvalid={errors.nombre ? true : false}>
        <FormLabel>Nombre de la organización</FormLabel>
        <Input
          defaultValue={props.evento.nombre}
          type="text"
          placeholder="Nombre de la organización"
          {...register("nombre", {
            required: "Este campo es requerido",
          })}
        />
        {errors.nombre && (
          <FormErrorMessage>{errors.nombre.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={errors.descripcion ? true : false}>
        <FormLabel>Descripción</FormLabel>
        <Textarea
          defaultValue={props.evento.descripcion}
          rows={5}
          placeholder="Agregar una descripción"
          {...register("descripcion", {
            required: "Este campo es requerido",
          })}
        />
        {errors.descripcion && (
          <FormErrorMessage>{errors.descripcion.message}</FormErrorMessage>
        )}
      </FormControl>
      <HStack spacing={4} width="full">
        <FormControl isInvalid={errors.fecha_inicio ? true : false}>
          <FormLabel>Fecha de inicio</FormLabel>
          <Input
            defaultValue={props.evento.fecha_inicio.slice(0, -1)}
            type="datetime-local"
            placeholder="Fecha de inicio"
            {...register("fecha_inicio", {
              required: "Este campo es requerido",
            })}
          />
          {errors.fecha_inicio && (
            <FormErrorMessage>{errors.fecha_inicio.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={errors.fecha_fin ? true : false}>
          <FormLabel>Fecha de fin</FormLabel>
          <Input
            defaultValue={props.evento.fecha_fin.slice(0, -1)}
            placeholder="Fecha de fin"
            {...register("fecha_fin", {
              required: "Este campo es requerido",
              validate: {
                validateDatesRange: (value) => {
                  const { fecha_inicio } = getValues();
                  const inicio = new Date(fecha_inicio).getTime();
                  const fin = new Date(value).getTime();
                  console.log(fecha_inicio, inicio, fin);
                  return fin > inicio || "El rango de fecha no es válido";
                },
              },
            })}
            type="datetime-local"
          />
        </FormControl>
      </HStack>
      {errors.fecha_fin && (
        <Text color="red" fontSize="sm">
          {errors.fecha_fin.message}
        </Text>
      )}
      <FormControl isInvalid={errors.calle ? true : false}>
        <FormLabel>Calle</FormLabel>
        <Input
          defaultValue={props.evento.calle}
          type="text"
          placeholder="Calle"
          {...register("calle", {
            required: "Este campo es requerido",
          })}
        />
        {errors.calle && (
          <FormErrorMessage>{errors.calle.message}</FormErrorMessage>
        )}
      </FormControl>
      <HStack spacing={4} width="full">
        <FormControl isInvalid={errors.numero_exterior ? true : false}>
          <FormLabel>Número exterior</FormLabel>
          <Input
            defaultValue={props.evento.numero_exterior}
            type="text"
            placeholder="Número exterior"
            {...register("numero_exterior", {
              required: "Este campo es requerido",
            })}
          />
          {errors.numero_exterior && (
            <FormErrorMessage>
              {errors.numero_exterior.message}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={errors.numero_interior ? true : false}>
          <FormLabel>Número interior</FormLabel>
          <Input
            defaultValue={props.evento.numero_interior}
            type="text"
            placeholder="Número interior"
            {...register("numero_interior")}
          />
          {errors.numero_interior && (
            <FormErrorMessage>
              {errors.numero_interior.message}
            </FormErrorMessage>
          )}
        </FormControl>
      </HStack>
      <HStack spacing={4} width="full">
        <FormControl isInvalid={errors.colonia ? true : false}>
          <FormLabel>Colonia</FormLabel>
          <Input
            defaultValue={props.evento.colonia}
            type="text"
            placeholder="Colonia"
            {...register("colonia", {
              required: "Este campo es requerido",
            })}
          />
          {errors.colonia && (
            <FormErrorMessage>{errors.colonia.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={errors.codigo_postal ? true : false}>
          <FormLabel>Código postal</FormLabel>
          <Input
            defaultValue={props.evento.codigo_postal}
            type="text"
            placeholder="Codigo postal"
            {...register("codigo_postal", {
              required: "Este campo es requerido",
            })}
          />
          {errors.codigo_postal && (
            <FormErrorMessage>{errors.codigo_postal.message}</FormErrorMessage>
          )}
        </FormControl>
      </HStack>

      <HStack spacing={4} width="full">
        <FormControl isInvalid={errors.alcaldia ? true : false}>
          <FormLabel>Alcaldia</FormLabel>
          <Input
            defaultValue={props.evento.alcaldia}
            type="text"
            placeholder="Alcaldia"
            {...register("alcaldia", {
              required: "Este campo es requerido",
            })}
          />
          {errors.alcaldia && (
            <FormErrorMessage>{errors.alcaldia.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={errors.entidad ? true : false}>
          <FormLabel>Entidad</FormLabel>
          <Input
            defaultValue={props.evento.entidad}
            type="text"
            placeholder="Entidad"
            {...register("entidad", {
              required: "Este campo es requerido",
            })}
          />
          {errors.entidad && (
            <FormErrorMessage>{errors.entidad.message}</FormErrorMessage>
          )}
        </FormControl>
      </HStack>
      <FormControl isInvalid={errors.imagen ? true : false}>
        <FormLabel>Imagen</FormLabel>
        <Input type="file" placeholder="Imagen" {...register("imagen")} />
        {errors.imagen && (
          <FormErrorMessage>{errors.imagen.message}</FormErrorMessage>
        )}
      </FormControl>
      <Box justifyContent="center" alignItems="center" p={2} marginTop={4}>
        <Button
          colorScheme="orange"
          onClick={handleSubmit(onSubmit)}
          type="submit"
        >
          Guardar
        </Button>
      </Box>
    </Box>
  );
};

export default EditarEventoForm;
