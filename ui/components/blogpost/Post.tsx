import {
  BookmarkSimple,
  Chat,
  DotsThree,
  Share,
  ThumbsUp,
} from "phosphor-react";
import Button from "../Button";
import PostContent from "./PostContent";
import PostHeader from "./PostHeader";
import PostReactions from "./PostReactions";
import styles from "./Post.module.scss";
const Post = () => {
  return (
    <div className={styles.Post}>
      <PostHeader
        title={"Such a nice Universe"}
        author={"Max Muster"}
        date={new Date()}
        avatar={""}
      />
      <PostContent
        content={`Lorem ipsum dolor sit amet,consetetur sadipscing elitr,sed diam nonumy eirmod tempor invidunt ut labore etre magna aliquyam erat,
                 sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor 
                 sit amet Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna  aliquyam erat,
                  sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem psum dolor sit amet.`}
        image={"/static/example.jpg"}
      />
      <PostReactions>
        <Button handler={() => {}} className={"rounded-full bg-gray-300 p-2"}>
          <ThumbsUp size={24} color="black" weight="light" />
        </Button>
        <Button handler={() => {}} className={"rounded-full bg-gray-300 p-2"}>
          <Chat size={24} color="black" weight="light" />
        </Button>
        <Button handler={() => {}} className={"rounded-full bg-gray-300 p-2"}>
          <Share size={24} color="black" weight="light" />
        </Button>
        <Button handler={() => {}} className={"rounded-full bg-gray-300 p-2"}>
          <BookmarkSimple size={24} color="black" weight="light" />
        </Button>
        <Button handler={() => {}} className={"rounded-full bg-gray-300 p-2"}>
          <DotsThree size={24} color="black" weight="light" />
        </Button>
      </PostReactions>
    </div>
  );
};

export default Post;
