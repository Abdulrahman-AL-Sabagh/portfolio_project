import React from "react";
import Image from "next/image";
import styles from "./Post.module.scss";
interface Props {
  title: string;
  author: string;
  date: Date;
  avatar: string;
}
const PostHeader = ({ title, author, date, avatar }: Props) => {
  return (
    <div className={styles.postHeader}>
      <h1>{title}</h1>
      <div className={styles.info}>
        <div>
          <b>{author}</b>
          <em>{date.toLocaleDateString()}</em>
        </div>
        {avatar ? (
          <Image src={avatar} alt={"avatar"} />
        ) : (
          <div className={styles.avatar} />
        )}
      </div>
    </div>
  );
};
export default PostHeader;
