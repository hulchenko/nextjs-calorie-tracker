"use client";

import SignInForm from '../components/SignInForm';
import SignUpForm from './SignUpForm';


const GreetingPage = () => {
    return (
        <div className='mx-auto mt-40 items-center flex flex-col'>
            <h1 className='text-6xl p-6'>Lead your healthy <span className='text-teal-700'>life</span> here!</h1>
                <SignInForm />
                <SignUpForm />
        </div>
     );
}
 
export default GreetingPage;