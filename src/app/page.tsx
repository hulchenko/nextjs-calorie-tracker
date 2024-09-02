import { checkUserDB } from '@/lib/db';
import GreetingPage from '../components/GreetingPage';
import LandingPage from '../components/LandingPage';
import {currentUser} from '@clerk/nextjs/server'


const HomePage = async () => {
  const authUser = await currentUser();
  const userDB = authUser ? await checkUserDB(authUser) : null;

    if(userDB) {
      return ( 
        <LandingPage user={userDB}></LandingPage>
      );
    } else {
      return (
        <GreetingPage></GreetingPage>
      )
    }
}
 
export default HomePage;