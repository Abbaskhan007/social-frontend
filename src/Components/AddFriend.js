import Axios from "axios";
import React from "react";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { setFriends } from "../State";

export default function AddFriend({ userId, friendId }) {
  const dispatch = useDispatch();

  const addFriend = async () => {
    const { data } = await Axios.post("/api/user/updateFriend", {
      userId,
      friendId,
    });
    console.log("Data", data);
    dispatch(setFriends(data.user.friendsList));
  };
  return (
    <div
      onClick={addFriend}
      className="bg-cyan-400/20 p-[6px] rounded-full cursor-pointer"
    >
      <BsFillPersonPlusFill className="text-cyan-300" size="14" />
    </div>
  );
}
