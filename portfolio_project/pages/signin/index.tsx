/**
 * /* eslint-disable react/no-children-prop
 *
 * @format
 */

/**
 * /* eslint-disable react/no-children-prop
 *
 * @format
 */

/** @format */

import { Input, Button, Flex, Stack, Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import Alert from "../../components/Alert";
import Signup from "../../components/Signup";
import { IForm, MyInput } from "../../interfaces";
import { FormProvider, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const Signin = () => {
  const router = useRouter();

  const formMethods = useForm<{ email: string; password: string }>({
    defaultValues: { email: "", password: "" },
  });
  const {
    register,
    watch,
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
  } = formMethods;

  const [email, password] = watch(["email", "password"]);

  const authentication = async (
    data: { email: string; password: string } | IForm,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    console.log(data);
    e.preventDefault();
    const status = Object.keys(data).length === 4 ? "signup" : "signin";
    const URL = `${window.location.origin}/api/${status}`;
    const response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(await response.body);
    (await response.status) === 200 && router.push("/");
  };

  const inputs: MyInput[] = [
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
  ];

  return (
    <Flex
      width="full"
      justify={"center"}
      alignItems="center"
      height="100vh"
      padding={"10px"}
    >
      <Stack
        spacing={5}
        width={"320px"}
        height="fit-content"
        shadow={"lg"}
        p="25px"
      >
        <FormProvider {...formMethods}>
          <form
            onSubmit={(e) => {
              console.log(errors);
              handleSubmit(authentication)(e);
            }}
          >
            {inputs.map(({ name, type, validation }, index) => (
              <Box key={name}>
                <Input
                  {...register(name, validation)}
                  placeholder={name}
                  type={type}
                  variant={"flushed"}
                  size="md"
                  mb={5}
                />

                {errors[name]?.type === "required" && (
                  <Text color={"red.400"}>This field is required</Text>
                )}

                {errors[name]?.type === "minLength" && (
                  <Text color={"red.400"}>
                    {name} must contain {validation.minLength} characters
                  </Text>
                )}

                {errors[name]?.type === "pattern" && (
                  <Text color={"red.400"}>Not a real {name}</Text>
                )}
              </Box>
            ))}

            <Button
              width="full"
              mt={"15"}
              color="white"
              bg="green.400"
              type="submit"
              children={"Submit"}
              isLoading={isSubmitting}
            />
          </form>
        </FormProvider>
        <Alert submit={authentication} title="Signup" AlertBody={<Signup />} />
      </Stack>
      <DevTool control={control} />
    </Flex>
  );
};

Signin.authPage = true;

export default Signin;
