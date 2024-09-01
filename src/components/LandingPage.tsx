import { User } from '@clerk/nextjs/server';

const LandingPage = ({user}: {user: User}) => {
    return ( 
        <div className='container mx-auto px-20 mt-40'>
            <div className='text-xl text-center'>
                <h1>Welcome back, {user.firstName}!</h1>
            </div>
        </div>
        
     );
}
 
export default LandingPage;