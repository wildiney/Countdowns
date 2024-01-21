"use client"
import Background from '@/app/components/layout/background'
import Header from '@/app/components/layout/header'
import Logo from '@/app/components/layout/logo'
import Dialog from './components/layout/dialog'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

type CountdownItem = {
  name: string;
  link: string;
}

export default function Home () {
  const [isOpen, setIsOpen] = useState(false)
  const eventName = useRef<HTMLInputElement>(null)
  const date = useRef<HTMLInputElement>(null)
  const [hasURL, setHasURL] = useState(false)
  const [url, setURL] = useState<string>('')
  const [countdowns, setCountdowns] = useState<{ name?: String, link: string }[]>([])
  const [dateHasError, setDateHasError] = useState(false)
  const [eventNameHasError, seteventNameHasError] = useState(false)
  const [eventError, setEventError] = useState('')
  const [dateError, setDateError] = useState('')

  useEffect(() => {
    const localStorageData = localStorage.getItem("countdowns")
    if (localStorageData) {
      const parsedData: CountdownItem[] = JSON.parse(localStorageData)
      const nonEmptyItems = parsedData.filter(item => item.link?.trim())
      if (nonEmptyItems.length > 0) {
        const removeDuplicates = Array.from(new Set(nonEmptyItems));
        const data = removeDuplicates
        setCountdowns(data)
      }
    }

  }, [])

  const modalHandler = (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    if (event.target === event.currentTarget) {
      setIsOpen(!isOpen)
      eventName.current!.value = ''
      date.current!.value = ''
      setHasURL(false)
      setDateHasError(false)
      seteventNameHasError(false)
    }
  }

  const removeItem = (link: string) => {
    const confirm = window.confirm("Are you sure?")
    if (!confirm) return
    const filtered = countdowns.filter((item) => {
      return item.link != link
    })
    setCountdowns(filtered)
  }

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setHasURL(false)
    setURL("")

    if (
      date.current != null &&
      eventName.current != null
    ) {
      if (eventName.current.value == "") {
        seteventNameHasError(true)
        setEventError("Blank or Invalid name not allowed")
        return
      }

      if (date.current.value == "") {
        setDateHasError(true)
        setDateError("Invalid Date")
        return
      }

      const originalDate = new Date(date.current?.value).getTime()
      if (originalDate < new Date().getTime()) {
        setDateHasError(true)
        setDateError("Date can not be in the past.  ")
        return
      }
      const originalEventName = encodeURI(eventName.current?.value)

      const newURL = `${process.env.NEXT_PUBLIC_SITE_URL}/${originalDate}/${originalEventName}`
      setURL(newURL)
      setHasURL(true)

      if (!countdowns.some(item => item.link === newURL)) {
        localStorage.setItem("countdowns", JSON.stringify([...countdowns, { name: eventName.current.value, link: newURL }]));
        setCountdowns([...countdowns, { name: eventName.current.value, link: newURL }]);
      }
    }
  }

  return (
    <>
      <Background>
        <Header addCountdown={modalHandler} isHome={true} />

        <div className='flex items-center flex-1 w-full h-full '>
          <div className='flex flex-col max-w-sm gap-12 p-4 mx-auto sm:hidden'>
            <Logo />
            <button
              className='flex justify-center px-3 py-2 text-white rounded-md sm:hidden bg-sky-900 hover:bg-sky-800 '
              onClick={modalHandler}>+countdown</button>
          </div>
        </div>

        {countdowns.length > 0 &&
          <div className='flex flex-col mb-6 full '>
            <h3 className='px-6 mb-2 text-white drop-shadow-[2px_2px_1px_rgba(0,0,0,0.5)]'>COUNTDOWNS</h3>
            <ul className='flex flex-wrap items-center justify-center gap-4 mx-6 overflow-y-auto max-h-[40vh] min-h-min pr-4'>
              {countdowns.map((countdown, index) => (


                <li className='flex items-center justify-between p-4 text-center bg-white rounded-md bg-opacity-80 indent-0 grow' key={index}>
                  {typeof (countdown.link) == 'string' ? <div className='flex items-center justify-between w-full gap-6'>
                    <Link className='flex flex-col w-full text-sm text-left break-all' href={countdown.link}>
                      <div className='flex justify-start text-lg font-bold uppercase text-sky-950'>{countdown.name}</div>
                      <div className='flex justify-start'>{countdown.link}</div>
                    </Link>
                    <button onClick={() => removeItem(countdown.link)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-sky-950 hover:fill-red-900'>
                        <path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z" /></svg>
                    </button>
                  </div> : null}
                </li>

              ))
              }
            </ul>
          </div>}


        <Dialog isOpen={isOpen} closeModal={modalHandler}>
          <header className='flex items-center justify-between mb-8'>
            <h2 className='text-xl font-bold text-sky-800'>Add countdown</h2>
          </header>
          <form onSubmit={submitHandler}>
            <ul className='mb-6'>
              <li className='flex flex-col h-32'>
                <label htmlFor="event"
                  className='mb-2 font-bold'
                >Event</label>
                <input
                  type='text' ref={eventName}
                  name='event'
                  id='event'
                  placeholder='Give a name to your countdown'
                  className='p-2 bg-white'
                  onChange={() => seteventNameHasError(false)}
                />
                {eventNameHasError && <p className='px-2 pt-2 text-sm text-red-900'>{eventError}</p>}
              </li>
              <li className='flex flex-col h-32'>
                <label htmlFor="date"
                  className='mb-2 font-bold'>Date</label>
                <input
                  type='datetime-local' ref={date}
                  id='date'
                  name='date'
                  onChange={() => setDateHasError(false)}
                  className='p-2' />
                {dateHasError && <p className='px-2 pt-2 text-sm text-red-900'>{dateError}</p>}
              </li>
              <li className='flex flex-row justify-between mb-8'>
                <button
                  className='px-4 py-2 border rounded-md border-slate-400'
                  onClick={modalHandler}>fechar</button>
                <button
                  type='submit'
                  className='flex justify-center px-4 py-2 text-white rounded-md bg-sky-900 hover:bg-sky-800 '
                >Add</button>
              </li>
            </ul>
          </form>
          {hasURL &&
            <>
              <hr className='border border-slate-400' />
              <div className='p-2 mt-8'>
                <p className='font-bold text-sky-900'>Countdown URL (share it!)</p>
                <div className='border border-teal-600 border-dashed '>
                  <Link
                    href={url}
                    target='_blank'
                    className='break-all'><span className='break-all'>{url}</span></Link>
                </div>
              </div>
            </>
          }
        </Dialog>
      </Background>
    </>
  )
}
