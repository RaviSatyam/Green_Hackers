/* eslint-disable react/jsx-pascal-case */
import React, {useEffect, useState} from 'react';
import Emitter_popup from "./Emitter_popup";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Set_region() {
    const [showModal, setShowModal] = useState(false);
    const [region, setRegion] = useState('');
    const [industryType, setIndustryType] = useState('');
    const [selectedAccountId, setSelectedAccountId] = useState('');
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false);

    console.log('selected ac id is:', selectedAccountId)

    const handleChange = (e) => {        
      setRegion(e.target.value)
  }
  const handleChange2 = (e) => {        
      setIndustryType(e.target.value)
  }

    const handleOpenModal = (accountId) => {
      setSelectedAccountId(accountId);
        setShowModal(true);
    }
    const handleCloseModal = () => {
        setShowModal(false);
    }

    useEffect(()=> {
      if (region && industryType){
        fetchData();
      }
     }, [region, industryType]);
  
     const fetchData = () => {
      axios.get('http://localhost:5001/api/user/getCCallowanceRequestToAllSortedEmitter', {
        params: {
          region: region,
          industryType: industryType
        }
      })
      .then((response)=> {
        setData(response.data);
        console.log(response.data.message);
      })
      .catch((error)=> {
        console.log(error.response.data.message);
      })
     }

     const handleSendAll = () => {
      setLoader(true);
      axios
      .put('http://localhost:5001/api/user/setCCForAllSortedEmitter',{
        region: region,
        industryType: industryType
      }).then((response)=>{
        console.log(response.data.message);
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(() => {
          window.location.reload(); 
      }, 3000);
      }).catch((error)=> {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        console.log(error.response.data.message); 
      })
      .finally(()=> {
        setLoader(false);
      })
     }
  return (
    <>
    <div className="container  mr-auto ml-[-32px] mt-12">
      <div className="grid  ml-[75px] mr-[75px]  ">
        <div className="bg-[#FFF8D6] rounded-lg shadow-lg p-6">
          {/* -------------------------Region-------------------------- */}
          <div className="flex justify-between">
            <select className="w-60 sticky top-0 px-4 py-1 h-[48px] bg-green-400 cursor-pointer rounded-lg shadow text-sm bg-green-400 appearance-none border-none focus:border-emerald-300  font-medium text-white truncate"
            value={region}
            onChange={handleChange}>
              <option disabled value="">
                Select Region
              </option>
              <option value="IND">Region: IND</option>
              <option value="USA">Region: USA</option>
              <option value="UAE">Region: UAE</option>

              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" viewBox="0 0 20 20">
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </div>
            </select>

            {/* -------------------------Industry-------------------------- */}
            <select className="w-60 sticky top-0 px-4 py-1 bg-green-400 cursor-pointer rounded-lg shadow text-sm bg-green-400 appearance-none border-none focus:border-emerald-300  font-medium text-white truncate"
            value={industryType}
            onChange={handleChange2}>
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

              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" viewBox="0 0 20 20">
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </div>
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
                {data.map((item)=> (
                <tr key={item.accountId}>
                  <td className="border px-4 py-2 ">
                    <div className="flex justify-between">
                      <span className="font-bold text-indigo-700">
                        {item.name}
                      </span>
                      <span className="font-bold text-purple-700">
                        {item.accountId}
                      </span>
                      <button onClick={()=>handleOpenModal(item.accountId)} className="rounded-md bg-blue-700 p-0.5 text-xs text-slate-50 hover:text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        See More
                      </button>
                      {showModal && <Emitter_popup onClose={handleCloseModal} accountId={selectedAccountId}/>}
                     
                    </div>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* buttons */}
          <div className="mt-6 flex justify-center">
            {loader ? (<div
                          className="flex w-half justify-center rounded-md bg-purple-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
                        </div>):(
          <button
                onClick={handleSendAll}
               
                className="flex w-half justify-center rounded-md bg-purple-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send All
              </button>
                        )}
            
          </div>
        </div>
      </div>
    </div>
    <ToastContainer />
    </>
  )
}

export default Set_region
