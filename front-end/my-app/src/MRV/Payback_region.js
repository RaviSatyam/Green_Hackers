/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Emitter_popup from "./Emitter_popup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Payback_region() {
  const [showModal, setShowModal] = useState(false);
  const [region, setRegion] = useState("");
  const [industryType, setIndustryType] = useState("");
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    setRegion(e.target.value);
  };
  const handleChange2 = (e) => {
    setIndustryType(e.target.value);
  };

  const handleOpenModal = (accountId) => {
    setSelectedAccountId(accountId);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleSendAll = () => {
    axios
      .put("http://localhost:5001/api/user/setCCpaybackForAllSortedEmitter", {
        region: region,
        industryType: industryType,
      })
      .then((response) => {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        // console.log(response.data)
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        // console.log(error.response.data)
      });
  };

  useEffect(() => {
    if (region && industryType) {
      fetchData();
    }
  }, [region, industryType]);

  const fetchData = () => {
    axios
      .get(
        "http://localhost:5001/api/user/getPaybackRequestDetailsByAllSortedEmitter",
        {
          params: {
            region: region,
            industryType: industryType,
          },
        }
      )
      .then((response) => {
        setData(response.data);
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <>
      <div className="container  mr-auto ml-[-32px] mt-12">
        <div className="grid  ml-[75px] mr-[75px]  ">
          <div className="bg-[#FFF8D6] rounded-lg shadow-lg p-6">
            {/* -------------------------Region-------------------------- */}
            <div className="flex justify-between">
              <select
                className="w-60 sticky top-0 px-4 py-1 h-[48px] bg-green-400 cursor-pointer rounded-lg shadow text-sm bg-green-400 appearance-none border-none focus:border-emerald-300  font-medium text-white truncate"
                value={region}
                onChange={handleChange}
              >
                <option disabled value="">
                  Select Region
                </option>
                <option value="IND">Region: IND</option>
                <option value="USA">Region: USA</option>
                <option value="UAE">Region: UAE</option>
              </select>

              {/* -------------------------Industry-------------------------- */}
              <select
                className="w-60 sticky top-0 px-4 py-1 bg-green-400 cursor-pointer rounded-lg shadow text-sm bg-green-400 appearance-none border-none focus:border-emerald-300  font-medium text-white truncate"
                value={industryType}
                onChange={handleChange2}
              >
                <option disabled value="">
                  Select Industry Type
                </option>
                <option value="IT">Industry Type: IT</option>
                <option value="Manufacturing">
                  Industry Type: Manufacturing
                </option>
                <option value="Transportation">
                  Industry Type: Transportation
                </option>
                <option value="Automotive">Industry Type: Automotive</option>
              </select>
            </div>
            {/* -------------------------Table-------------------------- */}
            <div className="mt-6 flex justify-center ">
              <table className="table-auto ">
                <tbody className="overflow-y-scroll h-40">
                  <tr>
                    <td className="border px-52 py-2 bg-lime-100 font-semibold">
                      Allowable Carbon Credit
                    </td>
                  </tr>
                  {data.map((item) => (
                    <tr key={item.emitterAccountId}>
                      <td className="border px-4 py-2 ">
                        <div className="flex justify-between">
                          <span className="font-bold text-indigo-700">
                            Emitter's 1
                          </span>
                          <span className="font-bold text-purple-700">
                            AccountId: {item.emitterAccountId}
                          </span>
                          <button
                            onClick={() =>
                              handleOpenModal(item.emitterAccountId)
                            }
                            className="rounded-md bg-blue-700 p-0.5 text-xs text-slate-50 hover:text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            See More
                          </button>
                          {showModal && (
                            <Emitter_popup
                              onClose={handleCloseModal}
                              accountId={selectedAccountId}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* buttons */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleSendAll}
                className="flex w-half justify-center rounded-md bg-purple-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send Payback Request For All
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Payback_region;
