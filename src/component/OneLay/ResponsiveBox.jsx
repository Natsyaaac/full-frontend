import { useState, useEffect } from 'react'
import './App.css'

function useMediaQuery(query) { // costume hook untuk mengecek apakah media query tertentu cocok dengan ukuran layar  
  const [matches, setMatches] = useState(false) // menyimpan hasil kecocokan media query (true/false)


  useEffect(() => {
    const media = window.matchMedia(query)  // membuat object mediaquerylist berdasarkan query

    if (media.matches !== matches) { // jika hasil media wuery berbeda dari state saat ini 
      setMatches(media.matches) // singkoron state dengan kondisi layar 
    }

    const listener = (e) => setMatches(e.matches)
    media.addEventListener('change', listener) // ketika ukuran layar berubah, update state sesuai kondisi baru 

    return () => media.removeEventListener('change', listener)  // menghapus event listeber saat component unmount atau dependency berubah 
  }, [matches, query])

  return matches
}

function ResponsiveBox() {
  const isMobile = useMediaQuery('(max-width: 600px)')
  const isTablet = useMediaQuery('(min-width: 601px) and (max-width: 1024px)')
  const isDesktop = useMediaQuery('(min-width: 1025px)')

  const [orientation, setOrientation] = useState('landscape')

  useEffect(() => { // menjalankan efek saat component pertama kali mount 
    const handleOrientation = () => { // mengecek orientasi layar saat ini 
      if (window.matchMedia('(orientation: portrait)').matches) { // jika layar portrait, set state ke 'portrait'
        setOrientation('portrait')
      } else { // jika tidak, berarti landscape
        setOrientation('landscape')
      }
    }


    handleOrientation() // menjalankan pengecekann pertama kali saat mount 

    window.addEventListener('resize', handleOrientation) // saat ukuran layar berubah, cek ulang orientasi 

    return () => window.removeEventListener('resize', handleOrientation) // menghapus listener saat component unmount menghindari mempry leak tiya
  }, [])

  return (
    <div className="resnposive-box">
      <h2>📱 Responsive Media Query Demo</h2>

      <div className="info-panel">
        <h3>Informasi Layar:</h3>
        <ul>
          <li className={isMobile ? 'active' : ''}>
            📱 Mobile: {isMobile ? 'Aktif' : 'Tidak'}
          </li>
          <li className={isTablet ? 'active' : ''}>
            📟 Tablet: {isTablet ? 'Aktif' : 'Tidak'}
          </li>
          <li className={isDesktop ? 'active' : ''}>
            💻 Desktop: {isDesktop ? 'Aktif' : 'Tidak'}
          </li>
          <li>
            🔄 Orientasi: {orientation === 'portrait' ? 'Potrait' : 'Landscape'}
          </li>
        </ul>
      </div>

      <div className={`demo-box ${orientation}`}>
        <p>Resize untuk melihat perubahan</p>
        <div className="size-indicator">
          {isMobile && '📱 Mode Mobile'}
          {isTablet && '📟 Mode Tablet'}
          {isDesktop && '💻 Mode Desktop'}
        </div>
      </div>

      <div className="media-query-demo">
        <h3>Media Query Examples:</h3>

        <div className="box box1">Background berubah di mobile</div>
        <div className="box box2">Text size berubah di tablet</div>
        <div className="box box3">Border berubah di desktop</div>

        <div className="flex-container">
          <div className="flex-item">Item 1</div>
          <div className="flex-item">Item 2</div>
          <div className="flex-item">Item 3</div>
        </div>
      </div>
    </div>
  )
}

export default ResponsiveBox