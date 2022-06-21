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

const Alert: FC<{
  submit: Function;
  AlertBody?: ReactElement<typeof Signup>;
  title: string;
}> = ({ AlertBody, submit, title }) => {
  const [handler, setHandler] = useState<Function | undefined>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  return (
    <Box>
      <Button width={"full"} onClick={onOpen} >
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
          <AlertDialogBody>{AlertBody}</AlertDialogBody>
          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={onClose}
              background="red.500"
              color={"white"}
            >
              Cancel
            </Button>
            <Button
              onClick={() => submit()}
              color={"white"}
              background={"green.400"}
              ml={3}
            >
              Submit
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};
export default Alert;
