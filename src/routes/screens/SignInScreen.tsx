import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Progress,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Navigate, Link as RLink, useNavigate } from "react-router-dom";
import LoginLayout from "../../components/general/LoginLayout";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import loadingAtom from "../../atoms/loadingAtom";
import signInVoluntario from "../../services/api/signInVoluntario";
import userAtom from "../../atoms/userAtom";
import tokenAtom from "../../atoms/tokenAtom";
import signInBeneficiado from "../../services/api/signInBeneficiado";
import { useState } from "react";
import Voluntario from "../../types/Voluntario";
import signInModerador from "../../services/api/signInModerador";
import ReCAPTCHA from "react-google-recaptcha";

type Inputs = {
  email: string;
  password: string;
};

const SignInScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useAtom(loadingAtom);
  const setUser = useSetAtom(userAtom);
  const setToken = useSetAtom(tokenAtom);
  const user = useAtomValue(userAtom);
  const [captcha, setCaptcha] = useState(false);
  const toast = useToast();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setFocus,
  } = useForm<Inputs>();

  const onChangeCaptcha = (token: string | null) => {
    setCaptcha(token ? true : false);
  };

  const handleOnSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    if (!captcha) {
      toast({
        title: "Error",
        description: "Es necesario completar el captcha",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    try {
      const signInAsVoluntario = await signInVoluntario(data);

      if (signInAsVoluntario.success) {
        setUser(signInAsVoluntario.data.usuario);
        setToken(signInAsVoluntario.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify(signInAsVoluntario.data.usuario)
        );
        localStorage.setItem("token", signInAsVoluntario.data.token);
        setLoading(false);
        navigate("/recomendaciones");
        return;
      }

      if (signInAsVoluntario.message.includes("Contraseña incorrecta")) {
        setError("password", {
          type: "manual",
          message: "Contraseña incorrecta",
        });
        setFocus("password");
        setLoading(false);
        return;
      }

      if (signInAsVoluntario.message.includes("usuario no existe")) {
        const signInAsBeneficiado = await signInBeneficiado(data);

        if (signInAsBeneficiado.success) {
          setUser(signInAsBeneficiado.data.usuario);
          setToken(signInAsBeneficiado.data.token);

          localStorage.setItem(
            "user",
            JSON.stringify(signInAsBeneficiado.data.usuario)
          );
          localStorage.setItem("token", signInAsBeneficiado.data.token);

          setLoading(false);
          navigate("/perfil-beneficiado");
          return;
        }

        if (signInAsBeneficiado.message.includes("Contraseña incorrecta")) {
          setError("password", {
            type: "manual",
            message: "Contraseña incorrecta",
          });

          setFocus("password");
          setLoading(false);
          return;
        }

        if (signInAsBeneficiado.message.includes("usuario no existe")) {
          const signInAsModerador = await signInModerador(data);

          if (signInAsModerador.success) {
            setUser(signInAsModerador.data.moderador);
            setToken(signInAsModerador.data.token);
            localStorage.setItem(
              "user",
              JSON.stringify(signInAsModerador.data.moderador)
            );
            localStorage.setItem("token", signInAsModerador.data.token);

            setLoading(false);
            navigate("/reportes");
            return;
          }

          if (
            signInAsModerador.message.includes(
              "necesario cambiar la contraseña"
            )
          ) {
            setLoading(false);
            const id = signInAsModerador.message.split(":")[1].trim();
            navigate("/update-moderador-password/" + id, { replace: true });
            return;
          }

          if (signInAsModerador.message.includes("Contraseña incorrecta")) {
            setError("password", {
              type: "manual",
              message: "Contraseña incorrecta",
            });

            setFocus("password");
            setLoading(false);
            return;
          }

          if (signInAsModerador.message.includes("usuario no existe")) {
            setError("email", {
              type: "manual",
              message: "El usuario no existe",
            });

            setFocus("email");
            setLoading(false);
            return;
          }
        }

        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (user) {
    return (
      <Navigate
        to={
          "id_voluntario" in user
            ? "/recomendaciones"
            : "id_beneficiado" in user
            ? "/perfil-beneficiado"
            : "/perfil"
        }
        replace
      />
    );
  }

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
            Iniciar sesión
          </Heading>
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

          <FormControl
            isInvalid={errors.password ? true : false}
            mb={4}
            isRequired
          >
            <FormLabel>Contraseña</FormLabel>
            <InputGroup size="md">
              <Input
                type={show ? "text" : "password"}
                {...register("password", {
                  required: "Este campo es requerido",
                })}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Ocultar" : "Ver"}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors.password && (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
          </FormControl>
          <Flex justify="flex-end">
            <Link as={RLink} color="orange.500" to="/recover-password">
              Olvidé mi contraseña
            </Link>
          </Flex>
          <Box
            my={8}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <ReCAPTCHA
              sitekey="6LfSznYmAAAAAG4LcnJvTmccViY2hPQWp5rD9DLC"
              onChange={onChangeCaptcha}
            />
          </Box>
          <Flex justify="center">
            <Button
              onClick={handleSubmit(handleOnSubmit)}
              colorScheme="orange"
              isLoading={loading}
              loadingText="Iniciando sesion..."
            >
              Iniciar sesión
            </Button>
          </Flex>
          <Text mt={12}>
            Aun no tiene una cuenta?{" "}
            <Link as={RLink} color="orange.500" to="/signup">
              Regístrese
            </Link>
          </Text>
        </Box>
      </Flex>
    </LoginLayout>
  );
};

export default SignInScreen;
