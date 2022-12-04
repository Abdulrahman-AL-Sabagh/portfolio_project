import Image from "next/image";
import {
  BookBookmark,
  ChatText,
  DotsThreeOutlineVertical,
  Export,
  IconProps,
  ThumbsUp,
} from "phosphor-react";
import { FC, useState } from "react";
import Post from "../components/blogpost/Post";
//TODO fetch all of blog post elements and render them
const Home = () => {
  return (
   <div className="w-full h-full flex flex-col justify-center items-center gap-8">
<Post />
<Post />
<Post />
<Post />

   </div> 
  )
};









export default Home;
