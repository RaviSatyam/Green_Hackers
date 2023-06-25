import React from 'react'

function Buy() {
  const buyerList = [
    { name: 'Buyer 1', tokens: 100 },
    { name: 'Buyer 2', tokens: 50 },
    { name: 'Buyer 3', tokens: 200 },
    { name: 'Buyer 4', tokens: 75 },
  ];

  return (
    <div className="container overflow-y-auto max-h-[538px] mr-auto ml-[-32px] mt-12">
    <div className="grid  ml-[75px] mr-[75px]  ">
      <div className="bg-lime-200 rounded-lg shadow-lg p-6">


        <div className='flex justify-between mx-40 mb-4'>
        <h1 className='font-bold text-lg' >Buyer List:</h1>
        <h1 className='font-bold text-lg'>Buyer:</h1>
        </div>
      

{/* ---------------------First Card----------------------------------------- */}

<div className="container mx-auto flex justify-between">

 <div className="w-1/2 bg-white rounded-lg shadow-lg p-6 mx-2">

 <table className="min-w-full divide-y divide-blue-600">
      <thead>
        <tr>
          <th scope="col" className="px-6 py-3 text-center text-xl font-medium text-gray-500 uppercase tracking-wider">
            Buyer List
          </th>
        
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {buyerList.map((buyer, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{buyer.name}</div>
            </td>
           
          </tr>
        ))}
      </tbody>
    </table>
 </div>

 {/* ---------------------Another Card----------------------------------------- */}

 <div className="w-1/2 bg-white rounded-lg shadow-lg p-6">
  <h1 className='text-xl font-bold mb-6 text-center text-blue-600'>Interested Buyer</h1>
 <h2 className="text-lg font-semibold mb-4">Name of Buyer:<span>UD</span></h2>
  <h2 className="text-lg font-semibold mb-4">Amount of Token to buy:<span>213</span></h2>

  <div className=' flex justify-center'>

<button className="mt-36 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded focus:outline-none focus:shadow-outline">Approve</button>
<button className="mt-36 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Reject</button>
</div>
 </div>

</div>










        </div>
        </div>
        </div>
  )
}

export default Buy
