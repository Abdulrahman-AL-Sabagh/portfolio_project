/** @format */

import { Box, Flex, Input, Text } from "@chakra-ui/react";

import React, { FC } from "react";
import { useFormContext } from "react-hook-form";
import { MyInput } from "../interfaces";
import { DevTool } from "@hookform/devtools";

const Signup: FC = () => {
  const {
    register: registerSignup,
    formState: { errors: errorsSignup },
    control
  } = useFormContext();
  const myInputs: MyInput[] = [
    {
      name: "name",
      type: "text",
      validation: {
        minLength: 3,
        required: true,
      },
    },
    {
      name: "email",
      type: "email",
      validation: {
        required: true,
        pattern: /^(\S){3,}@([A-z]){3,}.([A-z]\S\D{1,})$/,
      },
    },
    {
      name: "password",
      type: "password",
      validation: {
        required: true,
        minLength: 3,
      },
    },
    {
      name: "confirmPassword",
      type: "password",
      validation: {
        required: true,
        minLength: 3,
      },
    },
  ];

  return (
    <Flex
      height={"max-content"}
      justify={"center"}
      flex="1"
      direction="column"
      width={"full"}
    >
      {myInputs.map(({ name, type, validation }) => (
        <Box key={name}>
          <Input
            placeholder={name}
            {...registerSignup(name, validation)}
            type={type}
            size={"lg"}
            margin="5px"
            variant={"flushed"}
            isRequired
          />
          {errorsSignup[name]?.type === "required" && (
            <Text color={"red.400"}>This field is required</Text>
          )}

          {errorsSignup[name]?.type === "minLength" && (
            <Text color={"red.400"}>
              {name} must contain {validation.minLength} characters
            </Text>
          )}

          {errorsSignup[name]?.type === "pattern" && (
            <Text color={"red.400"}>Not a real {name}</Text>
          )}
        </Box>
      ))}
      <DevTool control={control}/>
    </Flex>
  );
};
export default Signup;
