import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CircleStackIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BuyerPopup({ onclose, sellerAccountId }) {
  const location = useLocation();
  const BuyerAccountId = location.state.accountId;
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);
  const [formData, setFormData] = useState({
    sellerId: sellerAccountId,
    buyerId: BuyerAccountId,
    amountOfTokenBuy: ""
  });
  const handleChange = (e) => {
    //act as a call back function
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //prevent from refreshing page
    setFormData(formData);
    console.log(formData);

    axios
    .post("http://localhost:5001/api/user/expressInterestToBuy", formData) //POST: expressInterestToBuy
    .then((response) => {
      // console.log(response);
     
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
   
      // setTimeout(() => {
      //   navigate("/");
      //   localStorage.clear();
      // }, 3000);
    
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    });
  }

  return (
    <>
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                      <CircleStackIcon
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Enter the amount of tokens you want to buy
                      </Dialog.Title>
                      <div className="mt-2">
                        <form onSubmit={handleSubmit} className="w-full max-w-sm">
                          <div className="flex items-center border-b border-teal-500 py-2">
                            <input
                             value={formData.amountOfTokenBuy}
                             onChange={handleChange}
                             name="amountOfTokenBuy"
                              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                              type="number"
                              placeholder="Enter Token To Buy"
                              aria-label="Full name"
                            />
                            <button
                              className="flex-shrink-0 bg-teal-500 font-semibold hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                              type="submit"
                            >
                              Buy
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={onclose}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    <ToastContainer />
    </>
  );
}
