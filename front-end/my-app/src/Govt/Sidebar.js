/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-pascal-case */
import React, { useState } from 'react'
import Review_Emitter from './Review_Emitter';
import Review_allowance from './Review_allowance';
import Request_Payback from './Request_Payback';
import Freeze_Account from './Freeze_Account';
import { useNavigate } from 'react-router-dom';
import Navbar_Gov from './Navbar_Gov';


function Sidebar() {
    

    
        const navigate = useNavigate();
  
    const [activeButton, setActiveButton] = useState(0);

    const handleButtonClick = (buttonIndex) => {
                setActiveButton(buttonIndex)
    }
  
    const logout = ()=>{
        localStorage.clear();
        navigate('/')
        window.location.reload();


      }

  return (
    <>
    <Navbar_Gov/>
    <div className="flex">
            <div className="flex flex-col h-screen p-3 bg-green-200 shadow w-[234px]">
                <div className="space-y-3">
                    <div className="flex items-center">
                        <h2 className="text-xl font-bold">Dashboard</h2>
                    </div>
                    <div className="flex-1">
                        <ul className=" pt-2 pb-4 space-y-3 text-sm">
                            <li className={`${activeButton ===0 ? 'bg-blue-800' : 'bg-blue-700'} text-white font-medium hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}>
                                <a onClick={()=>handleButtonClick(0)}
                                    href="#"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    
                                    <span className='text-left'>Review Emitters Joining Request</span>
                                </a>
                            </li>
                            <li className={`${activeButton ===1 ? 'bg-blue-800' : 'bg-blue-700'} text-white font-medium hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}>
                                <a onClick={()=>handleButtonClick(1)}
                                    href="#"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                   
                                    <span className='text-left'>Review Allowance Requests</span>
                                </a>
                            </li>
                            <li className={`${activeButton ===2 ? 'bg-blue-800' : 'bg-blue-700'} text-white font-medium hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}>
                                <a onClick={()=>handleButtonClick(2)}
                                    href="#"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                   
                                    <span className='text-left'>Request Payback</span>
                                </a>
                            </li>
                            <li className={`${activeButton ===3 ? 'bg-blue-800' : 'bg-blue-700'} text-white font-medium hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}>
                                <a onClick={()=>handleButtonClick(3)}
                                    href="#"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                  
                                    <span>Freeze Account</span>
                                </a>
                            </li>
                            <li className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                <a onClick={logout}
                                    href="#"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                        />
                                    </svg>
                                    <span>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {activeButton===0 ? <Review_Emitter/> : null}
            {activeButton===1 ? <Review_allowance/> : null}
            {activeButton===2 ? <Request_Payback/> : null}
            {activeButton===3 ? <Freeze_Account/> : null}
        </div>
        </>
  )
}

export default Sidebar
