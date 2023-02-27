import React, {useState} from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./containers/auth/register";
import Login from "./containers/auth/login";
import { useSelector } from "react-redux";
import PageNotFound from "./containers/sharedScreen/pageNotFound";
import NavBar from "./components/navBar";
import AdminDashboard from "./containers/admin/adminDashboard";
import UserDashboard from "./containers/user/userDashboard";
import MainComponent from "./eg";
import Profile from "./containers/user/profile";
import ItemPage from "./containers/user/itemPage";
import Buy from "./containers/user/buy";
import Items from "./containers/sharedScreen/items";
import AdminOrder from "./containers/admin/adminOrder";
import UserOrder from "./containers/user/userOrder";
import Cart from "./containers/sharedScreen/cart";
import { message } from 'antd'; 


const AllRoute=()=> {


  const {role, token }= useSelector(state=>state.user)
  
  if (role === 'user' && token) {
    return <><NavBar /><UserScreen /></>
  } 
  else if (role === 'admin' && token) {
    return <><NavBar /><AdminScreen /></>
  }
  return <><NavBar /><AuthScreen /></>
}

const AuthScreen=()=>{
  return (
    <Routes>
    <Route path="/register" element={<Register />} />
    <Route path="/" element={<Items/>} />
    <Route path="*" element={<Login />} />

  </Routes>
  )
}

const AdminScreen=()=>{
  return(
    <Routes>
    <Route path="/register" element={<Register />} />
    <Route path="/items" element={<Items />} />
    <Route path="*" element={<PageNotFound />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/login" element={<Login />} />
    <Route path="/itemPage" element={<ItemPage />} />
    <Route path="/" element={<AdminDashboard />} />
    <Route path="/buy" element={<Buy />} />
  </Routes>
  )
}

const UserScreen=()=>{
  const [cart, setCart] = useState([]);
  const handleClick = (item) => {
    let added;
    cart.map((cart)=>{
      if (cart.catagoryName === item.catagoryName){
          added = true
      }
    })
    if(added !== true){
      item.quantity = 1
      const currentCart = [...cart];
      const newCart = [...currentCart, item];  
      setCart(newCart);
      message.success('Added in cart', [2])
    }
    else{
      message.error('Already in cart', [2])
    }
  };

  const [itemPrice, setItemPrice] = useState(0);
    const total=()=>{
        let a = 0
        cart.map((item)=>{ 
          a = (item.price * item.quantity) + a
        })
        return setItemPrice(a);
      }
 
  return(
    <Routes>
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<UserDashboard />} />
    <Route path="*" element={<PageNotFound />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/itemPage" element={<ItemPage handleClick={handleClick} />} />
    <Route path="/buy" element={<Buy itemPrice={itemPrice}/>} />
    <Route path="/orders" element={<UserOrder />} />
    <Route path="/cart" element={<Cart cart={cart} setCart={setCart} itemPrice={itemPrice} setItemPrice={setItemPrice} total={total}/>} />
    <Route path="/eg" element={<MainComponent />} />
  </Routes>
  )
}
 
export default AllRoute;
