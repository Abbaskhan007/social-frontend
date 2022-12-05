import React, { useRef } from "react";
import { BiGame, BiSearch } from "react-icons/bi";
import { MdDarkMode, MdOutlineMessage, MdNotifications } from "react-icons/md";
import { AiFillQuestionCircle, AiFillCaretDown } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { setLogout, setMode } from "../State";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const searchRef = useRef(null);
  const mode = useSelector(state => state.mode);
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div
      style={{ backgroundColor: mode.themeColor }}
      className="flex items-center justify-between sm:px-20 px-8 py-4 fixed w-full z-20 shadow-md"
    >
      <div className="flex items-center space-x-6">
        <NavLink
          to="/home"
          className="text-cyan-400 text-2xl tracking-[1px] font-bold"
        >
          Sociopedia
        </NavLink>
        <div
          onClick={() => searchRef.current.focus()}
          className={`sm:flex items-center px-4 py-[6px]  hidden ${
            mode.theme === "light" ? "bg-gray-200" : "bg-zinc-700"
          } rounded-md `}
        >
          <input
            ref={searchRef}
            style={{ color: mode.textColor }}
            className={`bg-transparent text-sm outline-none border-none `}
            type="text"
            placeholder="Search..."
          />
          <BiSearch
            size={20}
            color={mode.theme === "light" ? "#9ca3af" : mode.textColor}
          />
        </div>
      </div>
      <div>
        <div className="flex items-center space-x-8">
          <MdDarkMode
            className="hidden sm:inline-flex"
            onClick={() => dispatch(setMode())}
            color={mode.textColor}
            size={24}
          />
          <MdOutlineMessage
            className="hidden sm:inline-flex"
            color={mode.textColor}
            size={24}
          />
          <MdNotifications
            className="hidden sm:inline-flex"
            color={mode.textColor}
            size={24}
          />
          <AiFillQuestionCircle
            className="hidden sm:inline-flex"
            color={mode.textColor}
            size={24}
          />
          {user?._id && (
            <div className="group cursor-pointer bg-transparent relative">
              <div
                style={{
                  backgroundColor:
                    mode.theme === "dark" ? "#3f3f46" : "#e4e4e7",
                }}
                className="flex items-center px-4 py-[6px] justify-between  rounded-md hover:rounded-b-none min-w-[120px]"
              >
                <span
                  style={{
                    color: mode.textColor,
                  }}
                  className=" text-sm"
                >
                  {user?.firstName}
                </span>
                <AiFillCaretDown color={mode.textColor} size={12} />
              </div>
              <div
                style={{
                  backgroundColor:
                    mode.theme === "dark" ? "#3f3f46" : "#e4e4e7",
                  color: mode.textColor,
                }}
                className="absolute w-full rounded-b-md  overflow text-xs hidden group-hover:block"
              >
                <div className="border-b px-3 py-2 w-full">
                  <NavLink to={`/profile/${user._id}`}>View Profile</NavLink>
                </div>
                <div className="border-b px-3 py-2 w-full">
                  <NavLink to={`/updateProfile/${user._id}`}>
                    Update Profile
                  </NavLink>
                </div>
                <p
                  onClick={() => {
                    navigate("/");
                    dispatch(setLogout());
                  }}
                  className="px-3 py-2"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
