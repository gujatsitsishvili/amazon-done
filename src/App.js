
import "./App.css";
import Header from "./components/Header";
import Cart from "./components/Cart";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Details from "./components/Details";
import Filter from "./components/filter";
import { FilterProvaider } from "./components/filterContext";
import { ToastContainer } from "react-toastify";
import User from "./components/User";






function App() {
  
  return (
    <div className="bg-[#eaeded]">
     
      <Header></Header>
      <Routes>
        
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Cart" element={<Cart/>}></Route>
        <Route path="/Details/:id" element={<Details/>}></Route>
        
        <Route path="/Filter" element={<Filter/>}></Route>
        <Route path="/User" element={<User/>}></Route>
        
      </Routes>
      <Footer></Footer>
      <ToastContainer
          position="top-left"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
    </div>
    
  );
}

export default App;
