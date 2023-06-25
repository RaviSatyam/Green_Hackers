import React, { useEffect, useState } from "react";
import BuyerPopup from "./BuyerPopup";
import axios from "axios";

function BuyerPortal() {
  const [popup, setPopup] = useState(false);
  const [sellerAccountId, setSellerAccountId] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/user//getAllSellerList")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCloseModal = () => {
    setPopup(false);
  };

  const handleBuy = (accountId) => {
    setSellerAccountId(accountId);
    setPopup(true);
  };
  return (
    <>
      {/* Card section */}
      <div className="container mx-auto mx-8 w-[920px]  mt-12">
        <div className="w-full rounded-lg shadow-lg overflow-x-auto">
          <table className="w-full bg-[#FFF8D6] whitespace-no-wrap">
            <thead>
              <tr className="text-left font-bold">
                <th className="px-6 pt-6 pb-4">Seller Name</th>
                <th className="px-6 pt-6 pb-4">Account Id</th>
                <th className="px-6 pt-6 pb-4">Available CC</th>
                <th className="px-6 pt-6 pb-4">Interested To Buy</th>
              </tr>
            </thead>
            {data.length !== 0 ? (
              <tbody className="bg-table divide-y divide-gray-200">
                {data.map((item) => (
                  <tr key={item.accountId}>
                    <td className="px-6 py-4 font-semibold text-violet-800 whitespace-no-wrap">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 font-semibold text-violet-800 whitespace-no-wrap">
                      {item.accountId}
                    </td>
                    <td className="px-6 py-4 font-semibold text-violet-800 whitespace-no-wrap">
                      {item.remainingCC}
                    </td>
                    <td className="px-6 py-4 flex font-semibold text-violet-800 whitespace-no-wrap">
                      <button
                        onClick={() => handleBuy(item.accountId)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full mr-2"
                      >
                        Buy
                      </button>
                      {popup && (
                        <BuyerPopup
                          sellerAccountId={sellerAccountId}
                          onclose={handleCloseModal}
                        />
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
    </>
  );
}

export default BuyerPortal;
