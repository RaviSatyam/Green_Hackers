import React, { useEffect, useState } from "react";
import axios from "axios";
import "./table.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Review_Emitter() {
  // const location = useLocation();
  // const accountId = location.state.accountId;
const [loadingRow, setLoadingRow] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/user/findUserRegisterDetails")
      .then((response) => {
        setData(response.data);
       
      })
      .catch((error) => {
        console.log(error);
        
      });
  }, []);

  const handleApprove = (accountId) => {
   setLoadingRow((prevState)=> ({
      ...prevState,
      [accountId]: {accept: true, reject: prevState[accountId]?.reject},
   }));
    axios
      .put("http://localhost:5001/api/user/acceptEmitterRegReq/", {
        accountId: accountId,
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
        console.log("error", error)
    
      })
      // .finally(()=> {
      //   setLoaderAccept(false);
      // });
  };

  const handleDelete = (accountId) => {
    setLoadingRow((prevState)=> ({
      ...prevState,
      [accountId]: {reject: true, accept: prevState[accountId]?.accept},
   }));
    axios
      .delete("http://localhost:5001/api/user/rejectEmitterRegReq", {
        data: { accountId },
      })
      .then(() => {
        toast.success("Rejected Successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      
      })
      .catch((error) => {
        console.log("error of reject is", error);
      
      })
      // .finally(()=> {
      //   setLoaderReject(false);
      // })
  };
  return (
    <>
      {/* Card section */}
      <div className="container mx-auto mx-8 w-[920px]  mt-12">
        <div className="w-full rounded-lg shadow-lg overflow-x-auto">
          <table className="w-full bg-[#FFF8D6] whitespace-no-wrap">
            <thead>
              <tr className="text-left font-bold">
                <th className="px-6 pt-6 pb-4">Account ID</th>
                <th className="px-6 pt-6 pb-4">Name</th>
                <th className="px-6 pt-6 pb-4">Description</th>
                <th className="px-6 pt-6 pb-4">Actions</th>
              </tr>
            </thead>
            {data.length !== 0 ? (
              <tbody className="bg-table divide-y divide-gray-200">
                {data.map((item) => (
                  <tr key={item.accountId}>
                    <td className="px-6 py-4 font-semibold text-violet-800 whitespace-no-wrap">
                      {item.accountId}
                    </td>
                    <td className="px-6 py-4 font-semibold text-violet-800 whitespace-no-wrap">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 font-semibold text-violet-800 whitespace-no-wrap">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 flex font-semibold text-violet-800 whitespace-no-wrap">
                      {loadingRow[item.accountId]?.accept? (
                        <div
                          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full mr-2"
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
                          <span>Wait..</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleApprove(item.accountId)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full mr-2"
                        >
                          Approve
                        </button>
                      )}
                      {loadingRow[item.accountId]?.reject ? (
                        <div
                          className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full"
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
                          <span>Wait..</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleDelete(item.accountId)}
                          className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full"
                        >
                          Reject
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <h2 style={{ color: "green" }}>
                No Account for review pending found!
              </h2>
            )}
          </table>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Review_Emitter;
