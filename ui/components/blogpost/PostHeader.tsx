import React from "react";
import Image from "next/image";
interface Props {
  title: string;
  author: string;
  date: Date;
  avatar: string;
}
const PostHeader = ({ title, author, date, avatar }: Props) => {
  return (
    <div className="w-full flex justify-between gap-1 p-1">
      <h1 className="text-2xl">{title}</h1>
      <div className="flex items-center gap-2">
        <div className="flex flex-col ">
          <b>{author}</b>
          <em className="text-slate-400 -m-1">{date.toLocaleDateString()}</em>
        </div>
        {avatar ? (
          <Image src={avatar} alt={"avatar"} />
        ) : (
          <div className="w-8 h-8 bg-gray-400 rounded-full" />
        )}
      </div>
    </div>
  );
};
export default PostHeader;
