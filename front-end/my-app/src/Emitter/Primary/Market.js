import React, { useState } from "react";
import SellerToken from "./SellerToken";
import BuyerPortal from "./BuyerPortal";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SellerPortal from "./SellerPortal";

function Market() {
  
  const location = useLocation();
  
  const accountId = location.state.accountId;
  const [sellerToken, setSellerToken] = useState(false);
  const [buyerPortal, setBuyerPortal] = useState(false);
  const [sellerPortal, setSellerPortal] = useState(false);

  const openTokenPortal = () => {
    setSellerToken(true);
  }

  // const amountToken = () => {
  //   axios
  //   .post("http://localhost:5001/api/user/checkSellerAlreadyExist", {
  //     accountId: accountId,
  //   }) //POST: checkSellerEntry
  //   .then((response) => {
  //     console.log(response);
  //     console.log(response.data.message);

  //     // toast.success(response.data.message, {
  //     //   position: toast.POSITION.TOP_CENTER,
  //     // });
  //     if("Pls first add Seller in Primary Market"){
  //       setSellerToken(true);
  //       setBuyerPortal(false);
  //       setSellerPortal(false);
  //     }
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     if(error.response.data.message === "Seller have already Available Token to sell"){
  //       setSellerPortal(true);
  //       setSellerToken(false);
  //       setBuyerPortal(false);
  //     }
  //   });
 
  // };

  const buyer = () => {
    axios
      .post("http://localhost:5001/api/user/addBuyerEntryInPrimaryMarket", {
        accountId: accountId,
      }) //POST: addSellerEntry
      .then((response) => {
        console.log(response);
        console.log(response.data.message);

        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setBuyerPortal(true);
        setSellerToken(false);
        setSellerPortal(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  return (
    <>
      {!sellerToken && !buyerPortal && !sellerPortal &&(
        <div className="container overflow-y-auto max-h-[538px] mr-auto ml-[-32px] mt-12">
          <div className="grid ml-[75px] mr-[75px]">
            <div className="bg-{#20bf55} bg-gradient-custom text-center rounded-lg shadow-lg p-6">
              <h2 className="text-xl text-indigo-600 font-semibold tracking-wide uppercase">
                Welcome to
              </h2>
              <h1 className="text-4xl mb-2 tracking-tight font-extrabold text-fuchsia-600 sm:text-5xl md:text-6xl">
                Primary Market
              </h1>

              <p className="text-white mb-4 mt-6">
                In the Primary Market for carbon tokens, emitters have the
                opportunity to both Sell and Buy these tokens. Carbon tokens are
                a form of digital assets that represent a specific amount of
                carbon emissions or offsets.
              </p>

              <p className="text-white mt-6">
                For Emitters who want to sell carbon tokens, the primary market
                provides a platform to monetize their carbon reductions. By
                selling these tokens, emitters can generate revenue from their
                efforts to reduce carbon emissions.
              </p>

              <p className="text-white mt-6">
                On the other hand, emitters who want to buy carbon tokens can
                utilize the primary market to acquire the necessary carbon
                offsets or allowance to meet their emissions reduction goals.
              </p>

              <div className="flex justify-center mt-6">
                <button
                  onClick={buyer}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 mr-4 rounded-full"
                >
                  Wish To Buy
                </button>

                <button
                  onClick={openTokenPortal}
                  className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full"
                >
                  Wish To Sell
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {sellerToken && <SellerToken />}
      {buyerPortal && <BuyerPortal />}
      {sellerPortal && <SellerPortal/>}
      <ToastContainer />
    </>
  );
}

export default Market;
