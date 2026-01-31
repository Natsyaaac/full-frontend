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