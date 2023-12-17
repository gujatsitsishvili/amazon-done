import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../redux/tokenSlice";
import Cookies from "universal-cookie";

const Signinform = ({ closeModal, setSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token); 
  const signIn = () => {
    setSignIn(false);
    closeModal();

    axios
      .post(
        "https://ngglobalwebapi20231210182820.azurewebsites.net/api/User/LogIn",
        {
          email: email,
          password: password,
        }
      )
      .then((response) => {
        console.log("Response:", response.data);
        dispatch(setToken(response.data));
        
        const cookies = new Cookies();
        const jwtToken = response.data.user.jwt; 
        cookies.set("jwt", jwtToken, { expires: new Date(1699078101 * 1000) });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
      <div className="flex justify-between items-center">
        <Dialog.Title
          as="h3"
          className="text-3xl font-medium leading-6 text-gray-900"
        >
          Sign In
        </Dialog.Title>
        <img
          className="w-28"
          src="https://www.themobileindian.com/wp-content/uploads/2021/06/amazon-india-a.jpg"
          alt="Amazon Logo"
        ></img>
      </div>
      <div className="mt-2">
        <p className="text-xs mt-4 font-bold text-gray-800">
          Email or mobile phone number
        </p>
      </div>
      <div>
        <input
          placeholder="Enter your email or mobile phone number"
          className="border h-9 border-gray-500 focus:outline-none rounded-sm w-[400px] mt-1 "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <p className="text-xs mt-4 font-bold text-gray-800">Password</p>
        <input
          placeholder="Enter your Password"
          className="border h-9 border-gray-500 focus:outline-none rounded-sm w-[400px] mt-1 "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>

      <div className="mt-4">
        <button
          type="button"
          className="inline-flex w-[400px] justify-center rounded-md border border-transparent bg-[#ffd814] px-4 py-2 text-sm font-medium text-gray-800 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={signIn}
        >
          Continue
        </button>
      </div>
      <div className="text-sm flex flex-col gap-10 pt-7">
        <p>
          By continuing, you agree to Amazon's{" "}
          <a href="#" className="text-blue-400">
            Conditions of Use
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-400">
            Privacy Notice.
          </a>
        </p>
        <button
          className="text-blue-400 text-left w-28"
          onClick={() => setSignIn(false)}
        >
          Create Account
        </button>
        <a href="#" className="text-blue-400">
          Need help?
        </a>
      </div>
    </Dialog.Panel>
  );
};

export default Signinform;
