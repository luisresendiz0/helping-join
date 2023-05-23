import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { updateModeradorPassword } from "../../services/api/updateModeradorPassword";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

type Inputs = {
  password: string;
  confirmPassword: string;
};

const UpdatePasswordModeradorScreen = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Inputs>();
  const toast = useToast();

  const handleUpdatePassword = async (data: Inputs) => {
    try {
      const result = await updateModeradorPassword({
        id_moderador: parseInt(params.id || "0"),
        contrasena: data.password,
      });

      if (result.success) {
        toast({
          title: "Contraseña actualizada",
          description:
            "La contraseña se actualizó correctamente, inicie sesión con su nueva contraseña",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/singin", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Heading>Actualiza tu contraseña</Heading>

      <Box
        w="50%"
        borderRadius={8}
        borderWidth={1}
        borderColor="pink.200"
        p={8}
        mt={8}
      >
        <VStack spacing={4}>
          <FormControl isRequired isInvalid={errors.password ? true : false}>
            <FormLabel>Nueva contraseña</FormLabel>
            <Input
              placeholder="Nueva contraseña"
              {...register("password", {
                required: "Este campo es requerido",
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                  message:
                    "La contrasena debe tener al menos 1 mayuscula, 1 minuscula y 1 numero",
                },
                // validar que la contrasena sea distinta de "Cambiame1"
                validate: {
                  isNotCambiame1: (value) =>
                    value !== "Cambiame1" ||
                    "La contraseña no puede ser Cambiame1",
                },
              })}
            />
            {errors.password && (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            isRequired
            isInvalid={errors.confirmPassword ? true : false}
          >
            <FormLabel>Confirma la contraseña</FormLabel>
            <Input
              placeholder="Confirma la contraseña"
              {...register("confirmPassword", {
                required: "Este campo es requerido",
                validate: {
                  matchesPreviousPassword: (value) => {
                    const { password } = getValues();
                    return password === value || "Las contrasenas no coinciden";
                  },
                },
              })}
            />
            {errors.confirmPassword && (
              <FormErrorMessage>
                {errors.confirmPassword.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <Flex justifyContent="flex-end" w="full">
            <Button
              colorScheme="pink"
              type="submit"
              onClick={handleSubmit(handleUpdatePassword)}
            >
              Actualizar
            </Button>
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
};

export default UpdatePasswordModeradorScreen;
