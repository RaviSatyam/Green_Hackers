import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Request_Payback() {
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [selectedAccountData, setSelectedAccountData] = useState("");
  const [emitterName, setEmitterName] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    // console.log("selectedacid", selectedAccountId);
  }, [selectedAccountId]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/user/getPaybackDetailsRequestByGovt") //Get All
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
      .get(
        "http://localhost:5001/api/user/getPaybackDetailsRequestByGovtById",
        {
          //Get By AccountId
          params: {
            accountId: accountId,
          },
        }
      )
      .then((response) => {
        setSelectedAccountData(response.data);

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
        setEmitterName(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handleRequest = () => {
    axios
      .put("http://localhost:5001/api/user/paybackReqToEmitterByAcId", {
        accountId: selectedAccountId,
      })
      .then((response) => {
        console.log(response.data.message);
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
  };

  const handleToAll = () => {
    axios
      .put("http://localhost:5001/api/user/paybackReqToAllEmitter")
      .then((response) => {
        console.log(response.data.message);
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
  };

  return (
    <>
      <div className="container mr-auto ml-[-32px] mt-12">
        <div className="grid ml-[75px] mr-[75px]  ">
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
            {/* <div className="w-60 mb-4 px-4 py-1 bg-green-400 rounded-lg shadow">
            <div className="text-sm font-medium text-white truncate">
              Emitter Acc ID: 0.0.782701
            </div>
          </div> */}

            <div className="mb-4">
              <p className="font-bold">Name:</p>
              <p>{emitterName.name}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold">Carbon Emitted:</p>
              <p>{selectedAccountData.carbonEmitted}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold">Based on MRV data:</p>
              <table className="table-fixed">
                <tbody>
                  <tr>
                    <td className="border px-4 py-2 bg-lime-100">
                      Payback Amount
                    </td>
                    <td className="border px-4 py-2 font-semibold">
                      {selectedAccountData.paybackCC} CT
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleRequest}
                className="bg-blue-500 hover:bg-blue-700 font-semibold text-white py-2 px-4 rounded-full mr-2"
              >
                <div className="flex flex-col items-center">
                  <span className="text-sm">
                    Request {selectedAccountData.paybackCC} CT from
                  </span>
                  <span className="text-sm">
                    ID: {selectedAccountData.emitterAccountId}
                  </span>
                </div>
              </button>
            </div>
          </div>
          <div className="flex mt-8 justify-center">
            <button
              onClick={handleToAll}
              className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded mr-2"
            >
              Request Payback from All Emitters
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Request_Payback;
