import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { useState } from "react"

interface PasswordInputProps {
	placeholder: string;
  register: any
}

const PasswordInput = (props: PasswordInputProps) => {
  const [show, setShow] = useState(false)

  const handleClick = () => setShow(!show)

  return (
    <InputGroup size='md'>
      <Input
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder={props.placeholder}
        {...props.register}
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}

export default PasswordInput;