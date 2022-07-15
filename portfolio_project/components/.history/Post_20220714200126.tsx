/** @format */

import { Avatar, Container, Text, Image, Flex } from "@chakra-ui/react";
import React, { FC } from "react";
import { MdOutlineBookmarks, MdMoreVert } from "react-icons/md";
import COLORS from "../color";
import RoundedIcon from "./RoundedIcon";
const Post: FC<{
  userName: string;
  userAvatar: string;
  postImage: string;
  publishedAt: string;
  postContent: string;
}> = ({ userName, userAvatar, publishedAt, postImage, postContent }) => {
  return (
    <Container
      borderRadius={20}
      color={"white"}
      background={COLORS.secondary}
      maxWidth={750}
    >
      <Flex
        borderRadius={20}
        background={COLORS.primary}
        alignContent={"space-evenly"}
        alignItems={"center"}
        gap={"10px"}
        p={20}
      >
        <Avatar src={userAvatar} width={"80px"} height={"80px"} />
        <Flex direction={"column"} gap={10}>
          <Text margin={0} fontSize={"32px"}>
            {userName}
          </Text>
          <Text margin={0} fontSize={"18px"} color={COLORS.placeholder}>
            {publishedAt}
          </Text>
        </Flex>

        <Flex justifyContent={"space-around"} gap={10} just>
          <RoundedIcon icon={MdOutlineBookmarks} />
          <RoundedIcon icon={MdMoreVert} />
        </Flex>
      </Flex>
      <Container p={20} width={"full"} height={"auto"} my={20}>
        <Text fontSize={24}>
          {postContent} {typeof MdOutlineBookmarks} {typeof MdMoreVert}
        </Text>
      </Container>
      <Image src={postImage} alt={"bla bla"} width={"full"} height={"auto"} />
    </Container>
  );
};
export default Post;
