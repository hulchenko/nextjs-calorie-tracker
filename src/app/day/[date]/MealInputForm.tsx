import { getFoodData, defaultMeal } from '@/lib/mealUtils';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Spinner,
    Stack,
    Text,
    useDisclosure,
    useToast
} from '@chakra-ui/react';
import { faPlus, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { MealContext } from './DayForm';

const MealInputForm = () => {
    const toast = useToast();
    const {mealList, setMealList, setSaveReady} = useContext(MealContext);

    const [query, setQuery] = useState('');
    const [delayedFetch, setDelayedFetch] = useState(query)
    const [meal, setMeal] = useState(defaultMeal());
    const [loading, setLoading] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure(); // modal props

    useEffect(() => {
        // search and get nutritions
        if(query.length >= 3 && delayedFetch){
            getFoodData(query, setMeal, setLoading, toast);
        }
    }, [delayedFetch])

    useEffect(() => {
        const delayHandler = setTimeout(() => setDelayedFetch(query), 1500); // delay fetch by 1.5 seconds after the user interracted with the input field
        return () => clearTimeout(delayHandler); // reset if the user starts typing again
    }, [query]);

    useEffect(() => {
        if(!isOpen){
            setMeal(defaultMeal()) // clean up modal if it wasn't submitted
        }
    }, [isOpen])
    
    return (
        <>
        {mealList.length === 0 && (
                <div  className='flex flex-col items-center'>
                    <h1 className='text-4xl'>No meals</h1>
                    <p className='text-base text-gray-500 py-4'>Looks like you haven't added any meals yet.</p>
                    <button className='bg-teal-700 hover:bg-teal-600  text-white py-4 p-6 mt-2 rounded' onClick={onOpen}>Add Meal<FontAwesomeIcon className='ml-2' icon={faUtensils} /></button> 
                </div>
        )}
        {mealList.length > 0 && mealList.length < 9 && (
                <button className='fixed bottom-40 right-52 bg-teal-700 hover:bg-teal-600 text-white py-4 p-6 mt-2 rounded' onClick={onOpen}><FontAwesomeIcon icon={faPlus} /></button>
        )}
            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior='outside' isCentered>
                <ModalOverlay />
                    <ModalContent>
                        <form action={() => {setMealList(prev => [...prev, meal]), setSaveReady(true)}}>
                            <ModalHeader className='text-teal-700'>Add a New Meal</ModalHeader>
                            <ModalCloseButton size='lg'/>
                            <ModalBody pb={6}>
                                <FormControl>
                                    <FormLabel>Type</FormLabel>
                                    <InputGroup size='lg'>
                                        <Select placeholder='Please Select' onChange={(e) => setMeal({...meal, meal_type: e.target.value})}>
                                            <option value='Breakfast'>Breakfast</option>
                                            <option value='Brunch'>Brunch</option>
                                            <option value='Lunch'>Lunch</option>
                                            <option value='Supper'>Supper</option>
                                            <option value='Dinner'>Dinner</option>
                                            <option value='Midnight Snack'>Midnight Snack</option>
                                            <option value='Other'>Other</option>
                                        </Select>
                                    </InputGroup>
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel>Description</FormLabel>
                                    <InputGroup size='lg'>
                                        <Input placeholder='e.g. 2 eggs and a toast' onChange={(e) => {setQuery(e.target.value), setMeal({...meal, meal_description: e.target.value})}}/>
                                    </InputGroup>
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel>Nutrition List</FormLabel>
                                    {loading ? (<span className='w-full flex text-center justify-center'><Spinner/></span>) : (
                                            <Stack>
                                                {meal?.items.map(i => (
                                                    <div className='ml-2 border border-teal-600 rounded p-4'>
                                                        <Text>Ingridient(s): <b>{i?.name}</b></Text>
                                                        <Text>Calories: {i?.calories}</Text>
                                                        <Text>Carbohydrates: {i?.carbohydrates_total_g} g</Text>
                                                        <Text>Cholesterol: {i?.cholesterol_mg} mg</Text>
                                                        <Text>Saturated Fat: {i?.fat_saturated_g} g</Text>
                                                        <Text>Total Fat: {i?.fat_total_g} g</Text>
                                                        <Text>Fiber: {i?.fiber_g} g</Text>
                                                        <Text>Potassium: {i?.potassium_mg} mg</Text>
                                                        <Text>Protein: {i?.protein_g} g</Text>
                                                        <Text>Serving Size: {i?.serving_size_g} g</Text>
                                                        <Text>Sodium: {i?.sodium_mg} mg</Text>
                                                        <Text>Sugar: {i?.sugar_g} g</Text>
                                                    </div>
                                                ))}
                                            </Stack>
                                    )}
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel>Total Calories: <b className='text-teal-600'>{meal?.calories || 0}</b></FormLabel>
                                </FormControl>

                            </ModalBody>
                            

                            <ModalFooter>
                                <Button colorScheme='teal' mr={3} type='submit' isDisabled={meal.items.length === 0 || meal.meal_type === ''} onClick={onClose}>
                                    Add
                                </Button>
                                <Button onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                        </form>
                    </ModalContent>
            </Modal>
        </>
    )
}

export default MealInputForm;