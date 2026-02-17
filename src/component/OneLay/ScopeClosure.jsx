import React, { useState } from 'react'
import { useActionData } from 'react-router-dom'

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

  const createCounter = () => {  // function : memmbuat counter dengan statet privat setiap fungsi dipanggil dia akan membuat privateCount baru 
    let privateCount = 0 

    // variable lokal private state dimulai dari 0

    return {
      increment: () => {
        privateCount++
        return privateCount // menambah nilai sebesar 1 dan mengembalikan nilai terbaru setelah ditambah 
      },
      decrement: () => {
        privateCount--
        return privateCount // mengurangi nilai dan mengembalikan nilai terbaru setelah dikurang 
      },

      getCount: () => privateCount  // mengambil nilai saat ini 
    }
  }

  const [counter] = useState(createCounter)

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

      <div className="demo-section">
        <h3>3. Private Counter (Closure)</h3>
        <div className="counter">
          <span>Count: {counter.getCount()}</span>
          <div className="button-group">
            <button
              onClick={() => {
                counter.increment()
                setCount(prev => prev + 1)

                // saat tombol diklik, memanggil counter.increment() lalu menambah state count sebesar 1 berdasarkan nilai seblumnya 
              }}>
              +
            </button>

            <button
              onClick={() => {
                counter.decrement()
                setCount(prev => prev - 1)

                // saat tombol diklik memanggil countet.decrement() lalu mengurang state count sebesar 1 berdasarkan nilai sebelumnya 
              }}>
              -
            </button>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>4. Scope dnegan useState</h3>
        <input
          type="text"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          placeholder='Test Scope Variavle'
        />
        <p>Value: {count}</p>
      </div>
    </div>
  )
}

export default ScopeClosure