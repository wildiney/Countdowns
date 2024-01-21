"use client"

import React, { useState } from 'react'

function Dialog ({ children, isOpen, closeModal }: { children: React.ReactNode, isOpen: boolean, closeModal?: (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void }) {

  return (
    <div className={`${isOpen ? "flex items-center justify-center" : "hidden"} fixed z-50  w-full h-full bg-slate-800 bg-opacity-80 `} onClick={closeModal}>
      <dialog open={isOpen ? isOpen : false} className='w-11/12 max-w-md p-6 rounded-lg opacity-100 sm:w-5/6 bg-slate-200'>
        {children}
      </dialog>
    </div>
  )
}

export default Dialog