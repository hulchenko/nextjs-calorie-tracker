import GreetingPage from '../components/GreetingPage';
import LandingPage from '../components/LandingPage';
import {auth, currentUser} from '@clerk/nextjs/server'


const HomePage = async () => {
  const user = await currentUser(); 
  console.log(`USER:`, user?.firstName)

    if(user) {
      return ( 
        <LandingPage user={user}></LandingPage>
      );
    } else {
      return (
        <GreetingPage></GreetingPage>
      )
    }
}
 
export default HomePage;