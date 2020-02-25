import React from 'react'
import './App.css'
import Ad from './Ad/Ad'
import Sign from './Sign/Sign'
import ToggleBar from './ToggleBar/ToggleBar'
import About from './About/About'

function App() {
  return (
    <div className="App">
      <Ad />
      <Sign />
      <ToggleBar />
      <About />
    </div>
  )
}

export default App
