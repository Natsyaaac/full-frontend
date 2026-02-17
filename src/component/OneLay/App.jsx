import React, { useState } from 'react'
import ScopeClosure from './ScopeClosure'
import ResponsiveBox from './ResponsiveBox'


import './App.css'

function App() {
  const [showScope, setShowScope] = useState(true)

  return (
    <div className="app">
      <h1>Demo: Scope & Closure + Responsive</h1>

      <button onClick={() => setShowScope(!showScope)}>  {/*jika di klik dia akan membalik nilai boolean true menjadi false dan sebaliknya*/}
        Toggle Demo 
      </button>

      {showScope ? <ScopeClosure /> : <ResponsiveBox />} {/*jika true keluar ScopeClosure dan jika False ResponsiveBox*/}
    </div>
  )
}

export default App 