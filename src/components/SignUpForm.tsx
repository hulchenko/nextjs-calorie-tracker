import { checkUserDB } from '@/lib/db';
import { User } from '@/types/User';
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
  useToast
} from '@chakra-ui/react';
import { useState } from 'react';

const SignUpForm = () => {
    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const onChangeHandler = (event) => {
      // Create handler to correct ts error with event.target.value on the input fields

      event.preventDefault();
      const target = event.target.name;
      const value = event?.target?.value?.trim() || '';
      switch (target) {
        case 'first':
          setFirstName(value)
          break;
        case 'last':
          setLastName(value)
          break;
        case 'email':
          setEmail(value)
          break;
      }
    }

    
    const submitHandler =  () => {
      event.preventDefault()
        const user: User = {
          firstName,
          lastName,
          email
        }
        console.log(`USER: `, user)

        checkUserDB(user, false)
          .then(_ => { 
            toast({ title: 'Success', description: 'Account has been created.', status: 'success' });
            onClose()
          })
          .catch((err) => { toast({ title: 'Error', description: `${err.message}`, status: 'error'}) })
    }
    
  return (
    <>
      <div>
        <h1 className='text-6xl p-6'>Lead your healthy <span className='text-teal-700'>life</span> here!</h1>
        <div  className='flex justify-center'>
            <p className='m-2 px-4'>Don't have an account?</p>
            <button className='bg-white border outline-teal-700 text-gray-700 hover:bg-teal-600 hover:text-white py-2 px-4 rounded' onClick={onOpen}>Sign Up</button>
        </div>
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
                <Input name='first' placeholder='First name' type='text' onChange={(e) => onChangeHandler(e)}/>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Last name</FormLabel>
                <Input name='last' placeholder='Last name' type='text' onChange={(e) => onChangeHandler(e)}/>
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Email</FormLabel>
                <Input name='email' placeholder='email@example.com' type='email' onChange={(e) => onChangeHandler(e)}/>
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