/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./Signup/Register";
import Sidebar from "./Govt/Sidebar";
import Sidebar_MRV from "./MRV/Sidebar_MRV";
import NotFound from "./NotFound";
import Sidebar_Emitter from "./Emitter/Sidebar_Emitter";
import PairHashPack from "./hashconnect/PairHashPack";
import Navbar from "./Emitter/Navbar";
import SellerTable from "./Emitter/Primary/SellerPortal";
import Buy from "./Emitter/Primary/Buy";
import SellerPortal from "./Emitter/Primary/SellerPortal";
import Home from "./HomePage/Home";


function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/pair" element={<PairHashPack />} />
        <Route exact path="/register" element={<Register />} />
        <Route path="/Sidebar" element={<Sidebar />} />
        <Route path="/Sidebar_MRV" element={<Sidebar_MRV />} />
        <Route path="/Sidebar_Emitter" element={<Sidebar_Emitter />} />
        <Route path="/emitter" element={<Navbar />} />
        <Route path="/tab" element={<SellerTable/>} />
        <Route path="/buy" element={<Buy/>} />
        <Route path="/seller_portal" element={<SellerPortal/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
