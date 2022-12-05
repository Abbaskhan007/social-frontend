import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AiOutlineHeart, AiFillHeart, AiOutlineShareAlt } from "react-icons/ai";
import { IoSendSharp } from "react-icons/io5";
import { BiMessage } from "react-icons/bi";
import RemoveFriend from "./RemoveFriend";
import AddFriend from "./AddFriend";
import Axios from "axios";
import { setPost } from "../State";
import { NavLink } from "react-router-dom";
import url from "../constants";

export default function PostCard({ post }) {
  const mode = useSelector(state => state.mode);
  const user = useSelector(state => state.user);
  const [isFriend, setIsFriend] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [viewComments, setViewComments] = useState(false);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const friendsList = user.friendsList;
    console.log("post---", post);
    setIsFriend(friendsList.includes(post.user?._id?.toString()));
  }, [user]);

  const likesCount = Object.keys(post.likes)?.length;

  const handleLike = async () => {
    const { data } = await Axios.patch(
      `${url}/api/post/likePost/${user._id}/${post._id}`
    );
    console.log("Data", data);
    dispatch(setPost(data));
  };

  const onComment = async () => {
    const { data } = await Axios.put(`${url}/api/post/comment`, {
      comment,
      userId: user._id,
      postId: post._id,
    });
    dispatch(setPost(data.updatedComments));
    setComment("");
    console.log("Data of comment", data);
  };

  return (
    <div
      className="p-3 rounded-md mb-4 text-gray-400"
      style={{ backgroundColor: mode.themeColor }}
    >
      <div className="flex flex-row items-center space-x-3 mb-2">
        <NavLink to={`/profile/${post.user._id}`}>
          <img
            className="w-10 h-10 rounded-full cursor-pointer"
            src={post?.user?.image}
          />
        </NavLink>
        <div className="flex flex-col flex-1 ">
          <NavLink
            to={`/profile/${post.user._id}`}
            className={`text-sm ${
              mode.theme === "dark" ? "text-gray-200" : "text-gray-700"
            }`}
          >
            {post?.user?.firstName} {post?.user?.lastName}
          </NavLink>
          <p className="text-xs">{post?.user?.location}</p>
        </div>
        {console.log("********", post.user._id !== user._id)}
        {post.user._id !== user._id &&
          (isFriend ? (
            <RemoveFriend friendId={post.user._id} userId={user._id} />
          ) : (
            <AddFriend friendId={post.user._id} userId={user._id} />
          ))}
      </div>
      <p
        className={`text-xs mb-2 ${
          mode.theme === "dark" ? "text-gray-200" : "text-gray-500"
        }`}
      >
        {post.description}
      </p>
      <img
        className="w-full h-full object-contain rounded-md"
        src={post.image}
      />
      <div className="flex flex-row items-center mt-3 space-x-5 text-sm">
        <div className="flex items-center space-x-1">
          {Boolean(post.likes[user._id]) ? (
            <AiFillHeart
              className="text-cyan-400 cursor-pointer"
              onClick={handleLike}
              size={20}
            />
          ) : (
            <AiOutlineHeart
              className="cursor-pointer"
              onClick={handleLike}
              size={20}
            />
          )}
          <span>{likesCount}</span>
        </div>
        <div className="flex items-center space-x-1">
          <BiMessage size={20} />
          <span>{post.comments.length}</span>
        </div>
        <div className="flex-1" />

        <AiOutlineShareAlt size={20} />
      </div>
      <div className="flex flex-row items-center space-x-4 mt-3 ">
        <input
          value={comment}
          onChange={e => setComment(e.target.value)}
          type="text"
          placeholder="Write a comment"
          className={`${
            mode.theme === "dark"
              ? "bg-zinc-700 focus:bg-zinc-600"
              : "bg-gray-50"
          } text-sm text-gray-400 w-full outline-none border-none px-4 py-[6px]  rounded-md`}
        />
        <IoSendSharp
          onClick={onComment}
          size={22}
          className={`cursor-pointer ${
            comment.length > 0 ? "text-cyan-400" : "text-gray-400"
          }`}
        />
      </div>
      <h5
        onClick={() => setViewComments(!viewComments)}
        className="text-sm text-underline mt-3 underline cursor-pointer"
      >{`${viewComments ? "Hide" : "View"} ${
        post?.comments?.length
      } comments`}</h5>
      {viewComments && (
        <div className="max-h-[120px] overflow-x-hidden overflow-y-scroll my-2">
          {post.comments.map(cmt => (
            <div className={`flex items-center space-x-3 px-2 mt-3`}>
              <img className="w-9 h-9 rounded-full" src={cmt.user.image} />
              <div
                className={`flex flex-col  flex-1 p-1 px-3 rounded-2xl ${
                  mode.theme === "dark" ? "bg-zinc-700" : "bg-gray-100"
                }`}
              >
                <h6
                  className={`text-sm  ${
                    mode.theme === "dark" ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  {cmt.user.firstName} {cmt.user.lastName}
                </h6>
                <p className="text-xs flex flex-wrap text-gray-400">
                  {cmt.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
