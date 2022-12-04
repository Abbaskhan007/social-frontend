import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import Axios from "axios";

import { useParams } from "react-router-dom";

export default function ProfilePosts() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const { data } = await Axios.get(`/api/post/${id}/getFeed`);
    setPosts(data);
    console.log("Data of posts ---", data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {posts.length > 0 ? (
        posts.map(post => <PostCard post={post} />)
      ) : (
        <h2 className="text-gray-400 text-3xl text-center mt-20">
          NOT POSTED YET
        </h2>
      )}
    </div>
  );
}
