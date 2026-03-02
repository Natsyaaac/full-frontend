# JavaScript Dasar untuk Pemula

## 1) Scope & Closure

### Scope (jangkauan variabel)
Scope adalah area tempat variabel bisa diakses.

Jenis paling penting:
- Global scope: bisa diakses dari mana saja.
- Function scope: hanya bisa dipakai di dalam function.
- Block scope: hanya bisa dipakai di dalam blok `{}` (untuk `let` dan `const`).

Contoh:
```js
const globalVar = "Saya global";

function test() {
  const functionVar = "Saya di function";
  if (true) {
    const blockVar = "Saya di blok";
    console.log(globalVar);   // bisa
    console.log(functionVar); // bisa
    console.log(blockVar);    // bisa
  }
  // console.log(blockVar); // error, di luar block scope
}
```

### Closure
Closure adalah kondisi saat function "mengingat" variabel di scope luarnya, walau function luar sudah selesai jalan.

Contoh:
```js
function buatCounter() {
  let angka = 0;

  return function () {
    angka++;
    return angka;
  };
}

const counter = buatCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```
`angka` tetap tersimpan karena closure.

## 2) Promise
Promise adalah "janji" hasil proses async di masa depan.

Status Promise:
- `pending`: masih proses
- `fulfilled`: berhasil (`resolve`)
- `rejected`: gagal (`reject`)

Contoh:
```js
const janji = new Promise((resolve, reject) => {
  const sukses = true;

  if (sukses) resolve("Data berhasil diambil");
  else reject("Gagal ambil data");
});

janji
  .then((hasil) => console.log(hasil))
  .catch((err) => console.log(err));
```

## 3) Async / Await
`async/await` adalah cara menulis kode async agar terasa seperti kode biasa (lebih rapi dari `.then()` berantai).

Aturan inti:
- Function harus diberi `async`.
- `await` dipakai untuk "menunggu" Promise selesai.
- Biasanya dipasangkan dengan `try/catch`.

Contoh:
```js
async function ambilData() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log("Terjadi error:", error.message);
  }
}
```

## 4) Array Method (`map`, `filter`, `includes`, dll)

### `map()`
Mengubah setiap item, hasilnya array baru (panjang sama).

```js
const angka = [1, 2, 3];
const kaliDua = angka.map((n) => n * 2);
// [2, 4, 6]
```

### `filter()`
Menyaring item sesuai kondisi, hasilnya array baru.

```js
const angka = [1, 2, 3, 4];
const genap = angka.filter((n) => n % 2 === 0);
// [2, 4]
```

### `includes()`
Cek apakah nilai ada di array (hasil `true` / `false`).

```js
const buah = ["apel", "mangga", "jeruk"];
console.log(buah.includes("mangga")); // true
```

Method lain yang sering dipakai:
- `find()`: ambil item pertama yang cocok.
- `some()`: cek apakah minimal 1 item cocok.
- `every()`: cek apakah semua item cocok.
- `forEach()`: loop tiap item (tanpa return array baru).
- `reduce()`: gabungkan semua item jadi 1 nilai.

## 5) Error Handling (`try/catch`)
Dipakai untuk menangkap error agar aplikasi tidak langsung crash.

Struktur:
```js
try {
  // kode yang mungkin error
} catch (error) {
  // jalan kalau ada error
} finally {
  // opsional, selalu jalan
}
```

Contoh:
```js
try {
  const data = JSON.parse("teks-bukan-json");
  console.log(data);
} catch (error) {
  console.log("Format JSON salah:", error.message);
} finally {
  console.log("Selesai diproses");
}
```

## 6) Destructuring
Destructuring adalah cara cepat "membongkar" nilai dari array/object ke variabel.

### Array destructuring
```js
const warna = ["merah", "hijau", "biru"];
const [pertama, kedua] = warna;
console.log(pertama); // merah
```

### Object destructuring
```js
const user = { nama: "Budi", umur: 25 };
const { nama, umur } = user;
console.log(nama); // Budi
```

Bisa rename:
```js
const { nama: namaUser } = user;
```

## 7) Spread Operator (`...`)
Spread operator dipakai untuk "membuka" isi array/object.

### Gabung array
```js
const a = [1, 2];
const b = [3, 4];
const gabung = [...a, ...b];
// [1, 2, 3, 4]
```

### Copy array/object (shallow copy)
```js
const asli = [1, 2, 3];
const copy = [...asli];

const user = { nama: "Budi", umur: 25 };
const userBaru = { ...user, umur: 26 };
```

### Bedanya dengan Destructuring
- Destructuring: mengambil nilai dari array/object.
- Spread: menyebarkan isi array/object ke tempat baru.

## Ringkasan Super Singkat
- Scope: tempat variabel hidup.
- Closure: function mengingat scope luar.
- Promise: hasil async (pending/fulfilled/rejected).
- Async/await: cara rapi pakai Promise.
- Array methods: olah data tanpa loop manual panjang.
- try/catch: tangkap error dengan aman.
- Destructuring: ambil nilai lebih cepat.
- Spread: copy/gabung/update data dengan ringkas.
