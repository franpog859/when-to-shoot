import React, {useState, useEffect} from 'react'
import './Sign.css'
import SunCalc from 'suncalc'
import { GetSignTexts } from './GoldenHour'

function Sign() {
  const [date, setDate] = useState(new Date())
  const [position, setPosition] = useState()

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date())
      setAsyncPosition()
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const setAsyncPosition = (() => { navigator.geolocation.getCurrentPosition(
    position => setPosition(position),
    err => console.log("Failed to get current position", err)
  )})

  return (
    <div className="Sign">
      <header className="Sign-header">
        <p>suggestion: {GetSignTexts(date, position).suggestion}</p>
        <p>information: {GetSignTexts(date, position).information}</p>
        <p>time: {GetSignTexts(date, position).time}</p>
      </header>
    </div>
  )
}

export default Sign
