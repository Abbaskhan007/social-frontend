import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FriendRow from "./FriendRow";
import url from "../constants";

export default function FriendsList() {
  const mode = useSelector(state => state.mode);
  const user = useSelector(state => state.user);
  const [friends, setFriends] = useState([]);
  const getFriends = async () => {
    console.log("--------- Running");
    const { data } = await Axios.post(`${url}/api/user/getFriends`, {
      user: user._id,
    });
    setFriends(data.friendsList);
  };
  useEffect(() => {
    getFriends();
  }, [user]);

  console.log("-------", friends);
  return (
    <div
      style={{ backgroundColor: mode.themeColor }}
      className="p-4 rounded-md"
    >
      <h3
        className={`${
          mode.theme === "dark" ? "text-gray-200" : "text-gray-600"
        }`}
      >
        Friend List
      </h3>
      <div className="mt-3">
        {friends?.map(friend => (
          <FriendRow user={user} friend={friend} />
        ))}
      </div>
    </div>
  );
}
