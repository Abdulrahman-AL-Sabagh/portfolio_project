/* eslint-disable react/no-children-prop */
import type { NextPage } from "next";
import React, { useState } from "react";
import updateStateObject from "../lib/stateobject";
import Button from "../components/Button";
import TextField from "../components/inputs/Textfield";
import Modal from "../components/Modal";
import { postToTheServer } from "../fetch";
import { useRouter } from "next/router";
const Home: NextPage = () => {
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function authenticateUser() {
    postToTheServer("http://localhost:8000/auth/login", credentials, {
      mode: "cors",
      credentials: "include",
    })
      .then((response: Response) => {
        console.log(response.body);
        if (response.ok) {
          router.push("/home");
        }
      })
      .catch(console.error);
  }

  async function register() {
    await postToTheServer("http://localhost:8000/auth/signup", registerData, {
      mode: "cors",
      credentials: "include",
    })
      .then((response: Response) => {
        if (response.ok) router.push("/home");
      })
      .catch(console.error);
  }

  return (
    <>
      <div className=" absolute  z-10 w-full h-screen p-4 flex justify-center items-center">
        <div className="w-1/3 flex shadow-2xl shadow-slate-600 p-4 flex-col gap-4 justify-center items-center">
          <h1 className="text-xl text-center">
            Welcome to <br /> <b className="text-sky-500">All in App</b>
          </h1>

          <div className="w-full mt-2 flex justify-center items-center flex-col gap-4">
            <TextField
              label="email"
              placeholder="enter your password"
              type={"email"}
              value={credentials.email}
              onChange={(email: string) =>
                setCredentials((prev) => ({ ...prev, email }))
              }
            />
            <TextField
              label="password"
              placeholder="enter your password"
              type={"password"}
              value={credentials.password}
              onChange={(password: string) =>
                setCredentials((prev) => ({ ...prev, password }))
              }
            />
          </div>
          <div className="w-full flex flex-col mt-8 h-fit gap-2 items-center ">
            <Button
              handler={authenticateUser}
              className={"bg-green-500 w-40 "}
              children={<>Submit</>}
              isDisabled={Object.values(credentials).some(
                (value) => value === ""
              )}
            />
            <Button
              handler={() => setModalIsOpen(true)}
              className={"text-blue-500  w-fit  "}
              children={<>Register</>}
            />
          </div>
        </div>
      </div>
      {modalIsOpen && (
        <Modal title="Creating a new account" open={modalIsOpen}>
          <div className=" flex flex-col w-full gap-8">
            <div className="flex flex-col gap-2">
              <TextField
                value={registerData.name}
                type={"text"}
                label={"Name"}
                onChange={(value: string) =>
                  updateStateObject(
                    [registerData, setRegisterData],
                    ["name", value]
                  )
                }
              />
              <TextField
                value={registerData.email}
                type={"email"}
                label={"Email"}
                onChange={(value: string) => [
                  updateStateObject(
                    [registerData, setRegisterData],
                    ["email", value]
                  ),
                ]}
              />
              <TextField
                value={registerData.password}
                type={"password"}
                label={"Password"}
                onChange={(value: string) =>
                  updateStateObject(
                    [registerData, setRegisterData],
                    ["password", value]
                  )
                }
              />
              <TextField
                value={registerData.confirmPassword}
                type={"password"}
                label={"Confirm password"}
                onChange={(value: string) =>
                  updateStateObject(
                    [registerData, setRegisterData],
                    ["confirmPassword", value]
                  )
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Button
                handler={() => setModalIsOpen(false)}
                className={"bg-red-400 "}
              >
                Cancel
              </Button>
              <Button
                className="bg-green-500 "
                handler={() => {
                  register();
                }}
              >
                Create my Account
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Home;
