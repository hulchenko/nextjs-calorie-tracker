"use client";

import SignInForm from '../components/SignInForm';
import SignUpForm from './SignUpForm';


const GreetingPage = () => {
    return (
        <div className='container mx-auto px-15 mt-40'>
            <div className='text-xl text-center flex'>
                <SignUpForm />
                <SignInForm />
            </div>
        </div>
     );
}
 
export default GreetingPage;