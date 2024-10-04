"use client";

import { encryptPassword, passwordValidator } from "@/lib/utils";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "../context/SessionProvider";
import React from "react";

const SignUpForm = () => {
  const toast = useToast();
  const router = useRouter();
  const { setSession } = useSession();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password: "",
    target: "",
  });

  const changeHandler = async (event) => {
    const { name, value } = event.target;
    setUserForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (event) => {
    event?.preventDefault(); // prevent modal from closing until successful promise result

    const { password } = userForm;
    const hashedPassword = await encryptPassword(password as string);

    const newUser = { ...userForm, password: hashedPassword };

    const isPasswordValid = await passwordValidator(password as string);
    setIsFormValid(isPasswordValid);

    if (isPasswordValid) {
      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newUser }),
        });
        if (!response.ok) {
          const { error } = await response.json();
          throw error;
        }
        const sessionData = await response.json();
        setSession(sessionData);
        toast({
          title: `Welcome, ${sessionData.user.name}!`,
          status: "success",
        });
        router.push("/dashboard");
      } catch (error) {
        toast({ title: `${error}`, status: "error" });
      }
    }
  };

  return (
    <>
      <div className="flex items-center">
        <p className="mr-1 py-4">Don't have an account?</p>
        <button
          className="bg-white border outline-teal-700 hover:bg-teal-600 hover:text-white py-2 px-2 rounded size-fit"
          onClick={onOpen}
        >
          Sign Up
        </button>
      </div>

      {/* Sign Up modal using Chakra UI */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={submitHandler}>
            <ModalHeader className="text-teal-700">Sign Up</ModalHeader>
            <ModalCloseButton size="lg" />
            <ModalBody pb={6}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <InputGroup size="lg">
                  <Input
                    focusBorderColor="teal.600"
                    name="name"
                    placeholder="Your name"
                    type="text"
                    onChange={changeHandler}
                  />
                </InputGroup>
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Email</FormLabel>
                <InputGroup size="lg">
                  <Input
                    focusBorderColor="teal.600"
                    name="email"
                    placeholder="email@example.com"
                    type="email"
                    onChange={changeHandler}
                  />
                </InputGroup>
              </FormControl>

              <FormControl mt={4} isRequired isInvalid={!isFormValid}>
                <FormLabel>Password</FormLabel>
                <InputGroup size="lg">
                  <Input
                    focusBorderColor="teal.600"
                    pr="4.5rem"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    onChange={changeHandler}
                  />
                  <InputRightElement className="mr-2" width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="md"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {!isFormValid && (
                  <FormErrorMessage>
                    Password must have at least 6 characters. A combination of
                    uppercase and lowercase letters, numbers. Can contain
                    special characters.
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Calorie Target</FormLabel>
                <NumberInput
                  size="lg"
                  focusBorderColor="teal.600"
                  name="target"
                  defaultValue={2400}
                  min={1000}
                  max={9999}
                  onChange={
                    (value) =>
                      changeHandler({ target: { name: "target", value } }) // NumberInput workaround
                  }
                >
                  <NumberInputField />
                </NumberInput>
                <FormHelperText fontSize={12} ml={2}>
                  min: 1000, max: 9999
                </FormHelperText>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="teal" mr={3} type="submit">
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignUpForm;
