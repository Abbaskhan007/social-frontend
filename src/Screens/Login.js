import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputForm from "../Components/InputForm";
import Axios from "axios";
import { setLogin } from "../State";

export default function Login() {
  const mode = useSelector(state => state.mode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emptyForm = () => {
    setEmail("");
    setPassword("");
  };

  const onSubmit = async () => {
    try {
      const { data } = await Axios.post("/api/user/login", { email, password });
      dispatch(setLogin(data));
      emptyForm();
      navigate("/home");
      console.log("-------", data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{ backgroundColor: mode.themeColor, color: mode.textColor }}
      className="max-w-3xl my-12 mx-auto p-6 rounded-md flex-col space-y-5"
    >
      <p>Welcome to sociapedia, the social media for socialpaths</p>
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
        LOGIN
      </button>
      <p
        onClick={() => navigate("/registeration")}
        className="text-cyan-400 text-sm underline cursor-pointer"
      >
        Don't have an account? Sign Up here.
      </p>
    </div>
  );
}
