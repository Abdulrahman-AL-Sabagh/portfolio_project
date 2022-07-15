import { ComponentMeta, ComponentStory } from "@storybook/react/dist/ts3.9/client/preview/types-6-3"
import React from "react";
import Post from "../components/Post"


export default {
  title: "Example/Post",
  component: Post,

  
}as ComponentMeta<typeof Post>

export const Primary = () =>  <Post userName={"Abudi"} userAvatar={"../stories/assets/fernglas.jpg"} postImage={"C:/Users/abdsa/Desktop/current_projects/portfolio_project\portfolio_project\stories\assets\fernglas.jpg"}/>
