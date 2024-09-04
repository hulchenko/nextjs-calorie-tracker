"use client";

import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const SignInForm = () => {
    const router = useRouter();

    const submitHandler = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');
        
        console.log(`PARAMS: ${email}, ${password}`)

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        if (response.ok){
            console.log(`RESPONSE: `, response);
            router.push('/dashboard')
        }
    }


    return (
        <form onSubmit={submitHandler} className='bg-white shadow-md rounded px-8 py-8 mb-4 max-w-md flex flex-col'>
            <div className='mb-4'>
            <input className='shadow border rounded w-full py-3 px-3 text-gray-700  focus:outline-teal-700' type="email" name='email' placeholder='Email' />
            </div>
            <div className='mb-6'>
            <input className='shadow border rounded w-full py-3 px-3 text-gray-700  focus:outline-teal-700' type="password" name='password' placeholder='Password' />
            </div>
            <button className='bg-teal-700 hover:bg-teal-600  text-white py-2 px-4 rounded' type='submit'>Sign In</button>
        </form>
     );
}
 
export default SignInForm;