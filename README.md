# Full Frontend

Project ini adalah kumpulan latihan frontend berbasis `React + Vite` dengan fokus ke fundamental JavaScript/React dan integrasi API sederhana.

## Tech Stack

- `React`
- `Vite`
- `CSS` per modul
- `react-router-dom` (dependency sudah terpasang)
- `react-icons` (dependency sudah terpasang)

## Struktur Utama

```text
full-frontend/
  src/
    component/
      OneLay/
      TwoLay/
      ThreeLay/
```

## Ringkasan Modul di Folder `src/component`

### 1) `OneLay` - Scope, Closure, dan Responsive UI

File utama:
- `src/component/OneLay/App.jsx`
- `src/component/OneLay/ScopeClosure.jsx`
- `src/component/OneLay/ResponsiveBox.jsx`
- `src/component/OneLay/App.css`

Yang sudah dibuat:
- Toggle tampilan demo (`ScopeClosure` vs `ResponsiveBox`).
- Demo closure dengan function factory (`createMultiplier`).
- Demo closure dengan logger (`createLogger`).
- Demo private counter berbasis closure (`createCounter`).
- Demo responsive dengan custom hook `useMediaQuery`.
- Deteksi orientasi layar (`portrait` / `landscape`).
- Implementasi media query + flexbox di CSS.

Konsep yang dipakai:
- `useState`, `useEffect`
- Scope & Closure
- Event handling
- Conditional rendering

### 2) `TwoLay` - Task Management / Kanban (On Progress)

File utama:
- `src/component/TwoLay/App.jsx`
- `src/component/TwoLay/Readme.md`

Komponen pendukung (masih kosong):
- `src/component/TwoLay/components/Header.jsx`
- `src/component/TwoLay/components/KanbanBoard.jsx`
- `src/component/TwoLay/components/Column.jsx`
- `src/component/TwoLay/components/TaskCard.jsx`
- `src/component/TwoLay/components/TaskForm.jsx`
- `src/component/TwoLay/components/LoadingSpinner.jsx`

Yang sudah dibuat di logic `App.jsx`:
- Fetch data task dari API.
- Create task (`POST`).
- Update status task (`PUT`).
- Delete task (`DELETE` + konfirmasi user).
- Grouping task per status (`todo`, `doing`, `done`) dengan `reduce`.
- Loading state, error handling (`try/catch/finally`), dan state management.

Endpoint yang dipakai:
- `GET http://localhost:5000/api/tasks`
- `POST http://localhost:5000/api/tasks`
- `PUT http://localhost:5000/api/tasks/:id`
- `DELETE http://localhost:5000/api/tasks/:id`

Catatan:
- `src/component/TwoLay/Readme.md` sudah berisi penjelasan skematik alur kode sebelum `return`.

### 3) `ThreeLay` - Daily Movie Explorer

File utama:
- `src/component/ThreeLay/App.jsx`
- `src/component/ThreeLay/components/SearchBar.jsx`
- `src/component/ThreeLay/components/MovieList.jsx`
- `src/component/ThreeLay/components/MovieDetail.jsx`
- `src/component/ThreeLay/App.css`

Yang sudah dibuat:
- Ambil data film + statistik secara paralel (`Promise.all`).
- Search film berdasarkan judul (`includes` + `toLowerCase`).
- Filter berdasarkan genre.
- Detail film terpilih di panel samping.
- Toggle status watched via API dan sinkronisasi statistik.
- Layout responsive memakai kombinasi `grid` + `flex`.

Endpoint yang dipakai:
- `GET /api/movies`
- `GET /api/stats`
- `POST /api/movies/toggle/:movieId`

Konsep yang dipakai:
- `async/await`, `Promise.all`
- Array methods: `map`, `filter`, `includes`
- Immutability state update
- Conditional rendering
- Error handling (`try/catch`)

## Menjalankan Project

1. Install dependency:

```bash
npm install
```

2. Jalankan frontend:

```bash
npm run dev
```

3. Pastikan backend API aktif untuk modul yang butuh data (`TwoLay` dan `ThreeLay`).

## Status Integrasi Saat Ini

- Entrypoint React ada di `src/main.jsx`.
- Komponen root ada di `src/App.jsx` dan saat ini merender `./tes/App` (`<SSHH />`).
- Folder `src/component` berisi modul latihan utama yang sudah kamu bangun.

## Prompt Learn Coding

Sekarang kamu mentor ku, aku adalah pemula untuk menjadi fullstack developer. Tugas kamu sebagai mentor cukup (menilai pemahamanku dari komentar ku, menjelaskan kode itu kegunaanya, cara kerjanya, dan kapan boleh digunakan atau tidak boleh digunakan, tidak lebih dan tidak diluar konteks, dan memperbaiki hasil komentar ku dengan komentar baru dengan singkat, padat tapi jelas, dijelaskan setiap blok baris, bahasa teknis tapi full indonesia) dan disini bersifat netral tidak menjatuhkan tapi tidak memaniskan (biasa tapi netral), dan tidak menilai, memperbaiki, atau memberikan saran kode karna itu juga hasil AI (karna disini aku ingin belajar agar paham fundamental nya), dan buat catatan + kode yang berkaitan dengan ini (Scope & closure, Async / await, Promise, Array method (map, filter, includes, dll), Error handling (try/catch), Destructuring, Spread operator) jangan diluar konteks dari itu semua.

## Pertanyaan Penting Untuk Menambah Pengetahuan Stack Fundamental Coding

1. Apa ini?
2. Kenapa ini ada?
3. Bagaimana cara kerjanya dibalik layar?
4. Kapan sebaiknya digunakan dan tidak digunakan?
5. Apa dampaknya jika salah pakai?
6. Kapan digunakan?
7. Kenapa error ini bisa muncul?
8. Bagian mana yang perlu saya monitor?

## Prompt Membuat Website

Buatkan aku sebuah website modern sederhana (`React + vite + express + css`) dengan implementasi code () dan css terpisah untuk setiap file jsx, `Flex-box` & `grid`, didalam website itu sudah mengandung implementasi code itu jangan diluar konteks dari ini, bedakan dengan website-website yang sebelumnya pernah dibuat, dan responsive disegala ukuran device. langsung file component yang membentuknya jangan root ditambahkan 
