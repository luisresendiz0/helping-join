import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FunctionComponent, PropsWithChildren, useState } from "react";
import Beneficiado from "../../types/Beneficiado";
import { updateBeneficiado } from "../../services/api/updateBeneficiado";
import { uploadImage } from "../../services/firebase/uploadImage";
import { useSetAtom } from "jotai";
import userAtom from "../../atoms/userAtom";

interface Inputs {
  imagen: FileList;
  email: string;
  descripcion: string;
  calle: string;
  numero_exterior: string;
  numero_interior: string;
  colonia: string;
  codigo_postal: string;
  entidad: string;
  alcaldia: string;
  telefono: string;
  facebook: string;
  instagram: string;
  twitter: string;
  nombre: string;
}

interface EditarPerfilFormProps {
  beneficiado: Beneficiado;
  onClose: () => void;
}

const EditarPerfilForm: FunctionComponent<
  PropsWithChildren<EditarPerfilFormProps>
> = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>();
  const setUser = useSetAtom(userAtom);

  const onSubmit = async (data: Inputs) => {
    console.log(data);
    try {
      let info: unknown = { ...data };
      let beneficiado: Beneficiado = info as Beneficiado;

      if (data.imagen.length > 0) {
        const imagen = data.imagen[0];
        const url = await uploadImage(imagen);
        beneficiado.imagen = url;
      }

      const result = await updateBeneficiado(
        props.beneficiado.id_beneficiado,
        beneficiado
      );

      if (result && result.data) {
        setUser(result.data);
        localStorage.setItem("user", JSON.stringify(result.data));
        props.onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <VStack spacing={4} mb={4}>
        <FormControl isInvalid={errors.nombre ? true : false}>
          <FormLabel>Nombre de la organizacion</FormLabel>
          <Input
            defaultValue={props.beneficiado.nombre}
            type="text"
            placeholder="Nombre de la organizacion"
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
              defaultValue={props.beneficiado.email}
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
        <FormControl isInvalid={errors.descripcion ? true : false}>
          <FormLabel>Descripción</FormLabel>
          <Textarea
            defaultValue={props.beneficiado.descripcion}
            placeholder="Descripción"
            {...register("descripcion", {
              required: "Este campo es requerido",
            })}
          />
          {errors.descripcion && (
            <FormErrorMessage>{errors.descripcion.message}</FormErrorMessage>
          )}
        </FormControl>
        <HStack spacing={4} width="full">
          <FormControl isInvalid={errors.telefono ? true : false}>
            <FormLabel>Teléfono</FormLabel>
            <Input
              defaultValue={props.beneficiado.telefono}
              type="text"
              placeholder="Teléfono"
              {...register("telefono", {
                required: "Este campo es requerido",
              })}
            />
            {errors.telefono && (
              <FormErrorMessage>{errors.telefono.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={errors.calle ? true : false}>
            <FormLabel>Calle</FormLabel>
            <Input
              defaultValue={props.beneficiado.calle}
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
              defaultValue={props.beneficiado.numero_exterior}
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
              defaultValue={props.beneficiado.numero_interior}
              type="text"
              placeholder="Número interior"
              {...register("numero_interior", {
                required: "Este campo es requerido",
              })}
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
              defaultValue={props.beneficiado.colonia}
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
              defaultValue={props.beneficiado.codigo_postal}
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
              defaultValue={props.beneficiado.entidad}
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
              defaultValue={props.beneficiado.alcaldia}
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

        <HStack spacing={4} width="full">
          <FormControl isInvalid={errors.facebook ? true : false}>
            <FormLabel>Facebook</FormLabel>
            <Input
              type="text"
              placeholder="Facebook"
              {...register("facebook", {
                required: "Este campo es requerido",
              })}
            />
            {errors.facebook && (
              <FormErrorMessage>{errors.facebook.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={errors.instagram ? true : false}>
            <FormLabel>Instagram</FormLabel>
            <Input
              type="text"
              placeholder="Instagram"
              {...register("instagram", {
                required: "Este campo es requerido",
              })}
            />
            {errors.instagram && (
              <FormErrorMessage>{errors.instagram.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={errors.twitter ? true : false}>
            <FormLabel>Twitter</FormLabel>
            <Input
              type="text"
              placeholder="Twitter"
              {...register("twitter", {
                required: "Este campo es requerido",
              })}
            />
            {errors.twitter && (
              <FormErrorMessage>{errors.twitter.message}</FormErrorMessage>
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
