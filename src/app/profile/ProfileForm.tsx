'use client';

import { User } from '@/types/User';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    NumberInput,
    NumberInputField,
    Spinner,
    useToast
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';

const ProfileForm = () => {
    const toast = useToast();
    const { user, setUser } = useUser();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const target = user?.target;

        if(user && target){
            setLoading(false);
        }
    }, [user]);

    const updateUser = async (updatedUser: User) => {
        try {
            const response = await fetch('/api/db/user', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({...updatedUser})
            })
            if(!response.ok){
                const {error} = await response.json();
                throw error;
            }
            setUser(({
                ...user,
                email: updatedUser.email,
                name: updatedUser.name,
                target: updatedUser.target
            }));
            console.log(`UPDATED USER: `, user);
            toast({title: 'User updated', status: 'info'});
        } catch (error) {
            toast({title: `${error}`, status: 'error'});
        }
    };

    const submitHandler = async (formData: FormData) => {
        event?.preventDefault();

        const updatedUser = {
            user_id: user?.user_id,
            name: formData.get('name'),
            email: formData.get('email'),
            target: formData.get('target')
        };

        await updateUser(updatedUser as User);
    };

    if(loading) {
        return(
            <div className='flex justify-center mt-96'>
                <Spinner thickness='4px' speed='1s' color='teal.600' size='xl'/>
            </div>
        )
    } 
    
    return (
            <form action={submitHandler}>
                <Card className='w-96 mx-auto mt-52'>
                    <CardHeader className='text-teal-700 text-3xl font-bold'>My Profile</CardHeader>
                    <CardBody>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <InputGroup size='lg'>
                                <Input focusBorderColor='teal.600' placeholder='Your name' type='text' name='name' defaultValue={user?.name}/>
                            </InputGroup>  
                            <FormLabel className='pt-4'>Email Address</FormLabel>
                            <InputGroup size='lg'>
                                <Input focusBorderColor='teal.600' placeholder='email@example.com' type='email' name='email' defaultValue={user?.email}/>
                            </InputGroup>
                            <FormLabel className='pt-4'>Calorie Target</FormLabel>
                            <NumberInput size='lg' focusBorderColor='teal.600' name='target' defaultValue={user?.target} min={1000} max={9999}>
                                <NumberInputField />
                            </NumberInput>
                        </FormControl>
                    </CardBody>
                    <CardFooter className='justify-end'>
                        <Button colorScheme='teal' mr={3} type='submit' disabled={false}>Update</Button>
                        <Button colorScheme='gray' mr={3} >Cancel</Button>
                    </CardFooter>
                </Card>
            </form>
    )
}

export default ProfileForm;