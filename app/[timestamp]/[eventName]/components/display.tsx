import React from 'react'

function Display ({ label, number, color = 'sky-950' }: { label: string, number: string | number, color?: string }) {
  return (
    <div className='flex flex-col items-center justify-center mx-2 my-3 sm:mx-6 sm:my-8'>
      <div className={`flex font-bold items-center justify-center w-24 h-24 mb-2 text-2xl text-${color} border-2 border-${color} rounded-full sm:mb-4 sm:w-32 sm:h-32 sm:text-3xl`}>{number}</div>
      <div className={`flex items-center justify-center w-32 text-${color}`}>{label}</div>
    </div>
  )
}

export default Display