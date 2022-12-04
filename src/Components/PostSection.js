import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "./PostCard";
import Axios from "axios";
import { setPosts } from "../State";

export default function PostSection() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts);
  

  const getPosts = async () => {
    const { data } = await Axios.get("/api/post/getFeed");
    dispatch(setPosts(data));
    console.log("Data of posts ---", data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {posts.map(post => (
        <PostCard post={post} />
      ))}
    </div>
  );
}
