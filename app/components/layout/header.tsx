"use client"
import React, { useRef, useState } from 'react'
import Logo from './logo'
import Link from 'next/link'

function Header ({ isHome, addCountdown }: { isHome?: boolean, addCountdown?: (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void }) {

  return (
    <>
      <div className='flex items-center justify-center w-full px-6 py-4 sm:justify-between' >
        <span className={`${isHome ? "hidden sm:block" : null} w-52 sm:block sm:w-52 `}>
          <Link href={'/'} ><Logo /></Link>
        </span>
        <span className={`${isHome ? "hidden sm:block" : null}`}>
          {addCountdown && <button
            className='hidden px-3 py-2 text-white rounded-md bg-sky-900 hover:bg-sky-800 sm:flex'
            onClick={addCountdown}>+countdown</button>
          }
        </span>
      </div>
    </>
  )
}

export default Header