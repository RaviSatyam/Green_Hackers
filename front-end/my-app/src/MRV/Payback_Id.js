import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Payback_Id() {
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [selectedAccountData, setSelectedAccountData] = useState("");
  const [emitterInfo, setEmitterInfo] = useState("");
  const [data, setData] = useState([]);
  // console.log('emitter info:', emitterInfo)

  useEffect(() => {
    // console.log("selectedacid", selectedAccountId);
  }, [selectedAccountId]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/user/getPaybackListReqestForAllEmitter") //Get All
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
      .get("http://localhost:5001/api/user/getPaybackCCReqById", {
        //Get By AccountId
        params: {
          accountId: accountId,
        },
      })
      .then((response) => {
        setSelectedAccountData(response.data[0]);

        console.log("selectedData is: ", response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });

    axios
      .get("http://localhost:5001/api/user/getEmitterByAcId", {
        //get extra info by emitterInfo get api
        params: {
          accountId: accountId,
        },
      })
      .then((response) => {
        setEmitterInfo(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handleSendClick = () => {
    axios
      .put("http://localhost:5001/api/user/setCCpayback", {
        //Set button
        accountId: selectedAccountId,
        region: emitterInfo.region,
        industryType: emitterInfo.industryType,
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
      <div className="container overflow-y-auto max-h-[538px] mr-auto ml-[-32px] mt-12">
        <div className="grid  ml-[75px] mr-[75px]  ">
          <div className="bg-[#FFF8D6] rounded-lg shadow-lg p-6">
            <select
              className="w-60 sticky top-0 px-4 cursor-pointer py-1 bg-green-400 rounded-lg shadow text-sm bg-green-400 appearance-none border-none focus:border-emerald-300  font-medium text-white truncate"
              value={selectedAccountId}
              onChange={handleAccountIdChange}
            >
              <option value="">Select Account Id</option>

              {data.map((item) => (
                <option
                  key={item.emitterAccountId}
                  value={item.emitterAccountId}
                >
                  A/C ID: {item.emitterAccountId}
                </option>
              ))}
            </select>

            {selectedAccountData ? (
              <div>
                <div>
                  <h1 className="my-5 text-2xl font-bold tracking-wide text-cyan-700">
                    {emitterInfo.name} Profile
                  </h1>
                </div>
                <div className=" mb-4">
                  <p className=" font-bold">Account ID: </p>
                  <p>{selectedAccountData.emitterAccountId}</p>
                </div>
                <div className="mb-4">
                  <p className="font-bold">Name:</p>
                  <p>{emitterInfo.name}</p>
                </div>
                <div className="mb-4">
                  <p className="font-bold">Description:</p>
                  <p className="text-gray-600">{emitterInfo.description}</p>
                </div>
                <div className="mb-4">
                  <p className="font-bold">Allowable Carbon Credit:</p>
                  <p>{selectedAccountData.allowableCarbonCredits}</p>
                </div>
                <div className="mb-4">
                  <p className="font-bold">Allowable Carbon Emission:</p>
                  <p>{selectedAccountData.allowableCarbonEmission}</p>
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
                  <p>{selectedAccountData.carbonEmitted}</p>
                </div>
                <div className="mb-4">
                  <p className="font-bold">Payback CC:</p>
                  <p>{selectedAccountData.paybackCC}</p>
                </div>
                <div className="flex justify-center ">
                  <button
                    onClick={handleSendClick}
                    className="bg-purple-400 w-2/3 tracking-widest font-sans hover:bg-purple-500 text-xl text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Send Payback Request
                  </button>
                </div>
              </div>
            ) : (
              <h2>No data found</h2>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Payback_Id;
