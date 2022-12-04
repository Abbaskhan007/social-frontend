import React from "react";
import { useSelector } from "react-redux";
import { RiUserSettingsLine } from "react-icons/ri";
import { ImLocation2 } from "react-icons/im";
import { BsBriefcase } from "react-icons/bs";
import { AiOutlineTwitter, AiFillLinkedin } from "react-icons/ai";
import { MdOutlineModeEdit } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ProfileWidget() {
  const mode = useSelector(state => state.mode);
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  return (
    <div
      style={{ backgroundColor: mode.themeColor }}
      className={`p-3 md:fixed md:w-[24%] ${
        mode.theme === "dark" ? "text-gray-400" : "text-gray-500"
      } rounded-md`}
    >
      <div className="flex items-center space-x-3 border-b border-gray-400 pb-3 ">
        <NavLink to={`/profile/${user._id}`}>
          <img className="w-10 h-10 rounded-full" src={user.image} />
        </NavLink>
        <div className="flex-1 flex flex-col ">
          <NavLink to={`/profile/${user._id}`}>
            <h3
              className={`text-lg ${
                mode.theme === "dark" ? "text-gray-200" : "text-gray-700"
              } `}
            >
              {user.firstName} {user.lastName}
            </h3>
          </NavLink>
          <span className="text-xs">{user.friendsList.length} friends</span>
        </div>

        <RiUserSettingsLine
          size={20}
          className={`cursor-pointer ${
            mode.theme === "dark" ? "text-gray-200" : "text-gray-800"
          }`}
          onClick={() => navigate(`/updateProfile/${user._id}`)}
        />
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
      <div className="flex flex-col py-3 border-b border-gray-400">
        <div className="flex items-center justify-between">
          <span className="text-xs">Who's viewed your profile</span>
          <span
            className={`text-sm font-medium ${
              mode.theme === "dark" ? "text-gray-200" : "text-gray-500"
            }`}
          >
            {user.viewedProfile}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs">Impressions of your post</span>
          <span
            className={`text-sm font-medium ${
              mode.theme === "dark" ? "text-gray-200" : "text-gray-500"
            }`}
          >
            {user.impression}
          </span>
        </div>
      </div>
      <div className="pt-4 space-y-2 ">
        <p className="font-medium">Social Profiles</p>
        <div className="flex items-center space-x-2">
          <AiOutlineTwitter size={24} />
          <div className="flex-1 flex flex-col">
            <p className="text-xs text-gray-400 font-medium mb-[2px]">
              Twitter
            </p>
            <span className="text-xs ">Social Profile</span>
          </div>
          <MdOutlineModeEdit size={20} className="text-gray-400" />
        </div>
        <div className="flex items-center space-x-2">
          <AiFillLinkedin size={24} />
          <div className="flex-1 flex flex-col">
            <p className="text-xs text-gray-400 font-medium mb-[2px]">
              Facebook
            </p>
            <span className="text-xs ">Social Profile</span>
          </div>
          <MdOutlineModeEdit size={20} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
}
