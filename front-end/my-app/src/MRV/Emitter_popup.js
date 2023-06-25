import React, { useEffect, useState } from "react";
import { CloseButton } from "@chakra-ui/react"
import axios from "axios";

export default function Emitter_popup({onClose, accountId}) {
  const [emitterData, setEmitterData] = useState('');
  const [emitterInfo, setEmitterInfo] = useState('');

    


    useEffect(()=> {
        axios.get('http://localhost:5001/api/user/getMRVDetailsByAccountId', { 
          params: {accountId: accountId}
        })
        .then((response)=> {
          setEmitterData(response.data);
          console.log(response.data);
        })
        .catch((error)=> {
          console.log(error.response.data);
        });

        axios
        .get("http://localhost:5001/api/user/getEmitterByAcId", { //get extra info by emitterInfo get api
          params: {
            accountId: accountId
          }
        }).then((response)=> {
            setEmitterInfo(response.data)
        }).catch((error)=> {
          console.log(error.response.data)
        })
    },[accountId])
  return (
    <>
      <div class="bg-green-100 p-6 absolute max-w-sm rounded top-[143px] max-h-[302px] overflow-y-auto   shadow-lg">
        <div>
        <div  className="flex justify-end"><CloseButton onClick={onClose}/></div>
      <h1 className="flex justify-between my-5 text-2xl font-bold tracking-wide text-lime-800">
              {emitterInfo.name} Profile
            </h1>
            
            
          </div>
          <div className=" mb-4">
            <p className=" font-bold">Account ID: </p>
            <p>{emitterData.emitterAccountId}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold">Name:</p>
            <p>{emitterInfo.name}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold">Description:</p>
            <p className="text-gray-600">
             {emitterInfo.description}
            </p>
          </div>
          <div className="mb-4">
            <p className="font-bold">Allowable Carbon Credit:</p>
            <p>{emitterData.allowableCarbonCredits}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold">Allowable Carbon Emission:</p>
            <p>{emitterData.allowableCarbonEmission}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold">Region:</p>
            <p>{emitterInfo.region}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold">Industry Type:</p>
            <p>{emitterInfo.industryType}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold">Carbon Emitted:</p>
            <p>{emitterData.carbonEmitted}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold">Payback CC:</p>
            <p>{emitterData.paybackCC}</p>
          </div>
         
</div>
    </>
  );
}
