"use client"

import { useEffect, useState } from "react"
import Display from "./components/display"

type Timer = {
  dias: string | number,
  horas: string | number,
  minutos: string | number,
  segundos: string | number
}

function Timer ({ date }: { date: string }) {
  const [time, setTime] = useState<Timer | null>(null)
  const [event, setEvent] = useState(false)

  useEffect(() => {
    const countdown = (eventDate: string) => {
      const deadline = new Date(eventDate).getTime()
      const now = new Date().getTime()
      const t = deadline - now
      const days = Math.floor(t / (1000 * 60 * 60 * 24))
      const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((t % (1000 * 60)) / 1000)

      setTime({ dias: days < 10 ? 0 + days : days, horas: hours < 10 ? '0' + hours : hours, minutos: minutes < 10 ? '0' + minutes : minutes, segundos: seconds < 10 ? '0' + seconds : seconds })

      if (t < 0) {
        setEvent(false)
        clearInterval(interval)
      }
    }
    const interval = setInterval(() => countdown(date), 1000)
    return () => clearInterval(interval)

  })
  return (
    <>
      {time &&
        <div className="flex flex-col flex-wrap justify-center w-full sm:flex-row">
          <Display label={"dias"} number={time.dias} />
          <Display label={"horas"} number={time.horas} />
          <Display label={"minutos"} number={time.minutos} />
          <Display label={"segundos"} number={time.segundos} />
        </div>
      }
    </>
  )
}

export default Timer