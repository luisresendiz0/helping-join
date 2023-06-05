import {
  Alert,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  PinInput,
  PinInputField,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import LoginLayout from "../../components/general/LoginLayout";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { recoverPassword } from "../../services/api/recoverPassword";
import { CheckIcon } from "@chakra-ui/icons";
import { updateVoluntarioPassword } from "../../services/api/updateVountarioPassword";
import { recoverNewPassword } from "../../services/api/recoverNewPassword";
import { useNavigate } from "react-router-dom";

interface Inputs {
  email: string;
  password: string;
  confirmPassword: string;
}

const RecoverPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Inputs>();
  const toast = useToast();
  const navigate = useNavigate();
  const [codeSent, setCodeSent] = useState(false);
  const [realPin, setRealPin] = useState("");
  const [pin, setPin] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [userType, setUserType] = useState("organizacion");
  const [sendingCode, setSendingCode] = useState(false);
  const [recoveringPassword, setRecoveringPassword] = useState(false);

  const handleSendCode = async (data: Inputs) => {
    setSendingCode(true);
    try {
      const res = await recoverPassword(data.email, userType);
      if (res.success) {
        setCodeSent(true);
        setRealPin(res.data.pin);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSendingCode(false);
    }
  };

  const handleValidateCode = (value: string) => {
    if (value === realPin) {
      setIsCodeValid(true);
    }
  };

  const handleResetPassword = async (data: Inputs) => {
    setRecoveringPassword(true);
    try {
      const result = await recoverNewPassword(
        data.email,
        userType,
        data.password
      );
      if (result.success) {
        toast({
          title: "Contraseña actualizada",
          description: "Se ha actualizado la contraseña correctamente",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setRecoveringPassword(false);
    }
  };

  return (
    <LoginLayout>
      <Flex justify="center" align="center" w="full" h="full">
        <Box
          borderWidth={1}
          borderColor="orange"
          borderRadius={8}
          p={8}
          width="100%"
          maxWidth="500px"
        >
          <Heading textAlign="center" mb={8}>
            Recuperar contraseña
          </Heading>
          <FormControl as="fieldset" isRequired mb={4}>
            <FormLabel as="legend">Tipo de usuario</FormLabel>
            <RadioGroup
              value={userType}
              onChange={(nextValue) => setUserType(nextValue)}
            >
              <Stack spacing="24px" direction={["column", "row"]}>
                <Radio value="organizacion">
                  <Tooltip
                    label="Organización de beneficencia sin fines de lucro"
                    aria-label="A tooltip"
                  >
                    Organización
                  </Tooltip>
                </Radio>
                <Radio value="civil">
                  <Tooltip
                    label="Persona interesada en crear eventos de ayuda pero no pertenece a una organización"
                    aria-label="A tooltip"
                  >
                    Independiente
                  </Tooltip>
                </Radio>
                <Radio value="voluntario">
                  <Tooltip
                    label="Persona interesada en brindar su ayuda a traves de eventos"
                    aria-label="A tooltip"
                  >
                    Voluntario
                  </Tooltip>
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <FormControl
            isInvalid={errors.email ? true : false}
            mb={4}
            isRequired
          >
            <FormLabel>Correo electrónico</FormLabel>
            <Input
              type="email"
              {...register("email", { required: "Este campo es requerido" })}
            />
            {errors.email && (
              <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            )}
          </FormControl>
          <HStack>
            <Button
              onClick={handleSubmit(handleSendCode)}
              isLoading={sendingCode}
              isDisabled={codeSent}
            >
              Enviar código
            </Button>
            {codeSent && <CheckIcon color="green.500" />}
          </HStack>
          {codeSent && (
            <Box mt={4}>
              <Text mb={4}>
                Ingrese el código que le enviamos a su correo electrónico
              </Text>
              <HStack>
                <PinInput
                  value={pin}
                  onChange={setPin}
                  onComplete={handleValidateCode}
                  isDisabled={isCodeValid}
                >
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
                {isCodeValid && <CheckIcon color="green.500" />}
              </HStack>
            </Box>
          )}
          {isCodeValid && (
            <Box mt={4}>
              <FormControl
                isInvalid={errors.password ? true : false}
                mb={4}
                isRequired
              >
                <FormLabel>Contraseña</FormLabel>
                <Input
                  type="password"
                  {...register("password", {
                    required: "Este campo es requerido",
                  })}
                />
                {errors.password && (
                  <FormErrorMessage>{errors.password.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                isInvalid={errors.confirmPassword ? true : false}
                mb={4}
                isRequired
              >
                <FormLabel>Confirmar contraseña</FormLabel>
                <Input
                  type="password"
                  {...register("confirmPassword", {
                    required: "Este campo es requerido",
                    validate: {
                      matchesPreviousPassword: (value) => {
                        const { password } = getValues();
                        return (
                          password === value || "Las contraseñas no coinciden"
                        );
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
              <Button
                isLoading={recoveringPassword}
                colorScheme="orange"
                onClick={handleSubmit(handleResetPassword)}
              >
                Restablecer contraseña
              </Button>
            </Box>
          )}
        </Box>
      </Flex>
    </LoginLayout>
  );
};

export default RecoverPassword;
