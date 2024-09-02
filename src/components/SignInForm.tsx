const SignInForm = () => {
    return (
        <div className='w-full max-w-xs'>
            <form action="" className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <div className='mb-4'>
                <input className='shadow border rounded w-full py-3 px-3 text-gray-700  focus:outline-teal-700' type="text" placeholder='Email' />
                </div>
                <div className='mb-6'>
                <input className='shadow border rounded w-full py-3 px-3 text-gray-700  focus:outline-teal-700' type="text" placeholder='Password' />
                </div>
                <button className='bg-teal-700 hover:bg-teal-600  text-white py-2 px-4 rounded'>Sign In</button>
            </form>
        </div>

     );
}
 
export default SignInForm;