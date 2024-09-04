import SignInForm from '../../components/SignInForm';
import SignUpForm from '../../components/SignUpForm';

const LoginPage = () => {
    return (
        <div className='mx-auto pt-60 items-center flex flex-col text-xl'>
            <h1 className='text-6xl p-6'>Lead your healthy <span className='text-teal-700'>life</span> here!</h1>
                <SignInForm />
                <SignUpForm />
        </div>
     );
}
 
export default LoginPage;