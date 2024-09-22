import {
    Button,
    Card, CardBody, CardHeader,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    Text,
    useDisclosure,
    useToast
} from '@chakra-ui/react';
import { useContext } from 'react';
import { MealContext } from './DayForm';

const MealDisplayInfo = ({meal}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { mealList, setMealList } = useContext(MealContext)
    const toast = useToast();

    async function purgeMeal(meal){
        const existingMeal = 'id' in meal;

        if(existingMeal){
            try {
                const response = await fetch('/api/db/meal', { 
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(meal)
                });
                if (!response.ok){
                    const {error} = await response.json();
                    throw error;
                }
                filterMeals()
            } catch (error) {
                toast({ title: `${error}`, status: 'error' });
            }
        } else {
            filterMeals()
        }
    }
    
    function filterMeals() {
        setTimeout(()=> {
            // workaround for the re-opening modal bug
            const filteredMeals = mealList.filter(m => m.meal_id !== meal.meal_id);
            setMealList(filteredMeals);
            toast({ title: 'Meal removed', status: 'info'});
        });
    }



    return (
        <>
            <Card key={meal.meal_id} variant='elevated' className='cursor-default hover:shadow-teal-700 hover:shadow-md w-80 m-5'>
                <CardHeader>
                    <Text><span className='text-teal-600 text-3xl font-bold'>{meal.meal_type}</span></Text>
                </CardHeader>
                <CardBody>
                    <Text>Description: {meal.meal_description}</Text>
                    <Text>Total Calories: <b className='text-teal-600'>{meal.calories}</b></Text>
                </CardBody>
                <Button onClick={onOpen}>Click for details</Button>
            </Card>

            {/* Modal for Meal Card */}

            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior='outside' isCentered>
                <ModalOverlay />
                    <ModalContent>
                        <form>
                            <ModalCloseButton size='lg'/>
                            <ModalBody className='mt-10'>
                                <Card key={meal.meal_id} variant='elevated'>
                                    <CardHeader>
                                        <Text><span className='text-teal-600 text-3xl font-bold'>{meal.meal_type}</span></Text>
                                    </CardHeader>
                                    <CardBody>
                                        <Text>Description: {meal.meal_description}</Text>
                                        <Text>Ingridients List:</Text>
                                            {meal?.items.map(ing => (
                                                <div className='ml-2 border border-teal-600 rounded p-4 m-2 text-gray-600'>
                                                    <Text>Ingridient: <b>{ing?.name}</b></Text>
                                                    <Text>Calories: {ing?.calories}</Text>
                                                    <Text>Carbohydrates: {ing?.carbohydrates_total_g} g</Text>
                                                    <Text>Cholesterol: {ing?.cholesterol_mg} mg</Text>
                                                    <Text>Saturated Fat: {ing?.fat_saturated_g} g</Text>
                                                    <Text>Total Fat: {ing?.fat_total_g} g</Text>
                                                    <Text>Fiber: {ing?.fiber_g} g</Text>
                                                    <Text>Potassium: {ing?.potassium_mg} mg</Text>
                                                    <Text>Protein: {ing?.protein_g} g</Text>
                                                    <Text>Serving Size: {ing?.serving_size_g} g</Text>
                                                    <Text>Sodium: {ing?.sodium_mg} mg</Text>
                                                    <Text>Sugar: {ing?.sugar_g} g</Text>
                                                </div>
                                            ))}
                                        <Text>Total Calories: <b className='text-teal-600'>{meal.calories}</b></Text>
                                    </CardBody>
                                </Card>
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme='red' size='md' m={3} onClick={() => {purgeMeal(meal), onClose()}}>
                                    Remove
                                </Button>
                                <Button colorScheme='teal' size='md' onClick={onClose}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </form>
                    </ModalContent>
             </Modal>
        </>
     );
}
 
export default MealDisplayInfo;