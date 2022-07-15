import { ComponentMeta, ComponentStory } from "@storybook/react/dist/ts3.9/client/preview/types-6-3"
import React from "react";
import Post from "../components/Post"
import fernglas from "./assets/fernglas.jpg"


export default {
  title: "Example/Post",
  component: Post,

  
}as ComponentMeta<typeof Post>

const postTestText=
`Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit dicta praesentium voluptate aliquid obcaecati possimus tenetur, molestias illum, vitae ipsam error deserunt. Praesentium accusantium fugit assumenda exercitationem enim inventore repellendus?
`
export const Primary = () =>  <Post userName={"Abudi"} userAvatar={"../stories/assets/fernglas.jpg"} postImage={"/fernglas.jpg"} publishedAt={"Today"} postContent={"Hello World"}/>
