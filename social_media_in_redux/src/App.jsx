// import { Divider, List, } from 'antd';
import { Avatar, Card, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import "./app.css";
import { Button } from "antd";
import { addPost, removePost, updatePost } from "./post/postSlice";
import { useState } from "react";
import { uid } from "uid";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

function App() {
  return (
    <div>
      <PostList></PostList>
    </div>
  );
}

export default App;

const { Meta } = Card;

const PostList = () => {
  const post = useSelector((state) => state.post);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postId, setPostId] = useState("");

  // const [loading, setLoading] = useState(true);
  const [displayUpdateButton, setDisplayUpdateButton] = useState(true);

  const dispatch = useDispatch();

  const handleUpdatePost = (id) => {
    post.map((post) => {
      if (post.id === id) {
        setTitle(post.title);
        setContent(post.content);
        setPostId(post.id);
      }
    });

    setDisplayUpdateButton(false);
  };

  return (
    <div className="outer-center">
      <Input
        placeholder="Enter the title of Post"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        placeholder="Enter the content of Post "
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {displayUpdateButton ? (
        <Button
          danger
          type="dashed"
          size="large"
          onClick={() => {
            const newPost = {
              id: uid(),
              title: title,
              content: content,
            };

            dispatch(addPost(newPost));
            setContent("");
            setTitle("");
          }}
        >
          Add Post
        </Button>
      ) : (
        <Button
          onClick={() => {
            const upPost = {
              title: title,
              content: content,
              id: postId,
            };
            console.log(upPost);

            dispatch(updatePost(upPost));
            setTitle("");
            setContent("");
          }}
        >
          Update
        </Button>
      )}

      <br />
      {post.map((postItem) => {
        return (
          <Card style={{ width: 300, marginTop: 16 }} key={postItem.id}>
            <Meta
              avatar={
                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
              }
              title={postItem.title}
              description={postItem.content}
            />
            <Button
              icon={<DeleteOutlined />}
              onClick={() => dispatch(removePost(postItem.id))}
            />
            <Button
              icon={<EditOutlined />}
              onClick={() => handleUpdatePost(postItem.id)}
            />
          </Card>
        );
      })}
    </div>
  );
};