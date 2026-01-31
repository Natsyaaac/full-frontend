usestae adalah React hook untuk manajemen state

const [theme, setTheme] = useState('light');
const [selectedCard, setSelectedCard] = useState(null);
const [gridColumns, setGridColumns] = useState(3);

- Yang pertama state untuk tema dalam website
- Yang kedua state untuk kartu yang dipilih karna dia menggunakan null dalam pemakaian nya null atau tidak terdefinisi 
- Yang ketiga state untuk kolom grid, disini menggunakan 3 grid 


const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
- Disini setTheme digunakan untuk mendefinisikan class light dan dark

- prevTheme digunakan untuk dalam bentuk functional update untuk memastikan bahwa tema akan diperbaharui pada nilai terbaru ini berguna pada  perubahan state yang berturut turut 

- Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme ini kegunaan state pertama cons [theme, setTheme] ketika ada interaksi pada user di onClick={toggleTheme} nanti berubah teks dia dari Dark Dan selanjutnya Light



/* Contoh penggunaan Grid */
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 kolom sama lebar */
  grid-template-rows: auto 1fr auto; /* Baris otomatis, fleksibel, otomatis */
  gap: 20px; /* Jarak antar item */
  grid-template-areas: 
    "header header header"
    "main main sidebar"
    "footer footer footer";
}

/* KODE ANDA - Sudah Benar ✅ */
.product-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
/* auto-fit: otomatis sesuaikan kolom */
/* minmax(250px, 1fr): minimal 250px, maksimal 1 fraction */

Konsep Penting Grid: 
-grid-template-colums : mengatur kolom
-grid-template-rows : mengatur Baris
-gap : jarak antar grid item
-fr unit : Fraction unit, bagian dari ruang tersedia
auto-fit/auto-fill : Responsive otomatis



/* Contoh penggunaan Flexbox */
.flex-container {
  display: flex; /* Atau inline-flex */
  flex-direction: row; /* row, row-reverse, column, column-reverse */
  justify-content: center; /* Pengaturan horizontal */
  align-items: center; /* Pengaturan vertikal */
  flex-wrap: wrap; /* wrap, nowrap, wrap-reverse */
  gap: 10px; /* Jarak antar item */
}

/* KODE ANDA - Sudah Benar ✅ */
.produk-desc {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

-Main Axis : arah utama(tergantung flex-direction)
-Cross Axis : Arah tegak lurus main Axis
-justify-content : Mengatur item spanjang Axis
-align-items : Mengatur item sepanjang cross  Axis
-flex-wrap : apakah item boleh pindah baris 


// Contoh penggunaan useState
import React, { useState } from 'react';

function Component() {
  // Deklarasi state
  const [state, setState] = useState(initialValue);
  // state: nilai saat ini
  // setState: fungsi untuk update state
  // initialValue: nilai awal
  
  // KODE ANDA - Sudah Benar ✅
  const [theme, setTheme] = useState('light');
  
  // Update state
  const toggleTheme = () => {
    // Cara 1: Nilai langsung
    setTheme('dark');
    
    // Cara 2: Berdasarkan state sebelumnya
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  // Multiple states
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);
  const [user, setUser] = useState({ name: '', email: '' });
}


Konsep penting useState: 

-Asynchronous : State update tidak langsung
-immutable : jangan modifikasi state langsung
-Functional Update : gunakan fungsi butuh nilai sebelumnya
-Multiple States : Bisa punya banyak state berbeda