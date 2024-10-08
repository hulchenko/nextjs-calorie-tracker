import { useMeal } from "@/app/context/MealContext";
import { getDefaultMeal, getFoodData } from "@/lib/mealUtils";
import { Meal } from "@/types/Meal";
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
  useToast,
} from "@chakra-ui/react";
import { faPlus, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const MealInputForm = ({ readOnly, setSaveReady }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure(); // modal props
  const { mealList, setMealList } = useMeal();

  const defaultMeal = getDefaultMeal();

  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [delayedFetch, setDelayedFetch] = useState(query);
  const [meal, setMeal] = useState<Meal>(defaultMeal);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // search and get nutritions
    if (query.length >= 3 && delayedFetch) {
      const getFood = async () => {
        await getFoodData(query, setMeal, setLoading, toast);
        setSearched(true);
      };
      getFood();
    }
  }, [delayedFetch]);

  useEffect(() => {
    setSearched(false);
    const delayHandler = setTimeout(() => setDelayedFetch(query), 1500); // delay fetch by 1.5 seconds after the user interracted with the input field
    return () => clearTimeout(delayHandler); // reset if the user starts typing again
  }, [query]);

  useEffect(() => {
    if (!isOpen) {
      setMeal(defaultMeal); // clean up modal if it wasn't submitted
    }
  }, [isOpen]);

  const mealAddHandler = (event) => {
    event?.preventDefault();

    setMealList([...mealList, meal]);
    setSaveReady(true);
    setSearched(false);
  };

  return (
    <>
      {mealList?.length === 0 && (
        <div className="flex flex-col items-center">
          <h1 className="text-4xl mt-20 sm:mt-0">No meals</h1>
          <p className="text-base py-4">
            {"Looks like you haven't added any meals."}
          </p>
          <button
            className="bg-teal-700 text-white py-4 p-6 mt-2 rounded hover:bg-teal-600"
            onClick={onOpen}
            hidden={readOnly}
          >
            Add Meal
            <FontAwesomeIcon className="ml-2" icon={faUtensils} />
          </button>
        </div>
      )}
      {mealList?.length > 0 && mealList?.length < 9 && (
        <button
          className="fixed bottom-1 right-4 bg-teal-700  text-white py-4 p-6 mt-2 rounded lg:bottom-40 lg:right-52 hover:bg-teal-600"
          onClick={onOpen}
          hidden={readOnly}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      )}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="outside"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={mealAddHandler}>
            <ModalHeader className="text-teal-700">Add a New Meal</ModalHeader>
            <ModalCloseButton size="lg" />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Type</FormLabel>
                <InputGroup size="lg">
                  <Select
                    focusBorderColor="teal.600"
                    placeholder="Please Select"
                    onChange={(e) =>
                      setMeal({ ...meal, meal_type: e.target.value })
                    }
                  >
                    <option value="Breakfast">Breakfast</option>
                    <option value="Brunch">Brunch</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Supper">Supper</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Midnight Snack">Midnight Snack</option>
                    <option value="Other">Other</option>
                    Option
                  </Select>
                </InputGroup>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <InputGroup size="lg">
                  <Input
                    focusBorderColor="teal.600"
                    placeholder="e.g. 2 eggs and a toast"
                    onChange={(e) => {
                      setQuery(e.target.value),
                        setMeal({
                          ...meal,
                          meal_description: e.target.value,
                        });
                    }}
                  />
                </InputGroup>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Nutrition List</FormLabel>
                <Stack
                  className={`border rounded p-4 ${
                    meal.items.length ? "border-teal-600" : "border-gray-200"
                  }`}
                >
                  {loading && (
                    <span className="w-full flex text-center justify-center text-teal-600">
                      <Spinner />
                    </span>
                  )}
                  {meal.items.length &&
                    meal.items.map((i, index) => (
                      <div key={index}>
                        <Text>
                          Ingridient(s): <b>{i?.name}</b>
                        </Text>
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
                  {!meal.items.length && searched && (
                    <Text className="text-orange-500">
                      Nothing is found. Update description and try again.
                    </Text>
                  )}
                </Stack>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>
                  Total Calories:{" "}
                  <b className="text-teal-600">{meal?.calories || 0}</b>
                </FormLabel>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="teal"
                mr={3}
                type="submit"
                isDisabled={meal.items.length === 0 || meal.meal_type === ""}
                onClick={onClose}
              >
                Add
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MealInputForm;
