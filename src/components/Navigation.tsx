import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWeightScale } from '@fortawesome/free-solid-svg-icons';

const Navigation = () => {
    return ( 
        <>
        <div>
          {/* <SignedOut>
            <div className="flex items-center bg-teal-800 p-4">
              <FontAwesomeIcon className='h-10 text-white px-4' icon={faWeightScale} />
              <h3 className='text-2xl text-white flex-1'>Calorie Tracker</h3>
              <div className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded shadow">
                  <SignInButton />
                </div>
            </div>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center bg-teal-800 p-4">
              <FontAwesomeIcon className='h-10 text-white px-4' icon={faWeightScale} />
              <h3 className='text-2xl text-white flex-1'>Calorie Tracker</h3>
              <div className="py-2 px-4">
                <UserButton />
              </div>
            </div>
        </SignedIn> */}
        </div>
        </>
     );
}
 
export default Navigation;