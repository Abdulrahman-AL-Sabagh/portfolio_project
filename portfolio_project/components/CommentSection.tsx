/** @format */

import { Avatar, Flex, Divider, Textarea } from "@chakra-ui/react";
import { PaperPlaneRight } from "phosphor-react";
import React, { FC, useState } from "react";
import COLORS from "../color";
import MyButton from "./MyButton";

const CommentSection: FC<{ visibility: "block" | "none" }> = ({
  visibility,
}) => {
  const [comment, setComment] = useState<string>("");
  const buttonsAreVisible: "visible" | "hidden" =
    comment === "" ? "hidden" : "visible";

  return (
    <Flex height={"fit-content"} display={visibility}>
      <Divider
        backgroundColor={COLORS.placeholder}
        h={1}
        w={"98%"}
        display={visibility}
      />
      <Flex height={"fit-content"} direction={"column"} p={20}></Flex>
      <Flex direction={"column"} justifyContent={"flex-end"} p={20} gap={20}>
        <Flex alignContent="center" gap={10}>
          <Avatar width={48} height={48} />
          <Textarea
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setComment(e.target.value)
            }
            verticalAlign={"middle"}
            background={COLORS.secondary}
            color={"white"}
            fontSize={18}
            placeholder="Write your Comment"
            padding={10}
            _placeholder={{
              color: COLORS.placeholder,
              verticalAlign: "middle",
            }}
            outline={"none"}
            borderWidth={"0"}
            resize={"none"}
            width={"100%"}
            minHeight={20}
            height={"auto"}
            borderRadius={"40"}
            lineHeight={1}
            maxHeight={"fit-content"}
            value={comment}
          />
        </Flex>
        <Flex
          justifyContent={"flex-end"}
          css={{ "content-visibility": buttonsAreVisible }}
          gap={10}
        >
          <MyButton
            // eslint-disable-next-line react/no-children-prop
            children={"Cancel"}
            handleClick={() => setComment("")}
            background={COLORS.warning}
          />
          <MyButton
            // eslint-disable-next-line react/no-children-prop
            children={
              <>
                Add
                <PaperPlaneRight size={24} weight="light" />
              </>
            }
            handleClick={() => console.log("Add comment clicked")}
            background={COLORS.success}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
export default CommentSection;
//TODO replace with accordion