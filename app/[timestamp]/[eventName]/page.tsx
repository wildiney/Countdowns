"use client"
import { Events } from "@/app/interfaces/Events"
import Image from "next/image"
import Timer from "./timer"
import { Suspense, useEffect, useState } from "react"
import Background from "@/app/components/layout/background"
import Header from "@/app/components/layout/header"
import Display from "./components/display"

type TimerCountdown = {
  dias: string | number,
  horas: string | number,
  minutos: string | number,
  segundos: string | number
}

function Page ({ params }: { params: { timestamp: string, eventName: string, bgImage: string } }) {
  const [time, setTime] = useState<TimerCountdown>({ dias: 0, horas: 0, minutos: 0, segundos: 0 })
  const [countdown, setCountdown] = useState(false)

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
        setCountdown(true)
        clearInterval(interval)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Background>
        {/* <Header /> */}
        <div className="flex items-center justify-center w-full h-full">
          <div className="w-11/12 p-6 rounded-lg bg-slate-300 bg-opacity-80 sm:w-9/12 max-w-max">

            <h1 className="w-full mb-8 text-3xl font-bold text-center uppercase text-sky-950">{decodeURI(params.eventName)}</h1>

            <div className="flex flex-row flex-wrap justify-center">
              <div className="flex flex-row flex-wrap justify-center">
                {(parseInt(time.dias.toString()) > 0) ? <Display label="dias" number={time.dias} /> : null}
                <Display label="horas" number={time.horas}></Display>
              </div>
              <div className="flex flex-row flex-wrap justify-center">
                <Display label="minutos" number={time.minutos}></Display>
                <Display label="segundos" number={time.segundos}></Display>
              </div>
            </div>

          </div>
        </div>
      </Background>
    </>
  )
}

export default Page