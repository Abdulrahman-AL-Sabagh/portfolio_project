/** @format */

import { Container, Flex, Textarea, Text, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import COLORS from "../color";
import Dropzone, { useDropzone } from "react-dropzone";

const PostGenerator = () => {
  const [files, setFiles] = useState({});
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFiles((prevFiles) =>
        acceptedFiles.reduce(
          (acc, file) => ({
            ...acc,
            [file.name]: {
              file,
              fileType: "",
            },
          }),
          prevFiles
        )
      );
    },
  });

  return (
    <Flex direction={"column"} maxW={750} h={"fit-content"}>
      <Textarea background={COLORS.primary} h={100} />
      <Flex backgroundColor={COLORS.secondary} {...getRootProps()}>
        <Input {...getInputProps()} />
        <Text>Drag 'n' drop some files here, or click to select files</Text>
      </Flex>
    </Flex>
  );
};
export default PostGenerator;
