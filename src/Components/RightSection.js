import React from "react";
import { useSelector } from "react-redux";
import FriendsList from "./FriendsList";

export default function RightSection() {
  const mode = useSelector(state => state.mode);
  return (
    <div className="flex flex-col  space-y-6  md:fixed md:w-[24%]">
      <div
        style={{ backgroundColor: mode.themeColor }}
        className="p-4 rounded-md w-full"
      >
        <div className="flex items-center justify-between mb-2">
          <span
            className={`${
              mode.theme === "dark" ? "text-gray-200" : "text-gray-600"
            } text-sm`}
          >
            Sponsored
          </span>
          <span className="text-xs text-gray-400">create Ad</span>
        </div>
        <img
          src="https://getprintbox.com/blog//app/uploads/2018/07/image1.jpg"
          className="w-full object-contain rounded-md"
        />
        <div className="flex items-center justify-between my-2">
          <span
            className={`${
              mode.theme === "dark" ? "text-gray-300" : "text-gray-500"
            } text-xs`}
          >
            MikaCosmetics
          </span>
          <span className="text-gray-400 text-[10px]">mikacosmetics.com</span>
        </div>
        <p className="mt-2 text-xs text-gray-400">
          Your pathway to stunning and immaculate beauty and make sure your skin
          is exfloriating skin and shinning like light.
        </p>
      </div>

      <FriendsList />
    </div>
  );
}

//
