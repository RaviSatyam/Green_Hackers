import React, { useEffect, useState } from 'react'
import'./Profile.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Profile() {
  const location = useLocation();
  const accountId = location.state.accountId;
  const [data, setData] = useState([]);

  

  useEffect(()=>{
      axios
      .get("http://localhost:5001/api/user/getEmitterByAcId", {
        params: {
          accountId: accountId
        }
      })
      .then((response)=>{
        console.log(response.data)
        setData(response.data);
       
      })
      .catch((error)=>{
        console.log(error)
      })
  },[])
  return (
    <div className="container overflow-y-auto max-h-[538px] mr-auto ml-[-32px] mt-12">
      <div className="grid  ml-[75px] mr-[75px]  ">
     
        <div className="bg-{#20bf55} bg-gradient-custom rounded-lg shadow-lg p-6">
        
        
          <div>
            <h1 className="my-5 text-2xl font-bold tracking-wide text-indigo-700">
               Profile
            </h1>
          </div>
          <div className=" mb-4">
            <p className=" font-bold text-blue-700">Account ID: </p>
            <p className="text-neutral-50">{data.accountId}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold text-blue-700">Name:</p>
            <p className='text-neutral-50'>{data.name}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold text-blue-700">Description:</p>
            <p className="text-neutral-50  ">
             {data.description}
            </p>
          </div>
          <div className="mb-4">
            <p className="font-bold text-blue-700">Allowable Carbon Credit:</p>
            <p className="text-neutral-50">{data.allowableCarbonCredits}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold text-blue-700">Allowable Carbon Emission:</p>
            <p className="text-neutral-50">{data.allowableCarbonEmission}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold text-blue-700">Region:</p>
            <p className="text-neutral-50">{data.region}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold text-blue-700">Industry Type:</p>
            <p className="text-neutral-50">{data.industryType}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold text-blue-700">Carbon Emitted:</p>
            <p className="text-neutral-50">{data.carbonEmitted}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold text-blue-700">Payback CC:</p>
            <p className="text-neutral-50">{data.paybackCC}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold text-blue-700">Remaining:</p>
            <p className="text-neutral-50">{data.remainingCC}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold text-blue-700">Available Hbar:</p>
            <p className="text-neutral-50">{data.availableHbar}</p>
          </div>
        
        </div>
        
      </div>
    </div>
  )
}

export default Profile
