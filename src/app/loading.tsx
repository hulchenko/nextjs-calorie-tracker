import { Spinner } from '@chakra-ui/react'

const Loading = () => {
    return (
        <div className='container mx-auto flex flex-col items-center mt-96'>
            <Spinner thickness='4px' speed='1s' color='teal.600' size='xl'/>
        </div> 
     );
}
 
export default Loading;