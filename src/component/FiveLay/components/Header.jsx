import React from 'react';
import '../App.css'

const Header = ({ stats, setActiveFilter, activeFilter }) => {

  const statsList = Object.entries(stats).map(([key, value]) => ({
    // Object.entries mengubah object stats menjadi array pasangan 
    // map melakukan iterasi dan menghasilkan array baru

    label: key.replace(/([A-Z])/g, ' $1').toUpperCase(),
    value: value,
    key: key

    // destructing array ([key, value]) mengambil key dan value dari tiap pasangan 
    // setiap iterasi mengembalikan object baru 
  }));

  return (
    <div className="">p</div>
  );
}

export default Header