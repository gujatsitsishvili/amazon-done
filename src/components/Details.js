import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addItem } from "../redux/CartSlice";

const Details = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://ngglobalwebapi20231210182820.azurewebsites.net/api/product/products/${id}`
      )
      .then((result) => {
        setData(result.data);
      })

      .catch((error) => {
        console.error(error);
      });
  }, [id]);
  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(addItem(data));
  };
  return (
    <div className="bg-rose-400 py-7">
      <div
        className="bg-[#f8f8f8] detailssection flex justify-center shadow-lg gap-10 rounded-lg py-5 mx-[50px]  "
        key={data.id}
      >
        <img
          src={`${data.images}`}
          alt={`${data.name} , ${data.price}`}
          className="rounded-sm object-cover  h-[500px]"
        ></img>
        <div className="max-w-2xl">
          <p className="text-xl border-b-[1px] font-semibold text-gray-500  border-b-slate-700 pb-2 mb-2">
            {data.name}
          </p>

          <p className="text-2xl font-semibold">
            <span className="text-sm align-text-top">$</span>
            {data.price}
          </p>
          <p> {data.oldPrice}</p>
          <p className="mt-[100px]">
            <span className="font-bold">Brand:</span> {data.brand}{" "}
          </p>
          <p className="pb-7">
            <span className="font-bold">Model:</span> {data.model}
          </p>
          <p className="description">{data.description}</p>
          <button
            onClick={addToCart}
            className="bg-[#ffd814] max-w-2xl w-full rounded-md h-9 mt-6 border border-transparent font-medium text-gray-800 hover:bg-blue-200 
         "
         aria-label={`Add ${data.name} to Cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
 
};

export default Details;
