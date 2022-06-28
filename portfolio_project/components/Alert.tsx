/** @format */

import React, { FC, ReactElement, useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import Signup from "./Signup";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

const Alert: FC<{
  submit: SubmitHandler<FieldValues>;
  AlertBody?: ReactElement<typeof Signup>;
  title: string;
}> = ({ AlertBody, submit, title }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const methods = useForm();
  const {
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = methods;
  return (
    <Box>
      <Button width={"full"} onClick={onOpen}>
        {title}
      </Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent height={"max-content"}>
          <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <FormProvider {...methods}>
            <form onSubmit={(e) => handleSubmit(submit)(e)}>
              <AlertDialogBody>{AlertBody}</AlertDialogBody>
              <AlertDialogFooter>
                <Button
                  ref={cancelRef}
                  onClick={() => {
                    onClose();
                  }}
                  background="red.500"
                  color={"white"}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color={"white"}
                  background={"green.400"}
                  ml={3}
                >
                  Submit
                </Button>
              </AlertDialogFooter>
            </form>
          </FormProvider>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};
export default Alert;
