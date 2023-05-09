// import { Divider, List, } from 'antd';
import { Avatar, Card, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import "./app.css";
import { Button } from "antd";
import { addPost, removePost, updatePost } from "./post/postSlice";
import { useState } from "react";
import { uid } from "uid";
import { DeleteOutlined, EditOutlined, LikeOutlined,CommentOutlined,HeartOutlined } from "@ant-design/icons";

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
        required
      />
      <Input
        placeholder="Enter the content of Post "
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      {displayUpdateButton ? (
        <Button
          danger
          type="dashed"
          size="large"
          onClick={() => {
            if (title !== "" && content !== "") {
              const newPost = {
                id: uid(),
                title: title,
                content: content,
              };

              dispatch(addPost(newPost));
              setContent("");
              setTitle("");
            } else {
              alert("Enter The Post Details");
            }
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
            // console.log(upPost);

            dispatch(updatePost(upPost));
            setTitle("");
            setContent("");
            setDisplayUpdateButton(true);
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
            <br />
            <LikeOutlined twoToneColor="#52c41a" /><CommentOutlined twoToneColor="#52c41a" /> <HeartOutlined twoToneColor="#52c41a" />
          </Card>
        );
      })}
    </div>
  );
};
