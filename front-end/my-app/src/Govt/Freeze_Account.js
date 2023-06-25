import React from 'react'

function Freeze_Account() {
  return (
    <div className="container mr-auto ml-[-32px] mt-12">
    <div className="grid ml-[75px] mr-[75px]  ">
        

        

        <div className="bg-[#FFF8D6] rounded-lg shadow-lg p-6">
        <div className="w-60 mb-4 px-4 py-1 bg-green-400 rounded-lg shadow">
        <div className="text-sm font-medium text-white truncate">
                Emitter Acc ID: 0.0.782701
            </div>
              </div>

           
            <div className='mb-4'>
                <p className='font-bold'>Account ID:</p>
                <p>0.0.547081</p>
            </div>
            <div className='mb-4'>
                <p className='font-bold'>Name:</p>
                <p>Apple Inc.</p>
            </div>
           <div className='mb-4'>
            <p className='font-semibold text-red-500 text-lg'>!This Emitter failed to payback in allowed time</p>

           </div>
            <div className='flex justify-center'>
                <button className='bg-red-800 hover:bg-red-900 text-white py-2 px-4 rounded mr-2'><div className="flex flex-col items-center">
                    <span className="text-sm">Freeze Account</span>
                     <span className="text-sm">ID: 0.0.671503</span>
                  </div>
                </button>
                </div>
            {/* <div className='flex justify-between'>
                <button className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'>Back</button>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Next</button>
            </div> */}
        </div>
    </div>
</div>
  )
}

export default Freeze_Account
