import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Card, CardBody, CardHeader, Heading, Modal, ModalContent, ModalHeader, ModalOverlay, Stack, Text,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  useToast,
  InputRightElement,
  InputGroup,
  FormErrorMessage,
  Select,
  Grid,
  GridItem
 } from '@chakra-ui/react';

const MealDisplayInfo = ({meal}) => {
    console.log(`DISPLAY MEAL: `, meal);
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Grid templateColumns='repeat(5, 1fr)' gap={4}>
                <GridItem colSpan={4}>
                        <Card key={meal.meal_id} variant='elevated' onClick={onOpen} className='cursor-pointer hover:shadow-lg w-80 m-5'>
                            <CardHeader>
                                <Heading><span className='text-teal-600'>{meal.meal_type}</span></Heading>
                            </CardHeader>
                            <CardBody>
                                <Text>Description: {meal.meal_description}</Text>
                                <Text>Total Calories: <b className='text-teal-600'>{meal.calories}</b></Text>
                            </CardBody>
                        </Card>
                    </GridItem>
            </Grid>
            <MealCard props={{meal, isOpen, onClose, onOpen}}/>
        </>
     );
}
 
export default MealDisplayInfo;

const MealCard = ({props}) => {
    const {meal, isOpen, onClose, onOpen} = props;

    return(
            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior='outside'>
                <ModalOverlay />
                    <ModalContent>
                        <form>
                            <ModalCloseButton />
                            <ModalBody className='mt-10'>
                                <Card key={meal.meal_id} variant='elevated'>
                                    <CardHeader>
                                        <Heading><span className='text-teal-600'>{meal.meal_type}</span></Heading>
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
                                <Button colorScheme='red' mr={3} type='submit' isDisabled={meal.items.length === 0 || meal.meal_type === ''} onClick={onClose}>
                                    Remove
                                </Button>
                            </ModalFooter>
                        </form>
                    </ModalContent>
             </Modal>
    )
}