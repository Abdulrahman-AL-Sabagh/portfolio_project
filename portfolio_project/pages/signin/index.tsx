/** @format */

import { Input, Button, Flex, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import Alert from "../../components/Alert";
import Signup from "../../components/Signup";
import { IForm, MyInput } from "../../interfaces";
import { useForm } from "react-hook-form";

const Signin = () => {
  const router = useRouter();
  const {register, } = useForm();

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    console.log(form);
    setForm((prevState) => ({ ...prevState, [name]: value }));
  }

  const authentication = async (
    e: React.FormEvent<HTMLFormElement>,
    status: "signin" | "signup",
    form:
      | { email: string; password: string }
      | { name: string; email: string; password: string }
  ) => {
    e.preventDefault();
    console.log(form);
    const URL = `http://localhost:3000/api/${status}`;
    const response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(form),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    (await response.status) === 200 && router.push("/");
  };

  const [form, setForm] = useState<IForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputs: MyInput[] = [
    { name: "email", type: "email" },
    { name: "password", type: "password" },
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
        <form
          onSubmit={(e) =>
            authentication(e, "signin", {
              email: form.email,
              password: form.password,
            })
          }
        >
          {inputs.map(({ name, type }) => (
            <Input
              key={name}
              name={name}
              placeholder={name}
              type={type}
              isRequired
              variant={"flushed"}
              size="md"
              mb={5}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
          ))}
          <Button
            width="full"
            mt={"15"}
            color="white"
            bg="green.400"
            type="submit"
          >
            Submit
          </Button>
        </form>
        <Alert
          title="Signup"
          submit={(e: ChangeEvent<HTMLFormElement>) =>
            authentication(e, "signup", form)
          }
          AlertBody={
            <Signup handleChange={handleChange} form={form} setForm={setForm} />
          }
        />
      </Stack>
    </Flex>
  );
};

Signin.authPage = true;

export default Signin;
