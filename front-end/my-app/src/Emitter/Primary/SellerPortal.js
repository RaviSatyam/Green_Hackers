import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SellerPortal() {
  const location = useLocation();
  const sellerId = location.state.accountId;
  const [data, setData] = useState([]);
  const [interestedBuyer, setInterestedBuyer] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/user/getAllBuyerSchema")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/user/getInterestedBuyerList", {
        params: {
          sellerId: sellerId,
        },
      })
      .then((response) => {
        const buyers = response.data.buyers;
        setInterestedBuyer(buyers[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleApprove = () => {
    axios
      .put("http://localhost:5001/api/user/approveTransaction", {
        sellerId: sellerId,
        buyerId: interestedBuyer.accountId
      })
      .then(() => {
        toast.success("Approved Successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.log("error", error);
      });
    // .finally(()=> {
    //   setLoaderAccept(false);
    // });
  };

  const handleReject = () => {
    axios
      .delete("http://localhost:5001/api/user/rejectEmitterRegReq", {
        sellerId: sellerId,
        buyerId: interestedBuyer.accountId,
      })
      .then((response) => {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        //  console.log("error of reject is", error);
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
    // .finally(()=> {
    //   setLoaderReject(false);
    // })
  };

  return (
    <>
      <div className="container overflow-y-auto max-h-[538px] mr-auto ml-[-32px] mt-12">
        <div className="grid  ml-[75px] mr-[75px]  ">
          <div className="bg-lime-200 rounded-lg shadow-lg p-6">
            <div className="flex justify-between mx-40 mb-4">
              <h1 className="font-bold text-lg">Buyer List:</h1>
              <h1 className="font-bold text-lg">Buyer:</h1>
            </div>

            {/* ---------------------First Card----------------------------------------- */}

            <div className="container mx-auto flex justify-between">
              <div className="w-1/2 bg-white rounded-lg shadow-lg p-6 mx-2">
                <table className="min-w-full divide-y divide-blue-600">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xl font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Buyer List
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((buyer) => (
                      <tr key={buyer.accountId}>
                        <td className="px-6 py-4 flex justify-between whitespace-nowrap">
                          <div className="text-sm text-blue-900">
                            {buyer.name}
                          </div>
                          <div className="text-sm text-blue-900">
                            {buyer.accountId}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ---------------------Another Card----------------------------------------- */}

              <div className="w-1/2 bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-xl font-bold mb-6 text-center text-blue-600">
                  Interested Buyer
                </h1>
                {interestedBuyer && (
                <>
                <h2 className="text-lg font-semibold mb-4">
                  Name of Buyer:<span className="text-green-400">{interestedBuyer.name}</span>
                </h2>
                <h2 className="text-lg font-semibold mb-4">
                  Amount of Token to buy:
                  <span className="text-green-400">{interestedBuyer.amountOfTokenBuy}</span>
                </h2>
                
                </>
                )}

                <div className=" flex justify-center">
                  <button
                    onClick={handleApprove}
                    className="mt-36 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Approve
                  </button>
                  <button
                    onClick={handleReject}
                    className="mt-36 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default SellerPortal;
