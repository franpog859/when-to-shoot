import React, {useState, useEffect} from 'react'
import './Sign.css'
import { GetSignContent } from './SignContent'
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';

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

  const noGoldenHourProgressBarStyles = buildStyles({
    pathColor: '#ffc93c',
    trailColor: '#253b4a',
    backgroundColor: "#253b4a",
  })

  const yesGoldenHourProgressBarStyles = buildStyles({
    pathColor: '#253b4a',
    trailColor: '#ffc93c',
    backgroundColor: "#ffc93c",
  })

  return (
    <div className="Sign">
      <header className="Sign-header">
        <CircularProgressbarWithChildren 
          value={content.goldenHourPercent || 0}
          background 
          backgroundPadding={2} 
          strokeWidth={1} 
          styles={content.isGoldenHour ? yesGoldenHourProgressBarStyles : noGoldenHourProgressBarStyles}>
          <div className={content.isGoldenHour ? "Sign-text-yes-golden-hour" : "Sign-text-no-golden-hour"}>
            <p>{content.suggestion}</p>
            <p>{content.information}</p>
            <p>{content.timer}</p>
          </div>
        </CircularProgressbarWithChildren>
      </header>
    </div>
  )
}

export default Sign