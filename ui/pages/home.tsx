import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Post from "../components/blogpost/Post";
import styles from "./Home.module.scss";
import FloatActionButton from "../components/FloatActionButton";
import Modal from "../components/Modal";
import TextField from "../components/inputs/Textfield";
import updateStateObject from "../lib/stateobject";
import Textarea from "../components/inputs/Textarea";
import {
  allowedImageTypes,
  imageTypeValidator,
} from "../lib/filetype-validator";
import { postToTheServer, uploadImage } from "../fetch";
import Button from "../components/Button";
const Home = ({}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const router = useRouter();
  const [blogPostData, setBlogPostData] = useState({
    title: "",
    content: "",
    image: "",
  });

  const clearObject = () => {
    setBlogPostData({ title: "", content: "", image: "" });
  };
  useEffect(() => {}, []);

  return (
    <>
      <div className={styles.Home}>
        <div className={styles.sidebar}>
          <ul>
            <li>Home</li>
            <li>Calender</li>
            <li>Profile</li>
            <li>Settings</li>
            <li>Freinds</li>
            <li>Chat</li>
            <li>Bookmarks</li>
            <li>
              TODOS
              <ul>
                {[...new Array(5)].map((_, i) => (
                  <li key={"TODO-" + i}>{`${i} todo `}</li>
                ))}
              </ul>
            </li>
            <li>
              Unreaded messages
              <ul>
                {[...new Array(5)].map((_, i) => (
                  <li key={"TODO-" + i}>{`${i} todo `}</li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
        <div className={styles.posts}>
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
      <FloatActionButton handler={() => setModalIsOpen(true)} />
      <Modal title={"Creating a new blogpost"} open={modalIsOpen}>
        <TextField
          type={"text"}
          value={blogPostData.title}
          onChange={(value: string) =>
            updateStateObject([blogPostData, setBlogPostData], ["title", value])
          }
        />
        <Textarea
          value={blogPostData.content}
          onChange={(value: string) =>
            updateStateObject(
              [blogPostData, setBlogPostData],
              ["content", value]
            )
          }
        />
        <input
          type="file"
          accept={allowedImageTypes.join(", ")}
          onChange={async (e) => {
            if (!e.target.files || !e.target.files[0]) return;
            const file = e.target.files[0] ?? "";
            const imageUrl = (await uploadImage(file)).url;
            updateStateObject(
              [blogPostData, setBlogPostData],
              ["image", imageUrl]
            );
          }}
        />
        <Button
          handler={() => {
            clearObject();
            setModalIsOpen(false);
          }}
          className={""}
        >
          Cancel
        </Button>
        <Button
          handler={() => {
            console.log(blogPostData);
            postToTheServer("http://localhost:8000/blog", blogPostData);
          }}
        >
          Create a new post
        </Button>
      </Modal>
    </>
  );
};

export default Home;
