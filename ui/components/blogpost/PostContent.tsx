import React from "react";
import Image from "next/image";
import styles from "./Post.module.scss";
interface Props {
  content: string;
  image: string;
}
const PostContent = ({ content, image }: Props) => {
  return (
    <div className={styles.content}>
      <Image sizes="100%" src={image} alt={""} width={1000} height={1000} />
      <article className="p-1">{content}</article>
    </div>
  );
};

export default PostContent;
