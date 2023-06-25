import React, { useEffect, useState } from 'react'
import './Review.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Review_payback() {
  const location = useLocation();
  const accountId = location.state.accountId;
  const [data, setData] = useState('')
  useEffect(()=> {
      axios
      .get('http://localhost:5001/api/user/getEmitterByAcId', {
        params: {
          accountId: accountId
        }
      }).then((response)=>{
        setData(response.data)
      }).catch((error)=>{
        console.log(error.response.data.message)
      })
  },[])

  const handleAccept = () => {
    axios
    .put('http://localhost:5001/api/user/paybackReqAccepted', {
      accountId: accountId
    }).then((response)=> {
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    })
    .catch((error)=>{
      console.log(error.response.data.message)
    })
  }
  return (
    <>
    <div className="container overflow-y-auto max-h-[538px] mr-auto ml-[-32px] mt-12">
    <div className="grid  ml-[75px] mr-[75px]  ">
      <div className=" bg-{#c2eaba} bg-image-custom rounded-lg shadow-lg p-6">

        <div className='flex mb-8'>
            <h2>You have emitted {data.carbonEmitted} Metric Ton GHG.</h2>
        </div>

      <div className='mb-4'>
                <p className='font-bold mb-2'>Based on MRV data:</p>
               <table className='table-fixed'>
               
                <tbody>
                <tr>
                        <td className='border px-4 py-2 bg-green-200 text-orange-400'>Payback Amount</td>
                        <td className='border px-4 py-2 font-semibold text-blue-700'>{data.paybackCC} CT</td>
                    </tr>
                    <tr>
                        <td className='border px-4 py-2 bg-green-200 text-orange-400'>Due Date</td>
                        <td className='border px-4 py-2 font-semibold text-blue-700'>{data.dueDate}</td>
                    </tr>
                    <tr>
                        <td className='border px-4 py-2 bg-green-200 text-orange-400'>Carbon Emitted</td>
                        <td className='border px-4 py-2 font-semibold text-blue-700'>{data.carbonEmitted} Ton</td>
                    </tr>
                    
                </tbody>

               </table>
            </div>

            <div className='mt-6'>
                <h3 className='text-red-500'>!!!Please payback the above amount before due date to avoid Freeze</h3>
            </div>
            <div className='flex justify-center mt-8'>

<button onClick={handleAccept} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">Accept and Payback {data.paybackCC} Carbon Token to Govt</button>
</div>
        </div>
        </div>
        </div>
        <ToastContainer/>
        </>
  )
}

export default Review_payback
