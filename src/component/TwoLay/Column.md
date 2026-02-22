# Control Flow Diagram - Column.jsx + TaskCard.jsx

```mermaid
flowchart TD
    A[Render Column] --> B[Init state: isDarggingOver = false]
    B --> C[Map tasks -> TaskCard]

    C --> D[User drag task]
    D --> E[TaskCard.handleDargStart]
    E --> F[setIsDargging(true)]
    E --> G[dataTransfer.setData taskId]
    E --> H[dataTransfer.setData sourceStatus]

    H --> I[Column.handleDragOver]
    I --> J[preventDefault + setIsDraggingOver(true)]

    J --> K[Drop di Column]
    K --> L[Column.handleDrop]
    L --> M[getData sourceStatus + taskId]
    M --> N{sourceStatus !== id?}
    N -->|Ya| O[onUpdateStatus(taskId, id)]
    N -->|Tidak| P[Tidak ada update]

    O --> Q[Render ulang TaskCard di kolom baru]
    P --> Q
    Q --> R[TaskCard.handleDragEnd -> setIsDargging(false)]
```

## 1) Cara kerja `Column.jsx` (sebelum `return`)
- Menyimpan state `isDarggingOver` untuk menandai apakah kolom sedang jadi target drag.
- `handleDragOver(e)`: `preventDefault()` agar event `drop` aktif, lalu set state jadi `true`.
- `handleDragLeave()`: set state jadi `false` saat kursor keluar dari area kolom.
- `handleDrop(e)`:
  - Ambil `sourceStatus` dan `taskId` dari `dataTransfer`.
  - Jika kolom asal berbeda dengan kolom tujuan, panggil `onUpdateStatus(taskId, id)` untuk memindahkan task.
  - Reset state drag-over ke `false`.
- `tasks.map(...)` membentuk daftar komponen `TaskCard` untuk ditampilkan di kolom.

## 2) Cara kerja `TaskCard.jsx` (sebelum `return`)
- Ambil data task dari props (`id`, `title`, `description`, `priority`, `createdAt`).
- Menyimpan state `isDragging` untuk style saat kartu sedang diseret.
- `formatDate(dateString)`:
  - Ubah string tanggal ke objek `Date`.
  - Hitung selisih hari terhadap waktu sekarang.
  - Format output: `1 hari lalu`, `x hari lalu`, atau tanggal lokal Indonesia.
- `handleDargStart(e)`:
  - Set `isDragging = true`.
  - Simpan `taskId` dan `sourceStatus` ke `dataTransfer` (bekal untuk komponen `Column` saat drop).
- `handleDragEnd()`:
  - Set `isDragging = false` untuk reset tampilan.
- `priorityConfig` + `priorityStyle`: menentukan label dan warna badge prioritas.

## 3) Kegunaan dan hubungan kedua file
- `TaskCard` bertugas sebagai **sumber drag data** (`taskId`, `sourceStatus`).
- `Column` bertugas sebagai **target drop + pengatur perpindahan status task**.
- Keduanya terhubung lewat `Drag and Drop API` (`dataTransfer`) dan callback `onUpdateStatus`.

Catatan penting:
- Di `Column.jsx`, prop yang dikirim ke `TaskCard` adalah `columId`, sedangkan di `TaskCard.jsx` yang dibaca `columnId`. Ini membuat `sourceStatus` berisiko `undefined` saat drag.
