import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FunctionComponent, PropsWithChildren } from "react";
import { updateBeneficiadoPassword } from "../../services/api/updateBeneficiadoPassword";
import PasswordInput from "../general/PasswordInput";

type Inputs = {
  password: string;
  newPassword: string;
  repeatNewPassword: string;
};

interface UpdatePasswordFormProps {
  beneficiadoId: number;
  onClose: () => void;
}

const UpdatePasswordForm: FunctionComponent<
  PropsWithChildren<UpdatePasswordFormProps>
> = (props) => {
  const toast = useToast();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    getValues,
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    try {
      const result = await updateBeneficiadoPassword(
        `${props.beneficiadoId}`,
        data.password,
        data.newPassword
      );

      if (result.success) {
        props.onClose();
        toast({
          title: "Contraseña actualizada",
          description: "La contraseña se actualizó correctamente",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        setError("password", { type: "custom", message: result.message });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <VStack spacing={4} mb={4}>
      <FormControl isInvalid={errors.password ? true : false}>
        <FormLabel>Contraseña actual</FormLabel>
        <Input
          placeholder="Contraseña actual"
          type="text"
          {...register("password", {
            required: true,
          })}
        />
        {errors.password && (
          <FormErrorMessage>{errors.password.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={errors.newPassword ? true : false}>
        <FormLabel>Nueva contraseña</FormLabel>
        <PasswordInput
          placeholder="Nueva contraseña"
          register={register("newPassword", {
            required: true,
            // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
              message:
                "La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula y 1 número",
            },
          })}
        />
        {errors.newPassword && (
          <FormErrorMessage>{errors.newPassword.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={errors.repeatNewPassword ? true : false}>
        <FormLabel>Repetir nueva contraseña</FormLabel>
        <PasswordInput
          placeholder="Repetir nueva contraseña"
          register={register("repeatNewPassword", {
            required: true,
            // Compare with password
            validate: (value) =>
              value === getValues("newPassword") ||
              "Las contraseñas no coinciden",
          })}
        />
        {errors.repeatNewPassword && (
          <FormErrorMessage>
            {errors.repeatNewPassword.message}
          </FormErrorMessage>
        )}
      </FormControl>
      <Box
        display="flex"
        justifyContent="flex-end"
        width="100%"
        marginTop="1rem"
      >
        <Button
          colorScheme="orange"
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          Actualizar contraseña
        </Button>
      </Box>
    </VStack>
  );
};

export default UpdatePasswordForm;
