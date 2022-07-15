/** @format */

import { Avatar, Container, Text, Image, Flex } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import {
  BookBookmark,
  DotsThreeVertical,
  ThumbsUp,
  ChatText,
  ArrowBendDoubleUpLeft,
} from "phosphor-react";
import COLORS from "../color";
import RoundedIcon from "./RoundedIcon";
import {
  ICONSDEFAULTSETTINGS,
  ACTIVATEDICONSSETTINGS,
  PostIcons,
} from "../icons";
import IconWithText from "./IconWIthText";




const Post: FC<{
  userName: string;
  userAvatar: string;
  postImage: string;
  publishedAt: string;
  postContent: string;
}> = ({ userName, userAvatar, publishedAt, postImage, postContent }) => {
  const [iconChanges, setIconChanges] = useState({
    bookmark: ICONSDEFAULTSETTINGS.bookmark,
    like: ICONSDEFAULTSETTINGS.like,
    comment: ICONSDEFAULTSETTINGS.comment,
  });

  function changeIconSettings(name: PostIcons) {
    setIconChanges((prevState) => ({
      ...prevState,
      [name]:
        iconChanges[name] === ICONSDEFAULTSETTINGS[name]
          ? ACTIVATEDICONSSETTINGS[name]
          : ICONSDEFAULTSETTINGS[name],
    }));
  }

  const interactionIcons: typeof IconWithText["prototypes"] = {}

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
        p={20}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Flex alignContent={"space-evenly"} alignItems={"center"} gap={"10px"}>
          <Avatar src={userAvatar} width={"80px"} height={"80px"} />
          <Flex direction={"column"} gap={10}>
            <Text margin={0} fontSize={"32px"}>
              {userName}
            </Text>
            <Text margin={0} fontSize={"18px"} color={COLORS.placeholder}>
              {publishedAt}
            </Text>
          </Flex>
        </Flex>
        <Flex justifyContent={"space-around"} gap={10}>
          <RoundedIcon
            iconName="bookmark"
            changeIconSettings={changeIconSettings}
            weight={iconChanges.bookmark.weight}
            color={iconChanges.bookmark.color}
            icon={BookBookmark}
          />
          <RoundedIcon
            iconName="more details"
            weight="bold"
            icon={DotsThreeVertical}
          />
        </Flex>
      </Flex>

      <Container p={20} width={"full"} height={"auto"} my={20}>
        <Text fontSize={24}>{postContent}</Text>
      </Container>
      <Image src={postImage} alt={"bla bla"} width={"full"} height={"auto"} />
      <Flex
        borderBottomRadius={20}
        background={COLORS.primary}
        width={"full"}
        height={100}
        max-height={100}
      >

 

      </Flex>
    </Container>
  );
};
export default Post;
