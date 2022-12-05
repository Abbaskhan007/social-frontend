import Axios from "axios";
import React from "react";
import { BsPersonDashFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { setFriends } from "../State";
import url from "../constants";

export default function RemoveFriend({ userId, friendId }) {
  const dispatch = useDispatch();
  console.log("user --- Id -- d:", userId, friendId);

  const removeFriend = async () => {
    const { data } = await Axios.post(`${url}/api/user/updateFriend`, {
      userId,
      friendId,
    });
    console.log("Data", data);
    dispatch(setFriends(data.user.friendsList));
  };
  return (
    <div
      onClick={removeFriend}
      className="bg-cyan-400/20 p-[6px] rounded-full cursor-pointer"
    >
      <BsPersonDashFill className="text-cyan-300" size="14" />
    </div>
  );
}
