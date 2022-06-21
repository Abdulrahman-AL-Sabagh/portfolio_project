/** @format */

import { Flex, Input } from "@chakra-ui/react";

import React, { FC, Dispatch, SetStateAction, ChangeEvent } from "react";
import { IForm, MyInput } from "../interfaces";

const Signup: FC<{
  form: IForm;
  setForm: Dispatch<SetStateAction<IForm>>;
  handleChange(e: ChangeEvent<HTMLInputElement>): void;
}> = ({ form, setForm, handleChange: handleChnage }) => {
  const myInputs: MyInput[] = [
    {
      name: "name",
      type: "text",
    },
    {
      name: "email",
      type: "email",
    },
    {
      name: "password",
      type: "password",
    },
    {
      name: "confirmPassword",
      type: "password",
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
      {myInputs.map(({ name, type }) => (
        <Input
          key={name}
          placeholder={name}
          name={name}
          type={type}
          size={"lg"}
          margin="5px"
          variant={"flushed"}
          isRequired
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChnage(e)}
        />
      ))}
    </Flex>
  );
};
export default Signup;
