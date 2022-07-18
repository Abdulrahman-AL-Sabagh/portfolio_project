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
  DEFAULT_ICONS_SETTINGS,
  ACTIVATED_ICONS_SETTINGS,
  PostIcons,
  myIconProps,
  IconSettingsValuesTypes,
} from "../icons";
import IconWithText from "./IconWithText";
import CommentSection from "./CommentSection";

type icons = { [K in PostIcons]: IconSettingsValuesTypes };
const Post: FC<{
  userName: string;
  userAvatar: string;
  postImage: string;
  publishedAt: string;
  postContent: string;
}> = ({ userName, userAvatar, publishedAt, postImage, postContent }) => {
  const [iconChanges, setIconChanges] = useState<icons>({
    bookmark: DEFAULT_ICONS_SETTINGS.bookmark,
    like: DEFAULT_ICONS_SETTINGS.like,
    comment: DEFAULT_ICONS_SETTINGS.comment,
    share: DEFAULT_ICONS_SETTINGS.share,
    moreDetails: DEFAULT_ICONS_SETTINGS.moreDetails,
  });

  const [commentsVisibility, setCommentsVisibility] =
    useState<"block" | "none">("none");

  function changeIconSettings(name: PostIcons) {
    setIconChanges((prevState) => ({
      ...prevState,
      [name]:
        iconChanges[name] === DEFAULT_ICONS_SETTINGS[name]
          ? ACTIVATED_ICONS_SETTINGS[name]
          : DEFAULT_ICONS_SETTINGS[name],
    }));
  }

  const interactionIcons: myIconProps[] = [
    {
      icon: ThumbsUp,
      handleClick: () => changeIconSettings("like"),
      weight: iconChanges.like.weight,
      color: iconChanges.like.color,
      iconName: "like",
    },
    {
      icon: ChatText,
      iconName: "comment",
      handleClick: () => {
        setCommentsVisibility(commentsVisibility === "none" ? "block" : "none");
        changeIconSettings("comment");
      },
      weight: iconChanges.comment.weight,
      color: iconChanges.comment.color,
    },
    {
      icon: ArrowBendDoubleUpLeft,
      iconName: "share",
      handleClick: () => changeIconSettings("share"),
      weight: iconChanges.share.weight,
      color: iconChanges.share.color,
    },
  ];

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
            handleClick={() => changeIconSettings("bookmark")}
            weight={iconChanges.bookmark.weight || "light"}
            color={iconChanges.bookmark.color}
            icon={BookBookmark}
            iconName={"like"}
          />
          <RoundedIcon
            handleClick={() => changeIconSettings("moreDetails")}
            weight={iconChanges.moreDetails.weight}
            color={iconChanges.moreDetails.color}
            icon={DotsThreeVertical}
            iconName={"moreDetails"}
          />
        </Flex>
      </Flex>

      <Container p={20} width={"full"} height={"auto"} my={20}>
        <Text fontSize={24}>{postContent}</Text>
      </Container>
      <Image src={postImage} alt={"bla bla"} width={"full"} height={"auto"} />

      <Flex
        flexDirection={"column"}
        width={"full"}
        height={"fit-content"}
        background={COLORS.primary}
        borderBottomRadius={20}
      >
        <Flex
          height={100}
          max-height={100}
          justifyContent={"space-around"}
          width={"full"}
          px={20}
        >
          {interactionIcons.map((interactionIcon) => (
            <IconWithText
              key={interactionIcon?.iconName}
              {...interactionIcon}
            />
          ))}
        </Flex>

        <CommentSection visibility={commentsVisibility} />
      </Flex>
    </Container>
  );
};
export default Post;
