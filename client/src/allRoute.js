import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./containers/auth/register";
import Login from "./containers/auth/login";
import { useSelector } from "react-redux";
import PageNotFound from "./components/pageNotFound";
import NavBar from "./components/navBar";
import AdminDashboard from "./containers/admin/adminDashboard";
import UserDashboard from "./containers/user/userDashboard";
import MainComponent from "./eg";
import Profile from "./containers/user/profile";
import ItemPage from "./containers/user/itemPage";
import Buy from "./containers/user/buy";

const AllRoute=()=> {
  const {role, token }= useSelector(state=>state.user)
  
  if (role === 'user' && token) {
    return <><NavBar /><UserScreen /></>
  } 
  else if (role === 'admin' && token) {
    return <><NavBar /><AdminScreen /></>
  }
  return <><AuthScreen /></>
}

const AuthScreen=()=>{
  return (
    <Routes>
    <Route path="/register" element={<Register />} />
    <Route path="/" element={<Login />} />
    <Route path="*" element={<PageNotFound />} />
    {/* <Route path="/" element={<UserDashboard />} /> */}

  </Routes>
  )
}

const AdminScreen=()=>{
  return(
    <Routes>
    <Route path="/register" element={<Register />} />
    <Route path="/" element={<AdminDashboard />} />
    <Route path="*" element={<PageNotFound />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/login" element={<Login />} />
    <Route path="/itemPage" element={<ItemPage />} />
    <Route path="/buy" element={<Buy />} />
  </Routes>
  )
}

const UserScreen=()=>{
  return(
    <Routes>
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<UserDashboard />} />
    <Route path="*" element={<PageNotFound />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/itemPage" element={<ItemPage />} />
    <Route path="/buy" element={<Buy />} />
    <Route path="/eg" element={<MainComponent />} />
  </Routes>
  )
}
 
export default AllRoute;
