import { Spinner } from '@chakra-ui/react'

const Loading = () => {
    return (
        <div className='container mx-auto flex flex-col items-center mt-96'>
            <Spinner/>
        </div> 
     );
}
 
export default Loading;