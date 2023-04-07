import { Box, Button, Flex, FormControl, FormHelperText, FormLabel, HStack, Heading, Input, Link, Radio, RadioGroup, Text, VStack } from "@chakra-ui/react"
import LoginLayout from "../../components/general/LoginLayout";
import { FunctionComponent, PropsWithChildren, useState } from "react";
import { Link as RLink, useNavigate } from "react-router-dom";

const Card: FunctionComponent<PropsWithChildren> = (props) => {
  return (
    <Flex w="96%" maxW="450px" height="100%" border="1px solid" borderColor="gray.300" borderRadius={8} padding="8" justify="space-between" flexDirection="column">
      {props.children}
      </Flex>
  )
}

const SignUpScreen = () => {

  const [step, setStep] = useState(0)
  const [userType, setUserType] = useState('organizacion');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const isOrganizacion = userType === 'organizacion';

  return (
    <LoginLayout>
      <Box h="10%">
        <Heading>Registrarse</Heading>
      </Box>
      <Flex justify="center" align="center" h="90%">
      {step === 0 && (
        <Card>
          <Box>
          <VStack spacing={6}>
          <Heading size="md">Informacion {isOrganizacion ? "de la organizacion" : "personal"}</Heading>
          <FormControl as='fieldset' isRequired>
          <FormLabel as='legend'>
            Tipo de usuario
          </FormLabel>
          <RadioGroup value={userType} onChange={(nextValue) => setUserType(nextValue)}>
            <HStack spacing='24px'>
              <Radio value='organizacion'>Organizacion</Radio>
              <Radio value='independiente'>Independiente</Radio>
              <Radio value='voluntario'>Voluntario</Radio>
            </HStack>
          </RadioGroup>
          <FormHelperText>Selecciona que tipo de usuario eres</FormHelperText>
        </FormControl>
        <FormControl isRequired>
        <FormLabel>Nombre completo {userType === 'organizacion' && "de la organizacion"}</FormLabel>
        <Input variant="filled" value={fullname} onChange={e => setFullname(e.target.value)} />
      </FormControl>
      {userType === 'organizacion' && (
        <FormControl isRequired>
        <FormLabel>Nombre completo del responsable</FormLabel>
        <Input variant="filled" value={fullname} onChange={e => setFullname(e.target.value)} />
      </FormControl>
      )}
      <FormControl isRequired>
        <FormLabel>Correo electronico</FormLabel>
        <Input variant="filled" value={email} onChange={e => setEmail(e.target.value)} type="email" />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Contrasena</FormLabel>
        <Input variant="filled" value={password} onChange={e => setPassword(e.target.value)} type="password" onCopy={(e) => e.preventDefault()} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Repetir contrasena</FormLabel>
        <Input variant="filled" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} type="password" onPaste={(e) => e.preventDefault()} />
      </FormControl>
          </VStack>
          </Box>
          <Flex justify="space-between" align="center">
          <Text>
            Ya tiene una cuenta?{' '}
            <Link color='blue.500' href='#'>
              <RLink to="/signin">Iniciar sesion</RLink>
            </Link>
          </Text>
            <Button colorScheme='blue' onClick={() => setStep(1)}>Continuar</Button>
          </Flex>
        </Card>
      )}
      {step === 1 && (
        <Card>
          <VStack spacing={6}>
            <Heading size="md">Direccion</Heading>
            <FormControl isRequired>
        <FormLabel>Calle</FormLabel>
        <Input variant="filled"/>
      </FormControl>

      <HStack spacing={4}>
      <FormControl isRequired>
        <FormLabel>No. Exterior</FormLabel>
        <Input variant="filled"/>
      </FormControl>
      <FormControl>
        <FormLabel>No. Interior</FormLabel>
        <Input variant="filled" placeholder="Opcional" />
      </FormControl>
      </HStack>

      <FormControl isRequired>
        <FormLabel>Colonia</FormLabel>
        <Input variant="filled" />
      </FormControl>

      <HStack spacing={4}>
      <FormControl isRequired>
        <FormLabel>Alcaldia</FormLabel>
        <Input variant="filled"/>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Codigo postal</FormLabel>
        <Input variant="filled" type="number" />
      </FormControl>
      
      </HStack>
      <FormControl isRequired>
        <FormLabel>Entidad federativa</FormLabel>
        <Input variant="filled" defaultValue="Ciudad de Mexico" />
      </FormControl>

          </VStack>
          <Flex justify="space-between">
            <Button colorScheme='blue' onClick={() => setStep(0)}>Back</Button>
            <Button colorScheme='blue' onClick={() => setStep(2)}>Next</Button>
          </Flex>
        </Card>
      )}
      {step === 2 && (
        <Card>
          <Text>Step 2</Text>
          <Flex justify="space-between">
            <Button  colorScheme='blue' onClick={() => setStep(1)}>Back</Button>
            <Button colorScheme='blue' >Registrarse</Button>
          </Flex>
        </Card>
      )}
    </Flex>
    </LoginLayout>
  )
}

export default SignUpScreen;