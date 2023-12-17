import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../redux/CartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const subtotal = cartItems.reduce(
    (accumulator, currentItem) => accumulator + currentItem.price,
    0
  );

  return (
    <div className="bg-gray-100 100 min-h-[100vh] p-4 bg-[url('https://static.vecteezy.com/system/resources/previews/010/839/386/non_2x/aesthetic-minimal-cute-pastel-pink-wallpaper-illustration-perfect-for-wallpaper-backdrop-postcard-background-banner-vector.jpg')] bg-cover">
      <h1 className="text-3xl font-semibold mb-4">Shopping Cart</h1>
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="bg-white cartsection p-4 rounded-lg shadow-md mb-4 flex items-center"
        >
          <img
            className="w-32 cartimg h-40 object-cover"
            src={item.image}
            alt={`${item.name} , ${item.price}`}
          />
          <div className="ml-4">
            <h2 className="text-xl carth2 font-semibold">{item.name}</h2>
            <p className="text-lg font-bold">${item.price}</p>
            <p className="text-sm">Model: {item.model}</p>
            <p className="text-sm">Brand: {item.brand}</p>
            <div className="flex text-sm gap-4 items-center mt-2">
              <button
                onClick={() => dispatch(removeItem(item.id))}
                className="text-red-500 hover:underline cursor-pointer"
              >
                Delete
              </button>
              <p className="text-blue-500 cursor-pointer">Save for later</p>
              <p className="text-blue-500 cursor-pointer">
                Compare with similar items
              </p>
              <p className="text-blue-500 cursor-pointer">Share</p>
            </div>
          </div>
        </div>
      ))}
      <div className="border-t border-gray-300 flex items-baseline justify-between">
      <button className="bg-pink-500 buynow shadow-md max-w-2xl w-56 rounded-md h-9 mt-6 border border-transparent font-medium text-gray-800 hover:bg-blue-200">Buy now</button>
      <p className="text-xl cartsub font-semibold text-right  mt-4">
        Subtotal ({cartItems.length} items):
        <span className=" ml-2">${subtotal.toFixed(2)}</span>
      </p>
      </div>
    </div>
  );
};

export default Cart;
