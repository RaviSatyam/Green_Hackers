import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Review_allowance() {
  // const location = useLocation();
  // const accountId = location.state.accountId;
  // console.log(accountId)
    const [selectedAccountId, setSelectedAccountId] = useState("");
    const [selectedAccountData, setSelectedAccountData] = useState('');
    const [data, setData] = useState([]);
   

    useEffect(() => {
      console.log("selectedacid", selectedAccountId);
    }, [selectedAccountId]);

    useEffect(() => {
        axios
          .get("http://localhost:5001/api/user/getEmitterDetailsRequestForCCFromMRV") //Get All
          .then((response) => {
            setData(response.data);
            console.log(response.data);
            console.log("data", data);
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      }, []);

    const handleAccountIdChange = (e) => {
        const accountId = e.target.value;
        // console.log('target value', accountId)
    
        setSelectedAccountId(accountId);
        // console.log('ac id', selectedAccountId)
    
        axios
          .get("http://localhost:5001/api/user/getEmitterDetailsRequestForCCFromMRVById", { //Get By AccountId
            params: {
              accountId: accountId,
            },
          })
          .then((response) => {
            setSelectedAccountData(response.data);
            
          
            console.log('selectedData is: ',response.data);
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      };


      const handleSendClick = () => {
        axios
          .put("http://localhost:5001/api/user/acceptCCallowance", { //Set button
            accountId: selectedAccountId,
          })
          .then((response) => {
            console.log(response.data);
            toast.success(response.data.message, {
              position: toast.POSITION.TOP_CENTER,
            });
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          })
          .catch((error) => {
            console.log(error.response.data);
            toast.warning(error.response.data.message, {
              position: toast.POSITION.TOP_CENTER,
            });
          });
      };
  return (
    <>
    
<div className="container overflow-y-auto mr-auto ml-[-32px] mt-12">
    <div className="grid ml-[75px] mr-[75px]  ">
        

        

        <div className="bg-[#FFF8D6] rounded-lg shadow-lg p-6">
        <select
              className="w-60 sticky top-0 px-4 cursor-pointer py-1 bg-green-400 rounded-lg shadow text-sm bg-green-400 appearance-none border-none focus:border-emerald-300  font-medium text-white truncate"
              value={selectedAccountId}
              onChange={handleAccountIdChange}
            >
                
              <option value="">Select Account Id</option>
             
              {data.map((item) => (
                <option key={item.emitterAccountId} value={item.emitterAccountId}>
                  A/C ID: {item.emitterAccountId}
                </option>
              ))}
                
            </select>
       

            <div className=" mb-4">
                <p className=' font-bold'>Account ID: </p>
                <p>{selectedAccountData.emitterAccountId}</p>
            </div>
            {/* <div className='mb-4'>
                <p className='font-bold'>Name:</p>
                <p>Utkarsh Dubey</p>
            </div> */}
            <div className='mb-4'>
                <p className='font-bold'>Based on MRV data:</p>
               <table className='table-fixed'>
               
                <tbody>
                    <tr>
                        <td className='border px-4 py-2 bg-lime-100'>Allowable Carbon Credit</td>
                        <td className='border px-4 py-2 font-semibold'>{selectedAccountData.allowableCarbonCredits} CT</td>
                    </tr>
                    <tr>
                        <td className='border px-4 py-2 bg-lime-100'>Allowable Emission</td>
                        <td className='border px-4 py-2 font-semibold'>{selectedAccountData.allowableCarbonEmission} Ton GHG</td>
                    </tr>
                </tbody>

               </table>
            </div>
            <div className='flex justify-center'>
                <button onClick={handleSendClick} className='bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded mr-2'><div className="flex flex-col items-center">
                    <span className="text-sm">Transfer {selectedAccountData.allowableCarbonCredits} to</span>
                     <span className="text-sm">Account ID: {selectedAccountData.emitterAccountId}</span>
                  </div>
                </button>
                <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Reject</button>
            </div>
            

            {/* New */}
            
        </div>
        
       
    </div>
</div>
<ToastContainer />
</>
  )
}

export default Review_allowance
