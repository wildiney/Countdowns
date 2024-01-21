"use client"
import { Suspense, useEffect, useState } from "react"
import Background from "@/app/components/layout/background"
import Display from "./components/display"
import Header from "@/app/components/layout/header"

type TimerCountdown = {
  dias: string | number,
  horas: string | number,
  minutos: string | number,
  segundos: string | number
}

function Page ({ params }: { params: { timestamp: string, eventName: string, bgImage: string } }) {
  const [time, setTime] = useState<TimerCountdown>({ dias: 0, horas: 0, minutos: 0, segundos: 0 })
  const [countdown, setCountdown] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      const deadline = parseInt(params.timestamp)
      const now = new Date().getTime()
      const t = deadline - now
      const days = Math.floor(t / (1000 * 60 * 60 * 24))
      const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((t % (1000 * 60)) / 1000)
      setTime({ dias: days < 10 ? 0 + days : days, horas: hours < 10 ? '0' + hours : hours, minutos: minutes < 10 ? '0' + minutes : minutes, segundos: seconds < 10 ? '0' + seconds : seconds })
      if (t < 0) {
        setCountdown(false)
        clearInterval(interval)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [params.timestamp])

  return (
    <>
      <Background>
        <Header />
        {countdown ? <div className="flex items-center justify-center flex-1 w-full h-full">
          <div className="w-full p-6 mx-6 -translate-y-6 bg-opacity-50 rounded-lg sm:translate-y-0 bg-slate-300 drop-shadow-2xl max-w-max backdrop-blur-md">

            <h1 className="w-full mb-8 overflow-hidden text-xl font-bold text-center uppercase whitespace-nowrap lg:mb-8 lg:text-4xl text-ellipsis sm:text-3xl text-sky-950">{decodeURI(params.eventName)}</h1>

            <div className="flex flex-row flex-wrap justify-around w-full gap-2 lg:gap-8">
              {(parseInt(time.dias.toString()) > 0) ? <Display label="dias" number={time.dias} /> : null}
              <Display label="horas" number={time.horas} color="sky-950"></Display>
              <Display label="minutos" number={time.minutos}></Display>
              <Display label="segundos" number={time.segundos}></Display>
            </div>

          </div>
        </div> : <div className="flex items-center justify-center flex-1 w-full h-full">
          <div className="w-full p-6 mx-6 -translate-y-6 rounded-lg sm:translate-y-0 bg-slate-300 bg-opacity-80 drop-shadow-2xl max-w-max">
            <h1 className="w-full overflow-hidden text-xl font-bold text-center uppercase whitespace-nowrap lg:text-4xl text-ellipsis sm:text-3xl text-sky-950">{decodeURI(params.eventName)}</h1>
            <p className="w-full text-lg font-bold text-center uppercase whitespace-nowrap text-ellipsis text-sky-950">Evento Expirado</p>
          </div>
        </div>
        }
      </Background>
    </>
  )
}

export default Page