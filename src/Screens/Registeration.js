import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import InputForm from "../Components/InputForm";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

export default function Registeration() {
  const navigate = useNavigate();
  const mode = useSelector(state => state.mode);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const imageRef = useRef(null);
  const [image, setImage] = useState("");

  const onSubmit = async () => {
    try {
      console.log("clicked");
      const form = new FormData();
      form.append("file", image);
      form.append("upload_preset", "sanitary");
      form.append("folder", "socialMedia");
      const cloudinayResponse = await Axios.post(
        "https://api.cloudinary.com/v1_1/dlxyvl6sb/image/upload",
        form
      );
      const { data } = await Axios.post("/api/user/registeration", {
        firstName,
        lastName,
        email,
        password,
        location,
        occupation,
        image: cloudinayResponse.data.url,
      });
      navigate("/");
      console.log("Data -----", data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div
      style={{ backgroundColor: mode.themeColor, color: mode.textColor }}
      className="max-w-3xl my-12 mx-auto p-6 rounded-md flex-col space-y-5"
    >
      <p>Welcome to sociapedia, the social media for socialpaths</p>
      <div className="flex items-center justify-between space-x-6">
        <InputForm
          type="text"
          inputValue={firstName}
          setInputValue={setFirstName}
          placeholder="First Name"
        />
        <InputForm
          type="text"
          inputValue={lastName}
          setInputValue={setLastName}
          placeholder="Last Name"
        />
      </div>
      <InputForm
        type="text"
        inputValue={location}
        setInputValue={setLocation}
        placeholder="Location"
      />
      <InputForm
        type="text"
        inputValue={occupation}
        setInputValue={setOccupation}
        placeholder="Occupation"
      />
      <div
        onClick={() => imageRef.current.click()}
        className="border border-gray-400 w-full rounded-md p-3"
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
      <InputForm
        type="email"
        inputValue={email}
        setInputValue={setEmail}
        placeholder="Email"
      />
      <InputForm
        type="password"
        inputValue={password}
        setInputValue={setPassword}
        placeholder="password"
      />
      <button
        onClick={onSubmit}
        className="bg-cyan-400 w-full text-black text-sm rounded-md py-[8px] font-medium"
      >
        REGISTER
      </button>
      <p
        onClick={() => navigate("/")}
        className="text-cyan-400 text-sm underline cursor-pointer"
      >
        Already have an account? Sign In here.
      </p>
    </div>
  );
}
