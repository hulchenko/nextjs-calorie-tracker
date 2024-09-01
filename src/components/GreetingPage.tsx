import { SignInButton } from '@clerk/nextjs';
const GreetingPage = (user: any) => {
    return (
        <div className='container mx-auto px-20 mt-40'>
            <div className='text-xl text-center'>
                <h1 className='text-2xl p-4'>Welcome!</h1>
                <h3><span className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded shadow'><SignInButton /></span> to continue.</h3>
            </div>
        </div>
     );
}
 
export default GreetingPage;