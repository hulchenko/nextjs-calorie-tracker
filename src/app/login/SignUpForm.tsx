'use client';

import { FormEvent } from 'react';
import { encryptPassword, passwordValidator } from '@/lib/utils';
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
import { useRouter } from 'next/navigation';
import { useSession } from '../context/SessionProvider';

const SignUpForm = () => {
    const toast = useToast();
    const router = useRouter();
    const { setSession } = useSession();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [showPassword, setShowPassword] = useState(false);
    const [isFormValid, setIsFormValid] = useState(true);

    const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault() // prevent modal from closing until successful promise result
      
      const formData = new FormData(event.currentTarget);
      const password = formData.get('password');
      const hashedPassword = await encryptPassword(password as string);

      const newUser = {
        firstName: formData.get('first'),
        lastName: formData.get('last'),
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
            toast({title: `Welcome, ${sessionData.first_name}!`, status: 'success'});
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
            <button className='bg-white border outline-teal-700 text-gray-700 hover:bg-teal-600 hover:text-white py-2 px-2 rounded size-fit' onClick={onOpen}>Sign Up</button>
        </div>


      {/* Sign Up modal using Chakra UI */}  
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={submitHandler}>
            <ModalHeader className='text-teal-700'>Create your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isRequired>
                <FormLabel>First name</FormLabel>
                <Input focusBorderColor='teal.600' name='first' placeholder='First name' type='text'/>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Last name</FormLabel>
                <Input focusBorderColor='teal.600' name='last' placeholder='Last name' type='text'/>
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Email</FormLabel>
                <Input focusBorderColor='teal.600' name='email' placeholder='email@example.com' type='email'/>
              </FormControl>

              <FormControl mt={4} isRequired isInvalid={!isFormValid}>
                <FormLabel>Password</FormLabel>
                    <InputGroup size='md'>
                      <Input
                        focusBorderColor='teal.600'
                        pr='4.5rem'
                        name='password'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter password'/>
                      <InputRightElement width='4.5rem'>
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