import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { BiPencil } from "react-icons/bi";
import { setUser } from "../State";
import url from "../constants";

export default function UpdateProfile() {
  const user = useSelector(state => state.user);
  const mode = useSelector(state => state.mode);
  const [profileImage, setProfileImage] = useState(user?.image);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [location, setLocation] = useState(user?.location);
  const [occupation, setOccupation] = useState(user?.occupation);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const imageRef = useRef(null);
  const openImageSelecter = () => {
    imageRef.current.click();
  };
  const imageChangeHandler = async e => {
    let data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "sanitary");
    data.append("folder", "socialMedia");
    const response = await Axios.post(
      "https://api.cloudinary.com/v1_1/dlxyvl6sb/image/upload",
      data
    );
    setProfileImage(response.data.url);
  };

  const onUpdate = async () => {
    try {
      let data = {};
      if (oldPassword) {
        if (confirmPassword !== newPassword) {
          alert("New Password Should be same to Confirm New Password");
          return;
        }
        data = {
          id: user._id,
          firstName,
          lastName,
          email,
          image: profileImage,
          oldPassword,
          password: newPassword,
        };
      } else {
        data = {
          id: user._id,
          firstName,
          lastName,
          email,
          image: profileImage,
        };
      }
      const userData = await Axios.post(`${url}/api/user/updateProfile`, data);
      alert("Profile Updated Successfully");
      console.log("User Data -----", userData);
      dispatch(setUser(userData.data));
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  return (
    <div className="max-w-[400px] flex flex-col items-center mt-20 mx-auto pb-16">
      <div className="relative">
        <img
          onClick={openImageSelecter}
          className="w-32 h-32 rounded-full "
          src={profileImage}
        />
        <BiPencil
          onClick={openImageSelecter}
          className="absolute bg-violet-500 p-1 rounded-full cursor-pointer  right-[10px] bottom-2 text-white"
          size={22}
        />
        <input
          ref={imageRef}
          className="hidden"
          type="file"
          onChange={imageChangeHandler}
        />
      </div>
      <div className="flex flex-col my-3">
        <label className="text-sm my-1 text-gray-500">First Name</label>
        <input
          onChange={e => setFirstName(e.target.value)}
          className={`outline-none border  px-4 py-1 rounded-md  sm:w-[400px] ${
            mode.theme === "dark"
              ? "bg-zinc-800 border-gray-600 text-gray-400"
              : "bg-gray-100 border-gray-300"
          }`}
          value={firstName}
          placeholder="First Name"
        />
      </div>
      <div className="flex flex-col my-3">
        <label className="text-sm my-1 text-gray-500">Last Name</label>
        <input
          onChange={e => setLastName(e.target.value)}
          className={`outline-none border  px-4 py-1 rounded-md  sm:w-[400px] ${
            mode.theme === "dark"
              ? "bg-zinc-800 border-gray-600 text-gray-400"
              : "bg-gray-100 border-gray-300"
          }`}
          value={lastName}
          placeholder="Last Name"
        />
      </div>
      <div className="flex flex-col my-3">
        <label className="text-sm my-1 text-gray-500">Email</label>
        <input
          type="email"
          onChange={e => setEmail(e.target.value)}
          className={`outline-none border  px-4 py-1 rounded-md  sm:w-[400px] ${
            mode.theme === "dark"
              ? "bg-zinc-800 border-gray-600 text-gray-400"
              : "bg-gray-100 border-gray-300"
          }`}
          value={email}
          placeholder="Email Address"
        />
      </div>
      <div className="flex flex-col my-3">
        <label className="text-sm my-1 text-gray-500">Occupation</label>
        <input
          onChange={e => setOccupation(e.target.value)}
          className={`outline-none border  px-4 py-1 rounded-md  sm:w-[400px] ${
            mode.theme === "dark"
              ? "bg-zinc-800 border-gray-600 text-gray-400"
              : "bg-gray-100 border-gray-300"
          }`}
          value={occupation}
          placeholder="Occupation"
        />
      </div>
      <div className="flex flex-col my-3">
        <label className="text-sm my-1 text-gray-500">Location</label>
        <input
          onChange={e => setLocation(e.target.value)}
          className={`outline-none border  px-4 py-1 rounded-md  sm:w-[400px] ${
            mode.theme === "dark"
              ? "bg-zinc-800 border-gray-600 text-gray-400"
              : "bg-gray-100 border-gray-300"
          }`}
          value={location}
          placeholder="Location"
        />
      </div>
      <div className="flex flex-col my-3">
        <label className="text-sm my-1 text-gray-500">Old Password</label>
        <input
          type="password"
          onChange={e => setOldPassword(e.target.value)}
          className={`outline-none border  px-4 py-1 rounded-md  sm:w-[400px] ${
            mode.theme === "dark"
              ? "bg-zinc-800 border-gray-600 text-gray-400"
              : "bg-gray-100 border-gray-300"
          }`}
          value={oldPassword}
          placeholder="Old Password"
        />
      </div>
      <div className="flex flex-col my-3">
        <label className="text-sm my-1 text-gray-500">Old Password</label>
        <input
          type="password"
          onChange={e => setNewPassword(e.target.value)}
          className={`outline-none border  px-4 py-1 rounded-md  sm:w-[400px] ${
            mode.theme === "dark"
              ? "bg-zinc-800 border-gray-600 text-gray-400"
              : "bg-gray-100 border-gray-300"
          }`}
          value={newPassword}
          placeholder="New Password"
        />
      </div>
      <div className="flex flex-col my-3">
        <label className="text-sm my-1 text-gray-500">Confirm Password</label>
        <input
          type="password"
          onChange={e => setConfirmPassword(e.target.value)}
          className={`outline-none border  px-4 py-1 rounded-md  sm:w-[400px] ${
            mode.theme === "dark"
              ? "bg-zinc-800 border-gray-600 text-gray-400"
              : "bg-gray-100 border-gray-300"
          }`}
          value={confirmPassword}
          placeholder="Confirm Password"
        />
      </div>
      <button
        onClick={onUpdate}
        className="bg-cyan-400 w-full text-white py-[8px] mt-6 rounded-md"
      >
        Update
      </button>
    </div>
  );
}
