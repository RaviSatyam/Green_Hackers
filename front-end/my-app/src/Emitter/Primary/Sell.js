import React from 'react'

function Sell() {
  return (
    <div className="container overflow-y-auto max-h-[538px] mr-auto ml-[-32px] mt-12">
    <div className="grid  ml-[75px] mr-[75px]  ">
      <div className="bg-red-200 rounded-lg shadow-lg p-6">


        <div className='flex justify-between mx-40 mb-4'>
        <h1 className='font-bold text-lg' >Market Sell:</h1>
        <h1 className='font-bold text-lg'>Limit Sell:</h1>
        </div>
      

{/* ---------------------First Card----------------------------------------- */}

<div className="container mx-auto flex justify-between">

 <div className="w-1/2 bg-white rounded-lg shadow-lg p-6 mx-2">

  <h2 className="text-lg font-semibold mb-4">Offer Available:</h2>

  <div className="relative mb-4">
    <h3 className="text-sm font-semibold mb-4">Available Buyers:</h3>
    <div className='flex items-center'>

   <select className="block appearance-none w-full bg-gray-100 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">

    <option>Option 1</option>

    <option>Option 2</option>

    <option>Option 3</option>

   </select>

   <div className="pointer-events-none  text-gray-700">

    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12l-6-6h12z"/></svg>

   </div>
   </div>

  </div>

  <div className="relative mb-4">
    <h3 className="text-sm font-semibold mb-4">Desired Token Amount:</h3>
    <div className='flex justify-center '>

  <button className='bg-blue-300 py-2 px-24 rounded focus:outline-none focus:shadow-outline'>1102 CT</button>

   
   </div>

  </div>
  <div className='flex justify-center'>

  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sell 1102 CT</button>
  </div>
 </div>

 {/* ---------------------Another Card----------------------------------------- */}

 <div className="w-1/2 bg-white rounded-lg shadow-lg p-6">

  <h2 className="text-lg font-semibold mb-4">Amount  of Token you want to sell:</h2>
<div className='flex justify-center'>
  <button className=" bg-blue-300   hover:bg-blue-700 text-white font-bold py-2 px-24  rounded focus:outline-none focus:shadow-outline">923 CT</button>
  </div>
  <div className=' flex justify-center'>

<button className="mt-36 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Offer to Sell</button>
</div>
 </div>

</div>










        </div>
        </div>
        </div>
  )
}

export default Sell
