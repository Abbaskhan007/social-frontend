import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RiUserSettingsLine } from "react-icons/ri";
import { ImLocation2 } from "react-icons/im";
import { BsBriefcase } from "react-icons/bs";
import { AiOutlineTwitter, AiFillLinkedin } from "react-icons/ai";
import { MdOutlineModeEdit } from "react-icons/md";
import { NavLink, useParams } from "react-router-dom";
import Axios from "axios";
import RemoveFriend from "./RemoveFriend";
import AddFriend from "./AddFriend";

export default function ProfileDataWidget() {
  const mode = useSelector(state => state.mode);
  const self = useSelector(state => state.user);
  const [isFriend, setIsFriend] = useState(false);
  const [user, setUser] = useState(null);

  const { id } = useParams();
  const getUser = async () => {
    const { data } = await Axios.get(`/api/user/${id}`);
    setUser(data);
    console.log("Data of user in profile data widget ---", data);
  };

  useEffect(() => {
    getUser();
  }, [self]);

  useEffect(() => {
    if (Boolean(user)) {
      const friendsList = user.friendsList.map(friend => friend?._id);
      console.log(
        "*****************************",
        friendsList,
        self._id.toString()
      );
      setIsFriend(friendsList.includes(self?._id.toString()));
    }
  }, [self, user]);

  console.log("Is friend", isFriend);
  if (Boolean(user)) {
    return (
      <div
        style={{ backgroundColor: mode.themeColor }}
       
        className={`p-3 ${
          mode.theme === "dark" ? "text-gray-400" : "text-gray-500"
        } rounded-md`}
      >
        <div className="flex items-center space-x-3 border-b border-gray-400 pb-3 ">
          <img className="w-10 h-10 rounded-full" src={user.image} />

          <div className="flex-1 flex flex-col ">
            <h3
              className={`text-lg ${
                mode.theme === "dark" ? "text-gray-200" : "text-gray-700"
              } `}
            >
              {user.firstName} {user.lastName}
            </h3>

            <span className="text-xs">{user.friendsList.length} friends</span>
          </div>
          {user._id !== self._id &&
            (isFriend ? (
              <RemoveFriend friendId={user._id} userId={self._id} />
            ) : (
              <AddFriend friendId={user._id} userId={self._id} />
            ))}
        </div>
        <div className="flex flex-col space-y-3 py-4 border-b border-b-gray-400">
          <div className="flex items-center space-x-4">
            <ImLocation2 size={20} />
            <span className="text-sm">{user.location}</span>
          </div>
          <div className="flex items-center space-x-4">
            <BsBriefcase size={20} />
            <span className="text-sm">{user.occupation}</span>
          </div>
        </div>

        <div className="pt-4 space-y-2 "></div>
      </div>
    );
  } else {
    return <div />;
  }
}
