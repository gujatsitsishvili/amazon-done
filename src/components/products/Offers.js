import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Offers = () => {
  const settings = {
    className: "center",
    dots: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4,
    swipeToSlide: true,
    afterChange: function (index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://ngglobalwebapi20231210182820.azurewebsites.net/api/product/offers"
      )
      .then((result) => setData(result.data));
  }, []);
  return (
    <div className=" mt-3 mr-5 ml-5">
      <div className=" bg-gray-100 shadow-md rounded-lg p-8">
        <h1 className="font-bold text-3xl mb-4  text-gray-800 pb-2">Offers</h1>
        <div className="mr-4 ml-4  ">
          <Slider {...settings}>
            {data.map((item) => (
              <div
                className="p-4 border border-gray-300 rounded-lg shadow-md"
                key={item.id}
              >
                <img
                  src={`${item.image}`}
                  alt={`${item.name} , ${item.price}`}
                  className="h-[310px] w-full object-cover  rounded-lg  "
                ></img>

                <p className="mt-2 text-lg font-semibold text-blue-950">
                  <span className="text-xs align-text-top">$</span>
                  {item.newPrice}
                  <span className="text-sm font-normal ml-1 line-through text-neutral-500 ">
                    was:${item.oldPrice}
                  </span>
                </p>
                <p className="truncate">{item.name}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Offers;
