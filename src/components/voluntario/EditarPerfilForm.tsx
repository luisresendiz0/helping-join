import { FunctionComponent, PropsWithChildren } from "react";
import Voluntario from "../../types/Voluntario";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { uploadImage } from "../../services/firebase/uploadImage";
import { updateVoluntario } from "../../services/api/updateVoluntario";
import { useQueryClient } from "react-query";

interface EditarPerfilFormProps {
  voluntario: Voluntario;
  onClose: () => void;
}

// voluntarioId,
// imagen,
// email,
// nombre,
// calle,
// numero_exterior,
// numero_interior,
// colonia,
// alcaldia,
// codigo_postal, Voluntario tiene codigo_postsl
// entidad,

interface Inputs {
  imagen: FileList;
  email: string;
  nombre: string;
  calle: string;
  numero_exterior: string;
  numero_interior: string;
  colonia: string;
  alcaldia: string;
  codigo_postal: string;
  entidad: string;
}

const EditarPerfilForm: FunctionComponent<
  PropsWithChildren<EditarPerfilFormProps>
> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const queryClient = useQueryClient();
  const toast = useToast();

  const onSubmit = async (data: Inputs) => {
    try {
      const voluntario: Voluntario = {
        id_voluntario: props.voluntario.id_voluntario,
        ...data,
        edad: props.voluntario.edad,
        codigo_postsl: props.voluntario.codigo_postsl,
        contrasena: props.voluntario.contrasena,
        imagen: props.voluntario.imagen,
        verificado: props.voluntario.verificado,
      };

      if (data.imagen.length > 0) {
        const imagen = data.imagen[0];
        const url = await uploadImage(imagen);
        voluntario.imagen = url;
      }

      await updateVoluntario(voluntario.id_voluntario, voluntario);
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      props.onClose();
      toast({
        title: "Perfil actualizado",
        description: "Tu perfil ha sido actualizado exitosamente",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <VStack spacing={4} mb={4}>
        <FormControl isInvalid={errors.nombre ? true : false}>
          <FormLabel>Nombre completo</FormLabel>
          <Input
            defaultValue={props.voluntario.nombre}
            type="text"
            placeholder="Nombre completo"
            {...register("nombre", {
              required: "Este campo es requerido",
            })}
          />
          {errors.nombre && (
            <FormErrorMessage>{errors.nombre.message}</FormErrorMessage>
          )}
        </FormControl>
        <HStack spacing={4} width="full">
          <FormControl isInvalid={errors.imagen ? true : false}>
            <FormLabel>Cambiar foto de perfil</FormLabel>
            <Input type="file" {...register("imagen")} />
            {errors.imagen && (
              <FormErrorMessage>{errors.imagen.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={errors.email ? true : false}>
            <FormLabel>Correo electrónico</FormLabel>
            <Input
              defaultValue={props.voluntario.email}
              type="email"
              placeholder="Correo electrónico"
              {...register("email", {
                required: "Este campo es requerido",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Correo electrónico inválido",
                },
              })}
            />
            {errors.email && (
              <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            )}
          </FormControl>
        </HStack>
        <HStack spacing={4} width="full">
          <FormControl isInvalid={errors.calle ? true : false}>
            <FormLabel>Calle</FormLabel>
            <Input
              defaultValue={props.voluntario.calle}
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
        </HStack>
        <HStack spacing={4} width="full">
          <FormControl isInvalid={errors.numero_exterior ? true : false}>
            <FormLabel>Número exterior</FormLabel>
            <Input
              defaultValue={props.voluntario.numero_exterior}
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
              defaultValue={
                props.voluntario.numero_interior === null
                  ? ""
                  : props.voluntario.numero_interior === "null"
                  ? ""
                  : props.voluntario.numero_interior
              }
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
              defaultValue={props.voluntario.colonia}
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
              defaultValue={props.voluntario.codigo_postsl}
              type="text"
              placeholder="Código postal"
              {...register("codigo_postal", {
                required: "Este campo es requerido",
              })}
            />
            {errors.codigo_postal && (
              <FormErrorMessage>
                {errors.codigo_postal.message}
              </FormErrorMessage>
            )}
          </FormControl>
        </HStack>
        <HStack spacing={4} width="full">
          <FormControl isInvalid={errors.entidad ? true : false}>
            <FormLabel>Entidad</FormLabel>
            <Input
              defaultValue={props.voluntario.entidad}
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
          <FormControl isInvalid={errors.alcaldia ? true : false}>
            <FormLabel>Municipio / Alcaldia</FormLabel>
            <Input
              defaultValue={props.voluntario.alcaldia}
              type="text"
              placeholder="Municipio"
              {...register("alcaldia", {
                required: "Este campo es requerido",
              })}
            />
            {errors.alcaldia && (
              <FormErrorMessage>{errors.alcaldia.message}</FormErrorMessage>
            )}
          </FormControl>
        </HStack>

        <HStack spacing={4} width="full" justify="flex-end">
          <Button
            colorScheme="pink"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Guardar
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default EditarPerfilForm;
