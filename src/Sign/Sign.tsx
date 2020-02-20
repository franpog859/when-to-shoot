import React, {useState, useEffect} from 'react'
import './Sign.css'
import { GetSignContent } from './SignContent'

function Sign() {
  const [date, setDate] = useState(new Date())
  const [position, setPosition] = useState()
  const [content, setContent] = useState(GetSignContent(date, position))

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date())
      setAsyncPosition()
      setContent(GetSignContent(date, position))
    }, 1000)
    return () => clearInterval(interval)
  })

  const setAsyncPosition = (() => { navigator.geolocation.getCurrentPosition(
    position => setPosition(position),
    err => console.log("Failed to get current position", err)
  )})

  return (
    <div className="Sign">
      <header className="Sign-header">
        <p>suggestion: {content.suggestion}</p>
        <p>information: {content.information}</p>
        <p>timer: {content.timer}</p>
        <p>isGoldenHour: {content.isGoldenHour}</p>
        <p>goldenHourPercent: {content.goldenHourPercent}</p>
      </header>
    </div>
  )
}

export default Sign
