import React, {useState, useEffect} from 'react'
import './App.css'
import SunCalc from 'suncalc'

function App() {
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
    <div className="App">
      <header className="App-header">
        <p>{SunCalc.getTimes(date, position?.coords.latitude, position?.coords.longitude).goldenHour.toString()}</p>
        <p>{date?.toString()}</p>
        <p>{position?.toString()}</p>
      </header>
    </div>
  )
}

export default App
