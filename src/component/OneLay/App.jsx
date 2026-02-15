import React, { useState } from 'react'
import ScopeClosure from './ScopeClosure'
import ResponsiveBox from './ResponsiveBox'


import './App.css'

function App() {
  const [showScope, setShowScope] = useState(true)

  return (
    <div className="app">
      <h1>Demo: Scope & Closure + Responsive</h1>

      <button onClick={() => setShowScope(!showScope)}>
        Toggle Demo 
      </button>

      {showScope ? <ScopeClosure /> : <ResponsiveBox />}
    </div>
  )
}

export default App 