import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import AddFriend from "./AddFriend";
import RemoveFriend from "./RemoveFriend";

export default function FriendRow({ friend, user }) {
  const mode = useSelector(state => state.mode);

  return (
    <div className="flex items-center space-x-3  mb-2 ">
      <NavLink to={`/profile/${friend.user}`}>
        <img className="w-10 h-10 rounded-full" src={friend.image} />
      </NavLink>
      <div className="flex-1 flex flex-col ">
        <NavLink to={`/profile/${user._id}`}>
          <h3
            className={`text-sm ${
              mode.theme === "dark" ? "text-gray-300" : "text-gray-500"
            } `}
          >
            {friend.firstName} {friend.lastName}
          </h3>
        </NavLink>
        <span className="text-xs text-gray-400">{friend.location}</span>
      </div>

      <RemoveFriend friendId={friend._id} userId={user._id} />
    </div>
  );
}
