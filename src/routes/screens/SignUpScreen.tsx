import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Input,
  Link,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Tag,
  TagLabel,
  Text,
  Tooltip,
  VStack,
  Wrap,
  WrapItem,
  useToast,
} from "@chakra-ui/react";
import LoginLayout from "../../components/general/LoginLayout";
import {
  FunctionComponent,
  PropsWithChildren,
  useState,
  useEffect,
} from "react";
import { Navigate, Link as RLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import categoriasAtom from "../../atoms/categoriasAtom";
import { getCategorias } from "../../services/api/getCaegorias";
import loadingAtom from "../../atoms/loadingAtom";
import estados from "../../utils/estados.json";
import preguntas from "../../utils/preguntas.json";
import { signUpVoluntario } from "../../services/api/signUpVoluntario";
import { VoluntarioWithCategories } from "../../types/Voluntario";
import { BeneficiadoWithCategories } from "../../types/Beneficiado";
import { signUpBeneficiado } from "../../services/api/signUpBeneficiado";
import userAtom from "../../atoms/userAtom";
import tokenAtom from "../../atoms/tokenAtom";

const Card: FunctionComponent<PropsWithChildren> = (props) => {
  return (
    <Flex
      w="100%"
      maxW="450px"
      border="1px solid"
      borderColor="orange.300"
      borderRadius={8}
      padding="8"
      justify="space-between"
      flexDirection="column"
      backgroundColor="white"
    >
      {props.children}
    </Flex>
  );
};

type Inputs = {
  fullname: string;
  responsable: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  calle: string;
  numero_exterior: string;
  numero_interior: string;
  colonia: string;
  codigo_postal: string;
  entidad: string;
  alcaldia: string;
  telefono: string;
};

const SignUpScreen = () => {
  const [step, setStep] = useState(0);
  const toast = useToast();
  const user = useAtomValue(userAtom);
  const setUser = useSetAtom(userAtom);
  const setToken = useSetAtom(tokenAtom);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm<Inputs>();

  const [categorias, setCategorias] = useAtom(categoriasAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [userType, setUserType] = useState("organizacion");
  const [beneficiadoCategorias, setBeneficiadoCategorias] = useState<
    Array<number>
  >([]);
  const [voluntarioCategorias, setVoluntarioCategorias] = useState<
    Array<string>
  >([]);

  const isOrganizacion = userType === "organizacion";
  const isCivil = userType === "civil";
  const watchEntidad = watch("entidad");

  const toggleBeneficiadoCategoria = (id_categoria: number) => {
    setBeneficiadoCategorias((prevState) => {
      const newState = [...prevState];
      const index = newState.indexOf(id_categoria);
      if (index > -1) {
        newState.splice(index, 1);
      } else {
        newState.push(id_categoria);
      }
      return newState;
    });
  };

  const toggleVoluntarioCategoria = (id_categoria: string) => {
    setVoluntarioCategorias((prevState) => {
      const newState = [...prevState];
      const index = newState.indexOf(id_categoria);
      if (index > -1) {
        newState.splice(index, 1);
      } else {
        newState.push(id_categoria);
      }
      return newState;
    });
  };

  const onSubmit = async (data: Inputs) => {
    console.log(data);
    console.log(userType);
    console.log(beneficiadoCategorias);
    console.log(voluntarioCategorias);

    try {
      setLoading(true);
      if (userType === "voluntario") {
        if (voluntarioCategorias.length === 0) {
          toast({
            title: "Error",
            description: "Selecciona al menos una categoria",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          return;
        }
        const cats = voluntarioCategorias
          .map((vcat) => {
            return parseInt(vcat.split("-")[0]);
          })
          .reduce((acc, curr) => {
            if (acc.indexOf(curr) === -1) {
              acc.push(curr);
            }
            return acc;
          }, [] as number[]);

        const voluntario: VoluntarioWithCategories = {
          id_voluntario: 0,
          nombre: data.fullname,
          edad: "2023-05-07 12:00",
          email: data.email,
          calle: data.calle,
          numero_exterior: data.numero_exterior,
          numero_interior: data.numero_interior,
          colonia: data.colonia,
          alcaldia: data.alcaldia,
          codigo_postsl: data.codigo_postal,
          entidad: data.entidad,
          imagen: "",
          contrasena: data.password,
          categorias: cats,
          verificado: 0,
        };
        const result = await signUpVoluntario(voluntario);

        if (result.success) {
          toast({
            title: "Cuenta creada exitosamente",
            description:
              "Hemos enviado un correo de confirmación a tu correo electrónico.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });

          setUser(result.data.voluntario);
          localStorage.setItem("user", JSON.stringify(result.data.voluntario));

          setToken(result.data.token);
          localStorage.setItem("token", result.data.token);

          navigate("/recomendaciones");
        }
      } else {
        const beneficiado: BeneficiadoWithCategories = {
          id_beneficiado: 0,
          nombre: data.fullname,
          email: data.email,
          calle: data.calle,
          numero_exterior: data.numero_exterior,
          numero_interior: data.numero_interior,
          colonia: data.colonia,
          alcaldia: data.alcaldia,
          codigo_postal: data.codigo_postal,
          entidad: data.entidad,
          imagen: "",
          contrasena: data.password,
          responsable: data.responsable,
          telefono: data.telefono,
          categorias: beneficiadoCategorias,
          evento_eliminados: 0,
          descripcion: "",
          tipo: userType,
          verificado: 0,
          facebook: "",
          instagram: "",
          twitter: "",
          web: "",
        };

        const result = await signUpBeneficiado(beneficiado);

        if (result.success) {
          toast({
            title: "Cuenta creada exitosamente",
            description:
              "Hemos enviado un correo de confirmación a tu correo electrónico.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });

          setUser(result.data.beneficiado);
          localStorage.setItem("user", JSON.stringify(result.data.beneficiado));

          setToken(result.data.token);
          localStorage.setItem("token", result.data.token);

          navigate("/perfil-beneficiado");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategorias = async () => {
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

  if (user) {
    return (
      <Navigate
        to={"id_voluntario" in user ? "/recomendaciones" : "/perfil"}
        replace
      />
    );
  }

  return (
    <LoginLayout>
      <Box
        h="10%"
        display="flex"
        flexDirection={"row"}
        justifyContent={"center"}
      >
        <Heading>Registrarse</Heading>
      </Box>
      <Flex justify="center" align="center" h="90%">
        {step === 0 && (
          <Card>
            <Box>
              <VStack spacing={4}>
                <Heading size="md">
                  Información{" "}
                  {isOrganizacion ? "de la organización" : "personal"}
                </Heading>
                <FormControl as="fieldset" isRequired>
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
                          label="Persona interesada en brindar su ayuda a través de eventos"
                          aria-label="A tooltip"
                        >
                          Voluntario
                        </Tooltip>
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
                <FormControl
                  isInvalid={errors.fullname ? true : false}
                  isRequired
                >
                  <FormLabel>
                    Nombre completo{" "}
                    {userType === "organizacion" && "de la organización"}
                  </FormLabel>
                  <Input
                    {...register("fullname", {
                      required: "Este campo es requerido",
                    })}
                  />
                  {errors.fullname && (
                    <FormErrorMessage>
                      {errors.fullname.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                {userType === "organizacion" && (
                  <FormControl
                    isInvalid={errors.responsable ? true : false}
                    isRequired
                  >
                    <FormLabel>Nombre completo del responsable</FormLabel>
                    <Input
                      {...register("responsable", {
                        required: "Este campo es requerido",
                      })}
                    />
                    {errors.responsable && (
                      <FormErrorMessage>
                        {errors.responsable.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                )}
                <FormControl isInvalid={errors.email ? true : false} isRequired>
                  <FormLabel>Correo electrónico</FormLabel>
                  <Input
                    {...register("email", {
                      required: "Este campo es requerido",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "El correo electrónico no es válido",
                      },
                    })}
                    type="email"
                  />
                  {errors.email && (
                    <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl
                  isInvalid={errors.password ? true : false}
                  isRequired
                >
                  <FormLabel>Contraseña</FormLabel>
                  <Input
                    {...register("password", {
                      required: "Este campo es requerido",
                      minLength: {
                        value: 8,
                        message:
                          "La contraseña debe tener al menos 8 caracteres",
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                        message:
                          "La contraseña debe tener al menos 1 mayúscula, 1 minúscula y 1 número",
                      },
                    })}
                    type="password"
                    onCopy={(e) => e.preventDefault()}
                  />
                  {errors.password && (
                    <FormErrorMessage>
                      {errors.password.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl
                  isInvalid={errors.passwordConfirmation ? true : false}
                  isRequired
                >
                  <FormLabel>Confirmar contraseña</FormLabel>
                  <Input
                    {...register("passwordConfirmation", {
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
                    type="password"
                    onPaste={(e) => e.preventDefault()}
                  />
                  {errors.passwordConfirmation && (
                    <FormErrorMessage>
                      {errors.passwordConfirmation.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </VStack>
            </Box>
            <Flex justify="space-between" align="center" mt={4}>
              <Text>
                Ya tiene una cuenta?{" "}
                <Link color="orange.500" as={RLink} to="/signin">
                  Iniciar sesión
                </Link>
              </Text>
              <Button
                colorScheme="orange"
                onClick={handleSubmit(() => setStep(1))}
              >
                Continuar
              </Button>
            </Flex>
          </Card>
        )}

        {step === 1 && (
          <Card>
            <VStack spacing={6}>
              <Heading size="md">Dirección</Heading>
              <FormControl isInvalid={errors.calle ? true : false} isRequired>
                <FormLabel>Calle</FormLabel>
                <Input
                  {...register("calle", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.calle && (
                  <FormErrorMessage>{errors.calle.message}</FormErrorMessage>
                )}
              </FormControl>

              <HStack spacing={4}>
                <FormControl
                  isInvalid={errors.numero_exterior ? true : false}
                  isRequired
                >
                  <FormLabel>No. Exterior</FormLabel>
                  <Input
                    {...register("numero_exterior", {
                      required: "Este campo es obligatorio",
                    })}
                  />
                  {errors.numero_exterior && (
                    <FormErrorMessage>
                      {errors.numero_exterior.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>No. Interior</FormLabel>
                  <Input
                    {...register("numero_interior")}
                    placeholder="Opcional"
                  />
                  {errors.numero_interior && (
                    <FormErrorMessage>
                      {errors.numero_interior.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </HStack>

              <FormControl isInvalid={errors.colonia ? true : false} isRequired>
                <FormLabel>Colonia</FormLabel>
                <Input
                  {...register("colonia", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.colonia && (
                  <FormErrorMessage>{errors.colonia.message}</FormErrorMessage>
                )}
              </FormControl>

              <HStack spacing={4}>
                <FormControl
                  isInvalid={errors.alcaldia ? true : false}
                  isRequired
                >
                  <FormLabel>Alcaldía</FormLabel>
                  <Select
                    defaultValue={
                      estados[watchEntidad as keyof typeof estados]?.[0]
                    }
                    {...register("alcaldia", {
                      required: "Este campo es obligatorio",
                    })}
                  >
                    {estados[watchEntidad as keyof typeof estados]?.map(
                      (alcaldia) => (
                        <option key={alcaldia} value={alcaldia}>
                          {alcaldia}
                        </option>
                      )
                    )}
                  </Select>

                  {errors.alcaldia && (
                    <FormErrorMessage>
                      {errors.alcaldia.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl
                  isInvalid={errors.codigo_postal ? true : false}
                  isRequired
                >
                  <FormLabel>Código postal</FormLabel>
                  <Input
                    {...register("codigo_postal", {
                      required: "Este campo es obligatorio",
                      pattern: {
                        value: /^\d{5}$/,
                        message: "El código postal debe tener 5 digitos",
                      },
                    })}
                    type="number"
                  />
                  {errors.codigo_postal && (
                    <FormErrorMessage>
                      {errors.codigo_postal.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </HStack>
              <FormControl isInvalid={errors.entidad ? true : false} isRequired>
                <FormLabel>Entidad federativa</FormLabel>
                <Select
                  defaultValue="Ciudad de Mexico"
                  {...register("entidad", {
                    required: "Este campo es obligatorio",
                  })}
                >
                  {Object.keys(estados).map((estado) => (
                    <option key={estado} value={estado}>
                      {estado}
                    </option>
                  ))}
                </Select>
                {errors.entidad && (
                  <FormErrorMessage>{errors.entidad.message}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={errors.colonia ? true : false} isRequired>
                <FormLabel>Teléfono</FormLabel>
                <Input
                  {...register("telefono", {
                    required: "Este campo es obligatorio",
                  })}
                />
                {errors.colonia && (
                  <FormErrorMessage>{errors.colonia.message}</FormErrorMessage>
                )}
              </FormControl>
            </VStack>
            <Flex justify="space-between" mt={4}>
              <Button variant="outline" onClick={() => setStep(0)}>
                Atrás
              </Button>
              <Button
                colorScheme="orange"
                onClick={handleSubmit(() => setStep(2))}
              >
                Continuar
              </Button>
            </Flex>
          </Card>
        )}
        {step === 2 && (
          <Card>
            <VStack spacing={3}>
              <Heading size="md">Categorías</Heading>
              <Text fontWeight={500}>
                {isOrganizacion || isCivil
                  ? "Seleccione las categorias a las que pertenece"
                  : "Seleccione las frases que mas le describen"}
              </Text>
              <Box>
                {isOrganizacion || isCivil ? (
                  <Wrap direction="row" spacing={4} justify="center">
                    {categorias
                      .sort(function (a, b) {
                        if (a.nombre < b.nombre) {
                          return -1;
                        }
                        if (a.nombre > b.nombre) {
                          return 1;
                        }
                        return 0;
                      })
                      .map((categoria, index) => (
                        <WrapItem key={categoria.id_categoria}>
                          <Tag
                            size="lg"
                            cursor="pointer"
                            colorScheme={
                              beneficiadoCategorias.includes(
                                categoria.id_categoria
                              )
                                ? "orange"
                                : "gray"
                            }
                            onClick={() =>
                              toggleBeneficiadoCategoria(categoria.id_categoria)
                            }
                          >
                            <TagLabel>{categoria.nombre}</TagLabel>
                          </Tag>
                        </WrapItem>
                      ))}
                  </Wrap>
                ) : (
                  <Stack>
                    {Object.keys(preguntas)
                      .splice(9)
                      .map((pregunta) => {
                        const item =
                          preguntas[pregunta as keyof typeof preguntas][0];
                        return (
                          <Radio
                            key={item}
                            value={item}
                            isChecked={voluntarioCategorias.includes(
                              `${pregunta}-${0}`
                            )}
                            onClick={() =>
                              toggleVoluntarioCategoria(`${pregunta}-${0}`)
                            }
                          >
                            {item}
                          </Radio>
                        );
                      })}
                  </Stack>
                )}
              </Box>
            </VStack>
            <Flex justify="space-between" mt={4}>
              <Button onClick={() => setStep(1)} variant="outline">
                Atrás
              </Button>
              {isOrganizacion || isCivil ? (
                <Button
                  isLoading={loading}
                  colorScheme="orange"
                  onClick={handleSubmit(onSubmit)}
                >
                  Registrarse
                </Button>
              ) : (
                <Button
                  colorScheme="orange"
                  onClick={handleSubmit(() => setStep(3))}
                >
                  Continuar
                </Button>
              )}
            </Flex>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <VStack spacing={3}>
              <Heading size="md">Categorías</Heading>
              <Text fontWeight={500}>
                Seleccione las frases que mas le describen
              </Text>
              <Box>
                <Stack>
                  {Object.keys(preguntas)
                    .splice(0, 9)
                    .map((pregunta) => {
                      const item =
                        preguntas[pregunta as keyof typeof preguntas][0];
                      return (
                        <Radio
                          key={item}
                          value={item}
                          isChecked={voluntarioCategorias.includes(
                            `${pregunta}-${0}`
                          )}
                          onClick={() =>
                            toggleVoluntarioCategoria(`${pregunta}-${0}`)
                          }
                        >
                          {item}
                        </Radio>
                      );
                    })}
                </Stack>
              </Box>
            </VStack>
            <Flex justify="space-between" mt={4}>
              <Button onClick={() => setStep((s) => s - 1)} variant="outline">
                Atrás
              </Button>
              <Button
                colorScheme="orange"
                onClick={handleSubmit(() => setStep((s) => s + 1))}
              >
                Continuar
              </Button>
            </Flex>
          </Card>
        )}

        {step === 4 && (
          <Card>
            <VStack spacing={3}>
              <Heading size="md">Categorías</Heading>
              <Text fontWeight={500}>
                Seleccione las frases que más le describen
              </Text>
              <Box>
                <Stack>
                  {Object.keys(preguntas)
                    .splice(9)
                    .map((pregunta) => {
                      const item =
                        preguntas[pregunta as keyof typeof preguntas][1];
                      return (
                        <Radio
                          key={item}
                          value={item}
                          isChecked={voluntarioCategorias.includes(
                            `${pregunta}-${1}`
                          )}
                          onClick={() =>
                            toggleVoluntarioCategoria(`${pregunta}-${1}`)
                          }
                        >
                          {item}
                        </Radio>
                      );
                    })}
                </Stack>
              </Box>
            </VStack>
            <Flex justify="space-between" mt={4}>
              <Button onClick={() => setStep((s) => s - 1)} variant="outline">
                Atrás
              </Button>
              <Button
                colorScheme="orange"
                onClick={handleSubmit(() => setStep((s) => s + 1))}
              >
                Continuar
              </Button>
            </Flex>
          </Card>
        )}

        {step === 5 && (
          <Card>
            <VStack spacing={3}>
              <Heading size="md">Categorías</Heading>
              <Text fontWeight={500}>
                Seleccione las frases que más le describen
              </Text>
              <Box>
                <Stack>
                  {Object.keys(preguntas)
                    .splice(0, 8)
                    .map((pregunta) => {
                      const item =
                        preguntas[pregunta as keyof typeof preguntas][1];
                      return (
                        <Radio
                          key={item}
                          value={item}
                          isChecked={voluntarioCategorias.includes(
                            `${pregunta}-${1}`
                          )}
                          onClick={() =>
                            toggleVoluntarioCategoria(`${pregunta}-${1}`)
                          }
                        >
                          {item}
                        </Radio>
                      );
                    })}
                </Stack>
              </Box>
            </VStack>
            <Flex justify="space-between" mt={4}>
              <Button onClick={() => setStep((s) => s - 1)} variant="outline">
                Atrás
              </Button>
              <Button
                colorScheme="orange"
                onClick={handleSubmit(() => setStep((s) => s + 1))}
              >
                Continuar
              </Button>
            </Flex>
          </Card>
        )}

        {step === 6 && (
          <Card>
            <VStack spacing={3}>
              <Heading size="md">Categorías</Heading>
              <Text fontWeight={500}>
                Seleccione las frases que mas le describen
              </Text>
              <Box>
                <Stack>
                  {Object.keys(preguntas)
                    .splice(9)
                    .map((pregunta) => {
                      const item =
                        preguntas[pregunta as keyof typeof preguntas][2];
                      return (
                        <Radio
                          key={item}
                          value={item}
                          isChecked={voluntarioCategorias.includes(
                            `${pregunta}-${2}`
                          )}
                          onClick={() =>
                            toggleVoluntarioCategoria(`${pregunta}-${2}`)
                          }
                        >
                          {item}
                        </Radio>
                      );
                    })}
                </Stack>
              </Box>
            </VStack>
            <Flex justify="space-between" mt={4}>
              <Button onClick={() => setStep((s) => s - 1)} variant="outline">
                Atrás
              </Button>
              <Button
                colorScheme="orange"
                onClick={handleSubmit(() => setStep((s) => s + 1))}
              >
                Continuar
              </Button>
            </Flex>
          </Card>
        )}

        {step === 7 && (
          <Card>
            <VStack spacing={3}>
              <Heading size="md">Categorías</Heading>
              <Text fontWeight={500}>
                Seleccione las frases que mas le describen
              </Text>
              <Box>
                <Stack>
                  {Object.keys(preguntas)
                    .splice(0, 8)
                    .map((pregunta) => {
                      const item =
                        preguntas[pregunta as keyof typeof preguntas][2];
                      return (
                        <Radio
                          key={item}
                          value={item}
                          isChecked={voluntarioCategorias.includes(
                            `${pregunta}-${2}`
                          )}
                          onClick={() =>
                            toggleVoluntarioCategoria(`${pregunta}-${2}`)
                          }
                        >
                          {item}
                        </Radio>
                      );
                    })}
                </Stack>
              </Box>
            </VStack>
            <Flex justify="space-between" mt={4}>
              <Button variant="outline" onClick={() => setStep((s) => s - 1)}>
                Atrás
              </Button>
              <Button
                isLoading={loading}
                colorScheme="orange"
                onClick={handleSubmit(onSubmit)}
              >
                Registrarse
              </Button>
            </Flex>
          </Card>
        )}
      </Flex>
    </LoginLayout>
  );
};

export default SignUpScreen;
