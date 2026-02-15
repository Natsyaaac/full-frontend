import React, { useState } from 'react'

function createMultiplier(factor) {  // ini adalah function yang mengembalikan function lain  parameter (number) masih bisa mengakses didalam , berguna untuk perkalian didalam berdasarkan parameter awal 
  return function (number) {
    return number * factor
  }
}

const kaliDua = createMultiplier(2)
const kaliTiga = createMultiplier(3)


function ScopeClosure() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState('')

  const createLogger = (prefix) => {  // function : membuat dan mengembalikan funsi baru
    // prefix disimpan dalam closure 
    return () => { 

      // function ini maasih bisa mengakses prefix karena closure 
      // new Date dibuat saat fungsi ini dipanggil 

      console.log(`${prefix}: ${new Date().toLocaleTimeString()}`)


      // setMessage mengubah state React dan memicu re-render UI
      setMessage(`Logger ${prefix} dipanggil`)
    }
  }

  const logInfo = createLogger('INFO')
  const logError = createLogger('ERROR')


  return (
    <div className="scope-closure">
      <h2>🔍 Scope & Closure Demo</h2>

      <div className="demo-section">
        <h3>1. Function Factory (Closure)</h3>
        <div className="button-group">
          <button onClick={() => alert(`5 x 2 = ${kaliDua(5)}`)}>
            Kali dua (5)
          </button>
          <button onClick={() => alert(`5 x 3 = ${kaliTiga(5)}`)}>
            Kali Tiga (5)
          </button>
        </div>
      </div>


      <div className="demo-section">
        <h3>2. Logger dengan Closure</h3>
        <div className="button-group">
          <button onClick={logInfo}>Log INFO</button>
          <button onClick={logError}>Log Error</button>
        </div>

        {message && <p className='message'>{message}</p>}
      </div>
    </div>
  )
}

export default ScopeClosure