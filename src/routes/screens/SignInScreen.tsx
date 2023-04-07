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
  Link,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as RLink, useNavigate } from "react-router-dom";
import LoginLayout from "../../components/general/LoginLayout";

const SignInScreen = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{
    type: "email" | "password";
    message: string;
  } | null>(null);

  const handleOnPressSignIn = () => {
    navigate("/recomendaciones");
  };

  return (
    <LoginLayout>
      <Flex justify="center" align="center" w="full" h="full">
        <Box>
          <Heading textAlign="center" mb={8}>
            Iniciar sesión
          </Heading>
          <FormControl isInvalid={error?.type === "email"} mb={4} isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              variant="filled"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error?.type === "email" ? (
              <FormErrorMessage>{error.message}</FormErrorMessage>
            ) : (
              <FormHelperText>
                Se enviará un correo de verificación a esta dirección.
              </FormHelperText>
            )}
          </FormControl>

          <FormControl isInvalid={error?.type === "password"} mb={8} isRequired>
            <FormLabel>Contraseña</FormLabel>
            <Input
              variant="filled"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error?.type === "password" ? (
              <FormErrorMessage>{error.message}</FormErrorMessage>
            ) : (
              <FormHelperText>
                Debe tener al menos 8 caracteres, una mayúscula, una minúscula y
                un número.
              </FormHelperText>
            )}
          </FormControl>
          <Flex justify="center">
            <Button onClick={handleOnPressSignIn} colorScheme="blue">
              Iniciar sesión
            </Button>
          </Flex>
          <Text mt={4}>
            Aun no tiene una cuenta?{' '}
            <Link color='blue.500' href='#'>
              <RLink to="/signup">Regístrese</RLink>
            </Link>
          </Text>
        </Box>
      </Flex>
    </LoginLayout>
  );
};

export default SignInScreen;
