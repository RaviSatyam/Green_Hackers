import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Set_Id() {
  const [data, setData] = useState([]);
  const [region, setRegion] = useState("");
  const [industryType, setIndustryType] = useState("");
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [selectedAccountData, setSelectedAccountData] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    console.log("selectedacid", selectedAccountId);
  }, [selectedAccountId]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/user/getAllEmitterBeforeCC") // Get All
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
      .get("http://localhost:5001/api/user/getEmitterCCReqById", {
        //Get by AccountId
        params: {
          accountId: accountId,
        },
      })
      .then((response) => {
        setSelectedAccountData(response.data);
        setRegion(response.data.region);
        setIndustryType(response.data.industryType);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handleSetClick = () => {
    setLoader(true);
    axios
      .put("http://localhost:5001/api/user/setCCallowance", {
        //Set button
        accountId: selectedAccountId,
        region: region,
        industryType: industryType,
      })
      .then((response) => {
        console.log(response.data);
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(() => {
          window.location.reload();
        },2000);
      })
      .catch((error) => {
        console.log(error.response.data);
        toast.warning(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .finally(()=> {
        setLoader(false);
      })
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
                <option key={item.accountId} value={item.accountId}>
                  A/C ID: {item.accountId}
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </div>
            {selectedAccountData ? (
              <div>
                <div>
                  <h1 className="my-5 text-2xl font-bold tracking-wide text-blue-700">
                    {selectedAccountData.name} Profile
                  </h1>
                </div>

                <div className=" mb-4">
                  <p className=" font-bold">Account ID: </p>
                  <p>{selectedAccountData.accountId}</p>
                </div>
                <div className="mb-4">
                  <p className="font-bold">Name:</p>
                  <p>{selectedAccountData.name}</p>
                </div>
                <div className="mb-4">
                  <p className="font-bold">Description:</p>
                  <p className="text-gray-600">
                    {selectedAccountData.description}
                  </p>
                </div>
                {/* <div className="mb-4">
                  <p className="font-bold">Allowable Carbon Credit:</p>
                  <p>{selectedAccountData.allowableCarbonCredits}</p>
                </div>
                <div className="mb-4">
                  <p className="font-bold">Allowable Carbon Emission:</p>
                  <p>{selectedAccountData.allowableCarbonEmission}</p>
                </div> */}
                <div className="mb-4">
                  <p className="font-bold">Region:</p>
                  <p>{selectedAccountData.region}</p>
                </div>
                <div className="mb-4">
                  <p className="font-bold">Industry Type:</p>
                  <p>{selectedAccountData.industryType}</p>
                </div>
                {/* <div className="mb-4">
                  <p className="font-bold">Carbon Emitted:</p>
                  <p>{selectedAccountData.carbonEmitted}</p>
                </div>
                <div className="mb-4">
                  <p className="font-bold">Payback CC:</p>
                  <p>{selectedAccountData.paybackCC}</p>
                </div> */}

                <div className="flex justify-center ">
                  {loader ? (<div
                          className="bg-purple-400 flex justify-center w-2/3 tracking-widest font-sans hover:bg-purple-500 text-xl text-white font-bold py-2 px-4 rounded mr-2"
                          role="status"
                        >
                          <svg
                            aria-hidden="true"
                            class="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span></span>
                        </div>) : (
                  <button
                    onClick={handleSetClick}
                    className="bg-purple-400 w-2/3 tracking-widest font-sans hover:bg-purple-500 text-xl text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Set
                  </button>
                        )}
                
                </div>
              </div>
            ) : (
              <h2>No AccountId Selected</h2>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Set_Id;
