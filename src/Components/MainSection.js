import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsImage } from "react-icons/bs";
import { IoVideocamOutline } from "react-icons/io5";
import { IoIosAttach } from "react-icons/io";
import { AiFillAudio } from "react-icons/ai";
import Axios from "axios";
import { setPosts } from "../State";
import PostSection from "./PostSection";
import url from "../constants";

export default function MainSection() {
  const user = useSelector(state => state.user);
  const mode = useSelector(state => state.mode);
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [showImageUpload, setShowImageUpload] = useState(false);
  const imageRef = useRef(null);

  const onPost = async () => {
    try {
      console.log("clicked");
      let postData = { user: user._id, description };

      if (image) {
        const form = new FormData();
        form.append("file", image);
        form.append("upload_preset", "sanitary");
        form.append("folder", "socialMedia");
        const cloudinayResponse = await Axios.post(
          "https://api.cloudinary.com/v1_1/dlxyvl6sb/image/upload",
          form
        );
        postData = { ...postData, image: cloudinayResponse.data.url };
      }
      const { data } = await Axios.post(`${url}/api/post/createPost`, postData);
      console.log("Data -----", data);
      dispatch(setPosts(data));
      setImage("");
      setDescription("");
      setShowImageUpload(false);
    } catch (error) {
      console.log("Error", error);
    }
  };
  return (
    <div>
      <div
        className="p-4 rounded-md"
        style={{ backgroundColor: mode.themeColor }}
      >
        <div className="flex flex-row items-center  space-x-4  pb-4">
          <img className="h-10 w-10 rounded-full" src={user.image} />
          <input
            className={`px-4 border-none outline-none py-3 rounded-full text-white text-sm flex-1 ${
              mode.theme === "dark" ? "bg-zinc-700" : "bg-gray-100"
            }`}
            value={description}
            onChange={e => setDescription(e.target.value)}
            type="text"
            placeholder="What's on your mind..."
          />
        </div>
        {showImageUpload && (
          <div
            onClick={() => imageRef.current.click()}
            className="border border-gray-400 w-full rounded-md p-3 mb-2"
          >
            <div className="border-cyan-400 border-2 border-dotted px-3 py-4 cursor-pointer">
              <p className={`text-sm text-gray-400`}>
                {image ? image.name : "Add Picture here"}
              </p>
              <input
                onChange={e => setImage(e.target.files[0])}
                hidden
                ref={imageRef}
                type="file"
              />
            </div>
          </div>
        )}
        <div
          className={`w-full border-b ${
            mode.theme === "dark" ? "border-gray-600" : "border-gray-400"
          } pt-3`}
        />
        <div
          className={`flex items-center justify-between pt-3 ${
            mode.theme === "dark" ? "text-gray-200" : "text-gray-500"
          }`}
        >
          <div
            onClick={() => setShowImageUpload(!showImageUpload)}
            className="flex flex-row items-center space-x-1 cursor-pointer"
          >
            <BsImage />
            <span className="text-xs ">Image</span>
          </div>
          <div className="flex flex-row items-center space-x-1 cursor-pointer">
            <IoVideocamOutline />
            <span className="text-xs ">Clip</span>
          </div>
          <div className="flex flex-row items-center space-x-1 cursor-pointer">
            <IoIosAttach />
            <span className="text-xs ">Attachment</span>
          </div>
          <div className="flex flex-row items-center space-x-1 cursor-pointer">
            <AiFillAudio />
            <span className="text-xs ">Audio</span>
          </div>
          <button
            onClick={onPost}
            className="bg-cyan-400 text-white  text-xs font-medium px-3 py-[6px] rounded-2xl"
          >
            POST
          </button>
        </div>
      </div>
      <div className="mt-6">
        <PostSection />
      </div>
    </div>
  );
}
