"use client"
import '@/app/globals.css'
import React from 'react'
import Image from 'next/image'

function Index ({ children, bgImage }: { children: React.ReactNode, bgImage?: string }) {

    return (
        <>
            <div className='z-10 flex flex-col w-full h-full'>{children}</div>
            <div className='fixed z-0 w-full h-full'>
                <div className='w-full h-full maskBody' style={{ zIndex: 2 }}></div>
                <Image
                    src={bgImage ? bgImage : 'https://source.unsplash.com/random/?travel,art,architecture'}
                    alt=''
                    fill={true}
                    priority={false}
                    style={{ position: 'absolute', objectFit: 'cover', zIndex: -1 }}
                    className='maskbody'
                    role='presentation'
                />
            </div>
        </>
    )
}

export default Index