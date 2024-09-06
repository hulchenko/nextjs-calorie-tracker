import { redirect } from 'next/navigation';

const HomePage = async () => {
    redirect('/login');
}
 
export default HomePage;