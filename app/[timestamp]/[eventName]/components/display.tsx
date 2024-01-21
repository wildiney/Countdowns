import React from 'react'
import styles from './display.module.css'

function Display ({ label, number, color = 'sky-950' }: { label: string, number: string | number, color?: string }) {
  let measure = 60

  if (label.toLowerCase() == "dias" || label.toLowerCase() == "days") {
    measure = 365
  }
  if (label.toLowerCase() == "horas" || label.toLowerCase() == "hours") {
    measure = 24
  }

  const customStyles: React.CSSProperties = {
    background: `conic-gradient(#ccc ${360 - (+number / measure) * 360}deg, rgb(8 47 73) 0deg)`

  };
  return (
    <div className='flex flex-col items-center justify-center my-3 '>
      {/* <div className={`font-bold items-center justify-center w-24 h-24 mb-2 text-2xl text-${color} border-4 border-${color} rounded-full sm:mb-4 sm:w-32 sm:h-32 sm:text-3xl bg-gradient-conic bg-gradient-to-r-45 from-slate-50 via-transparent to-slate-900`}>{number}</div> */}
      <div className={`${styles.circularProgress} w-32 h-32 lg:w-48 lg:h-48 portrait:sm:w-40 portrait:sm:h-40 p-2`} style={customStyles}>
        <div className={` flex items-center text-2xl lg:text-4xl text-${color} justify-center w-full h-full font-bold bg-white rounded-full`}>
          {number}
        </div>
      </div>
      <div className={`flex items-center justify-center w-32 lg:text-2xl lg:mt-8 text-${color} font-semibold`}>{label}</div>
    </div >
  )
}

export default Display