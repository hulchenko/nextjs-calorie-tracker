import { checkUserDB } from '@/lib/db';
import { passwordValidator } from '@/lib/utils';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  useToast,
  InputRightElement,
  InputGroup,
  FormErrorMessage
} from '@chakra-ui/react';
import { useState } from 'react';

const SignUpForm = () => {
    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [showPassword, setShowPassword] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [userData, setUserData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    });
    
    const submitHandler = (event) => {
      event.preventDefault() // prevent modal from closing until successful promise result
      console.log(`NEW USER: `, userData)
      setIsPasswordValid(passwordValidator(userData.password));
      if (isPasswordValid){
        checkUserDB(userData, false)
          .then(_ => { 
            toast({ title: 'Success', description: 'Account has been created.', status: 'success' });
            onClose() // close modal on success
          })
          .catch((err) => { toast({ title: 'Error', description: `${err.message}`, status: 'error'}) })
      }
    }

    
  return (
    <>
        <div  className='flex items-center'>
            <p className='mr-1 py-4'>Don't have an account?</p>
            <button className='bg-white border outline-teal-700 text-gray-700 hover:bg-teal-600 hover:text-white py-2 px-2 rounded size-fit' onClick={onOpen}>Sign Up</button>
        </div>


      {/* Sign Up modal */}  
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={submitHandler}>
            <ModalHeader className='text-teal-700'>Create your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isRequired>
                <FormLabel>First name</FormLabel>
                <Input focusBorderColor='teal.600' name='first' placeholder='First name' type='text' onChange={(e) => setUserData((props) => ({...props, firstName: e.target.value.trim()}))}/>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Last name</FormLabel>
                <Input focusBorderColor='teal.600' name='last' placeholder='Last name' type='text' onChange={(e) => setUserData((props) => ({...props, lastName: e.target.value.trim()}))}/>
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Email</FormLabel>
                <Input focusBorderColor='teal.600'name='email' placeholder='email@example.com' type='email' onChange={(e) => setUserData((props) => ({...props, email: e.target.value.trim()}))}/>
              </FormControl>

              <FormControl mt={4} isRequired isInvalid={!isPasswordValid}>
                <FormLabel>Password</FormLabel>
                    <InputGroup size='md'>
                      <Input
                        focusBorderColor='teal.600'
                        pr='4.5rem'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter password'
                        onChange={(e) => setUserData((props) => ({...props, password: e.target.value.trim()}))}
                      />
                      <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='md' onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? 'Hide' : 'Show'}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {!isPasswordValid && (
                        <FormErrorMessage>
                          Password must have at least 6 characters. A combination of uppercase and lowercase letters, numbers. Can contain special characters.
                        </FormErrorMessage>
                      )}
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='teal' mr={3} type='submit'>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
 
export default SignUpForm;