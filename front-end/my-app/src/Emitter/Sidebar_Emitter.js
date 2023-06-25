import React, { useState } from "react";
import Profile from "./Profile";
import Review_payback from "./Review_payback";
import { useNavigate } from "react-router-dom";
import Request_CC from "./Request_CC";
import Navbar from "./Navbar";
import Market from "./Primary/Market";


const Sidebar_Emitter = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(0);

  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
    // window.location.reload();
  };

  return (
    <>
      <Navbar />
      <div className="flex bg-blue-50">
        <div className="flex flex-col h-screen p-3 bg-white shadow w-[258px]">
          <div className="p-4 text-blue-600 font-bold text-xl">
            Emitter Profile
          </div>

          <ul className="flex flex-col pb-4 space-y-3 py-4">
            <li
              onClick={() => handleButtonClick(0)}
              className={`${
                activeButton === 0 ? "text-blue-600" : "text-slate-400"
              } px-4 py-2  font-medium hover:text-blue-600 cursor-pointer`}
            >
              My Profile
            </li>

            <div>
              <li
                onClick={() => handleButtonClick(2)}
                className={`${
                  activeButton === 2 ? "text-blue-600" : "text-slate-400"
                } px-4 py-2  font-medium hover:text-blue-600 cursor-pointer`}
              >
                Primary Market
              </li>
            </div>
            <li
              onClick={() => handleButtonClick(4)}
              className={`${
                activeButton === 4 ? "text-blue-600" : "text-slate-400"
              } px-4 py-2  font-medium hover:text-blue-600 cursor-pointer`}
            >
              Request for Carbon Credit
            </li>

            <li
              onClick={() => handleButtonClick(3)}
              className={`${
                activeButton === 3 ? "text-blue-600" : "text-slate-400"
              } px-4 py-2 font-medium hover:text-blue-600 cursor-pointer`}
            >
              Review Payback Requests
            </li>

            <li
              onClick={logout}
              className="px-4 py-2 text-slate-400 font-medium hover:text-blue-600 cursor-pointer"
            >
              Logout
            </li>
          </ul>
        </div>
        {activeButton === 0 ? <Profile /> : null}
        {activeButton === 2 ? <Market /> : null}
        {activeButton === 3 ? <Review_payback /> : null}
        {activeButton === 4 ? <Request_CC /> : null}
      </div>
    </>
  );
};

export default Sidebar_Emitter;
