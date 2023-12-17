import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {  useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const User = () => {
  const token = useSelector((state) => state.token);
  const decodedToken = token && token.user ? jwtDecode(token.user.jwt) : null;
  const [data, setData] = useState({});
  useEffect(() => {
    if (decodedToken && decodedToken.email) {
      axios
        .post(
          `https://ngglobalwebapi20231210182820.azurewebsites.net/api/user/getByEmail
          `,
          { email: decodedToken.email }
        )
        .then((result) => {
          setData(result.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);



  const [newEmail, setNewEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const notify = () => toast("user has been updated successfully!");
  const submit = () => {
    notify();
    axios
      .put(
        "https://ngglobalwebapi20231210182820.azurewebsites.net/api/User/updateuserdata",
        {
          id: `${data[0].id}`,
          userName: newUserName == "" ? data[0].userName : newUserName,
          email: newEmail == "" ? data[0].email : newEmail,
          newPassword: newPass == "" ? data[0].password : newPass,
        }
      )
      .then((result) => {
        setData(result.data);
      });
  };

  return (
   
    <div className="flex  justify-center bg-[url('https://images.freeimages.com/clg/istock/previews/8875/88753839-seamless-shopping-cart-colorfull-pattern-background.jpg')]  pb-20 bg-contain bg">
      <div className="flex flex-col  shadow-lg rounded-lg  w-[420px]  pl-[10px]  p-10 mb-2 bg-white mt-10">
        <div className="flex flex-col gap-3 pb-2 ">
          <div className="flex justify-between items-center">
            <h1 className=" mb-7 text-3xl font-semibold text-center">
              User Info
            </h1>
            <img
              src="https://icon-library.com/images/user-512_10381.png"
              className="w-24"
              alt="User Icon"
            ></img>
          </div>
          <p>User name:{data[0]?.userName} </p>
          <p>Email:{data[0]?.email} </p>
        </div>
        <div className="flex flex-col  gap-3">
          <input
            className="border h-9 border-gray-500 focus:outline-none rounded-sm w-[400px] mt-1"
            placeholder="Change Email"
            onChange={(e) => setNewEmail(e.target.value)}
          ></input>
          <input
            className="border h-9 border-gray-500 focus:outline-none rounded-sm w-[400px] mt-1"
            placeholder="Change User Name"
            onChange={(e) => setNewUserName(e.target.value)}
          ></input>
          <input
            className="border h-9 border-gray-500 focus:outline-none rounded-sm w-[400px] mt-1"
            placeholder="Change Password"
            onChange={(e) => setNewPass(e.target.value)}
          ></input>
          <button
            onClick={submit}
            className="inline-flex w-[400px] justify-center rounded-md border border-transparent bg-[#ffd814] px-4 py-2 text-sm font-medium text-gray-800 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
   
  );
};

export default User;
