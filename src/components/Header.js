import React, { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import { Fragment, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./signIn";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { clearToken } from "../redux/tokenSlice";

const Header = () => {
  const [selectData, setSelectData] = useState([]);
  const token = useSelector((state) => state.token);
  const decodedToken = token && token.user ? jwtDecode(token.user.jwt) : null;
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(clearToken());
    const cookies = new Cookies();
    cookies.remove("jwt");
  };

  useEffect(() => {
    axios
      .get(
        "https://ngglobalwebapi20231210182820.azurewebsites.net/api/product/categories"
      )
      .then((result) => setSelectData(result.data));
  }, []);

  const [selectValue, setSelectValue] = useState("");
  const [brandName, setBrandName] = useState("");

  const notify = () => toast("Wow so easy !");

  return (
    <div>
      <header className="pl-5 pr-5 header flex items-center justify-between">
        <Link to="/">
          {" "}
          <img
            className="w-28  h-10"
            src="https://onlinebusinessmanager.com/wp-content/uploads/2018/09/white-amazon-logo-png-6.png"
            alt="Amazon Logo"
          ></img>
        </Link>
        <div className="flex flex-1 headersection  mx-12">
          <select
            className=" select  h-10 "
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
          >
            <option value={""}>All</option>
            {selectData.map((item) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <input
            placeholder="Search Amazon"
            className="headerinput flex-1 sm:w-11 "
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          ></input>
          <Link
            to={`/Filter/?selectValue=${selectValue}&brandName=${brandName}`}
          >
            {" "}
            <SearchIcon
              className="searchicon"
              sx={{ width: 45, height: 40 }}
            ></SearchIcon>
          </Link>
        </div>
        <div className="flex gap-5 text-white items-center">
          {" "}
          <>
            <SignIn></SignIn>
          </>{" "}
         
          <div className="flex items-center ">
            <Link to="/Cart">
              {" "}
              <ShoppingCartOutlinedIcon
                sx={{ color: "white", width: 45, height: 40 }}
              ></ShoppingCartOutlinedIcon>{" "}
            </Link>
            <Link to="/Cart">
              {" "}
              <p className="text-white pt-4">Cart</p>
            </Link>
          </div>
          <div>
            {decodedToken == null ? (
              ""
            ) : (
              <div className="flex flex-col headertext text-center">
                {" "}
                <Link to={"/User"}>
                  <p>User: {decodedToken.unique_name}</p>
                </Link>{" "}
                <button onClick={logout}>Logout</button>{" "}
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
