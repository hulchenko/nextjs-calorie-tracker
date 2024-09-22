'use client';

import { encryptPassword, passwordValidator } from '@/lib/utils';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSession } from '../context/SessionProvider';

const SignUpForm = () => {
    const toast = useToast();
    const router = useRouter();
    const { setSession } = useSession();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [showPassword, setShowPassword] = useState(false);
    const [isFormValid, setIsFormValid] = useState(true);

    const submitHandler = async (formData: FormData) => {
      event?.preventDefault() // prevent modal from closing until successful promise result

      const password = formData.get('password');
      const hashedPassword = await encryptPassword(password as string);

      const newUser = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: hashedPassword
      };

      const isPasswordValid = await passwordValidator(password as string);
      setIsFormValid(isPasswordValid);

      if (isPasswordValid){
        try {
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ newUser })
        });

          if (response.ok){
            const sessionData = await response.json();
            setSession(sessionData);
            toast({title: `Welcome, ${sessionData.name}!`, status: 'success'});
            router.push('/dashboard');
          } else {
            const { error } = await response.json();
            toast({title: `${error}`, status: 'error'});
          }
        } catch (error) {
          console.error('Error occured during sign up:', error);
        }
      }
    }

    
  return (
    <>
        <div  className='flex items-center'>
            <p className='mr-1 py-4'>Don't have an account?</p>
            <button className='bg-white border outline-teal-700 text-gray-600 hover:bg-teal-600 hover:text-white py-2 px-2 rounded size-fit' onClick={onOpen}>Sign Up</button>
        </div>


      {/* Sign Up modal using Chakra UI */}  
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <form action={submitHandler}>
            <ModalHeader className='text-teal-700'>Sign Up</ModalHeader>
            <ModalCloseButton size='lg'/>
            <ModalBody pb={6}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <InputGroup size='lg'>
                  <Input focusBorderColor='teal.600' name='name' placeholder='Your name' type='text'/>
                </InputGroup>
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Email</FormLabel>
                <InputGroup size='lg'>
                  <Input focusBorderColor='teal.600' name='email' placeholder='email@example.com' type='email'/>
                </InputGroup>
              </FormControl>

              <FormControl mt={4} isRequired isInvalid={!isFormValid}>
                <FormLabel>Password</FormLabel>
                    <InputGroup size='lg'>
                      <Input
                        focusBorderColor='teal.600'
                        pr='4.5rem'
                        name='password'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter password'/>
                      <InputRightElement className='mr-2' width='4.5rem'>
                        <Button h='1.75rem' size='md' onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? 'Hide' : 'Show'}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {!isFormValid && (
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