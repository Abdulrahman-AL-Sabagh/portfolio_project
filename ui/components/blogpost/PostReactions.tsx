import styles from "./Post.module.scss";
const PostReactions = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.postReactions}>{children}</div>;
};

export default PostReactions;
  	