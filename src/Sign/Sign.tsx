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

  return (
    <div className="Sign">
      <header className="Sign-header">
        <CircularProgressbarWithChildren 
          value={66} 
          background 
          backgroundPadding={2} 
          strokeWidth={1} 
          styles={buildStyles({
            pathColor: '#ffc93c',
            trailColor: '#ff6f3c',
            backgroundColor: "#ff9a3c",
            textColor: '#155263',
        })}>
          <div className="Sign-text">
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
