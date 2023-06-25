import React, { useState } from 'react'
import SellerPortal from './SellerPortal';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SellerToken() {
 
  const location = useLocation();
  const accountId = location.state.accountId;
  const [state, setState] = useState(false);

  const [formData, setFormData] = useState({
    amountOfTokenSell: "",
    
    accountId: accountId,
  });
  const handleChange = (e) => {
    //act as a call back function
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 

 

  const handleSubmit = (e) => {
    e.preventDefault(); //prevent from refreshing page
    formData.accountId = accountId;
    console.log("value of event3 is:", accountId);
    setFormData(formData);
   
    console.log(formData);

    axios
      .post("http://localhost:5001/api/user/addSellerEntryPrimaryMarket", formData) //POST: addSellerEntry
      .then((response) => {

        
        // console.log(response);
      
       
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        
        setTimeout(() => {
          setState(true);
        }, 2000);
      
      
      
      })
      .catch((error) => {
        // console.log(error);
        if(error.response.data.message === "Seller Already exists"){
          setTimeout(() => {
            setState(true);
          }, 2000);
          
        }
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
  return (
    <>
    {!state && (
     <div className="container overflow-y-auto max-h-[538px] mr-auto ml-[-32px] mt-12">
  <div className="grid ml-[75px] mr-[75px]">
<form onSubmit={handleSubmit}>
    <div className="bg-[#20bf55] bg-gradient-custom text-center rounded-lg shadow-lg p-6">
      <h2 className="text-white font-bold mb-4">Amount of Tokens to Sell</h2>
      
      <div className="flex justify-center items-center mt-12 mb-4">
        <input
         value={formData.amountOfTokenSell}
         onChange={handleChange}
          type="number"
          name='amountOfTokenSell'
          className="border border-gray-300 rounded-lg py-2 px-4 mr-2"
          placeholder="Enter the amount"
        />
        <span className="text-green-900">1CC = 2HBar</span>
      </div>
      <button  type="submit"  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full">
        Submit
      </button>
    </div>
    </form>
  </div>
</div>
)}
{state && <SellerPortal/>}
<ToastContainer />
    </>
  )
}

export default SellerToken
