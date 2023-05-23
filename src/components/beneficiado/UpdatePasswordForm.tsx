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
          title: "Contrasena actualizada",
          description: "La contrasena se actualizo correctamente",
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
        <FormLabel>Contrasena actual</FormLabel>
        <Input
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
        <FormLabel>Nueva contrasena</FormLabel>
        <Input
          type="text"
          {...register("newPassword", {
            required: true,
            // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              message:
                "La contrasena debe tener al menos 8 caracteres, 1 mayuscula, 1 minuscula y 1 numero",
            },
          })}
        />
        {errors.newPassword && (
          <FormErrorMessage>{errors.newPassword.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={errors.repeatNewPassword ? true : false}>
        <FormLabel>Repetir nueva contrasena</FormLabel>
        <Input
          type="text"
          {...register("repeatNewPassword", {
            required: true,
            // Compare with password
            validate: (value) =>
              value === getValues("newPassword") ||
              "Las contrasenas no coinciden",
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
          colorScheme="pink"
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          Actualizar contrasena
        </Button>
      </Box>
    </VStack>
  );
};

export default UpdatePasswordForm;
