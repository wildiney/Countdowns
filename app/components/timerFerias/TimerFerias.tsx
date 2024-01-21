//TODO: REMOVE THIS FILE

"use client"

import { Suspense, useEffect, useState } from "react"
import { vacationTime } from '@/app/constants/constants'
interface ITimerFerias {
    dias: string | number,
    horas: string | number,
    minutos: string | number,
    segundos: string | number
}

function TimerFerias () {
    const [time, setTime] = useState<ITimerFerias>({ dias: 0, horas: 0, minutos: 0, segundos: 0 })
    const [ferias, setFerias] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            const deadline = new Date(vacationTime).getTime()
            const now = new Date().getTime()
            const t = deadline - now
            const days = Math.floor(t / (1000 * 60 * 60 * 24))
            const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((t % (1000 * 60)) / 1000)
            setTime({ dias: days < 10 ? 0 + days : days, horas: hours < 10 ? '0' + hours : hours, minutos: minutes < 10 ? '0' + minutes : minutes, segundos: seconds < 10 ? '0' + seconds : seconds })
            if (t < 0) {
                setFerias(true)
                clearInterval(interval)
            }
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    if (!ferias) {
        return (
            <Suspense fallback={<p>loading timer</p>}>
                <div className='flex flex-col items-center justify-center h-full pb-36'>
                    <div style={{ border: '3px solid white' }}>
                        <p className='text-center text-white font-semibold font-mono mb-2 xl:mb-4 drop-shadow-[0_6px_6px_rgba(0,0,0,0.4)]'>
                            <span className="block sm:w-full md:inline md:mr-10 text-9xl md:text-7xl lg:text-8xl xl:text-9xl" aria-label={`${time.dias} dias`}>{time.dias}<span className="text-5xl md:text-6xl" role="presentation">d</span></span>
                            <span className="block sm:w-full md:inline md:mr-10 text-7xl md:text-7xl lg:text-8xl xl:text-9xl" aria-label={`${time.horas} horas`}>{time.horas}<span className="text-3xl md:text-6xl" role="presentation">h</span></span>
                            <span className="block text-5xl sm:w-full md:inline md:mr-10 md:text-7xl lg:text-8xl xl:text-9xl" aria-label={`${time.minutos} minutos`}>{time.minutos}<span className="text-xl md:text-6xl" role="presentation">m</span></span>
                            <span className="block text-3xl sm:w-full md:inline md:text-7xl lg:text-8xl xl:text-9xl" aria-label={`${time.segundos} segundos`}>{time.segundos}<span className="text-lg md:text-6xl" role="presentation">s</span></span>
                        </p>
                        <p className='text-center text-5xl leading-relaxed text-white font-semibold mb-2 mt-10 drop-shadow-[0_6px_6px_rgba(0,0,0,0.4)]'>para as <span className="text-7xl">FÉRIAS!</span></p>
                    </div>
                </div >
            </Suspense>
        )
    } else {
        return (
            <Suspense fallback={<p>loading timer</p>}>
                <div className='w-11/12 m-auto translate-y-40 md:w-9/12 md:translate-y-32 lg:translate-y-32 xl:translate-y-44'>
                    <p className='mb-2 text-4xl font-semibold text-center text-white md:text-5xl lg:text-5xl xl:text-6xl xl:mb-4 drop-shadow-lg'>Modo Férias</p>
                    <p className='mb-2 font-mono text-5xl font-semibold text-center text-white md:text-7xl lg:text-8xl xl:text-9xl xl:mb-4 drop-shadow-lg'>ativado com sucesso!</p>
                </div>
            </Suspense>
        )

    }
}

export default TimerFerias