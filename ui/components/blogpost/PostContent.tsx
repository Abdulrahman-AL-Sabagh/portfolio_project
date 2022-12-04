import React from "react";
import Image from "next/image";

interface Props {
  content: string;
  image: string;
}
const PostContent = ({ content, image }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <Image className="w-full" src={image} alt={""} width={500} height={500} />
      <article className="p-1">{content}</article>
    </div>
  );
};

export default PostContent;
