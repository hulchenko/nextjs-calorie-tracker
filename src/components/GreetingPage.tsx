"use client";

import SignInForm from '../components/SignInForm';
import SignUpForm from './SignUpForm';


const GreetingPage = () => {
    return (
        <div className='mx-auto mt-40'>
            <div className='text-center flex justify-between'>
                <SignUpForm />
                <SignInForm />
            </div>
        </div>
     );
}
 
export default GreetingPage;