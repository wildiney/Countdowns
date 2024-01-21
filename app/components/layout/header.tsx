"use client"
import React, { useRef, useState } from 'react'
import Logo from './logo'

function Header ({ isHome, addCountdown }: { isHome?: boolean, addCountdown: (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void }) {

  return (
    <>
      <div className='fixed top-0 left-0 flex items-center justify-between w-full p-6' >
        <span className='hidden sm:block sm:w-64 '>
          <Logo />
        </span>
        <span>
          <button
            className='hidden px-3 py-2 text-white rounded-md bg-sky-900 hover:bg-sky-800 sm:flex'
            onClick={addCountdown}>+countdown</button>
        </span>
      </div>
    </>
  )
}

export default Header