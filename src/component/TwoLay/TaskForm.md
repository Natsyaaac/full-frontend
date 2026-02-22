# UML TaskFrom (Sebelum `return`)

Catatan: di kode, nama komponen tertulis `TaskFrom` (bukan `TaskForm`).

## 1. Activity Diagram (alur logika utama)

```mermaid
flowchart TD
    A[Komponen TaskFrom dipanggil] --> B[Inisialisasi state formData<br/>title:'', description:'', priority:'medium']
    B --> C[Inisialisasi state errors {}]
    C --> D[Definisi handleChange(e)]
    C --> E[Definisi validateForm()]
    C --> F[Definisi handleSubmit(e)]

    D --> D1[Ambil name dan value dari e.target]
    D1 --> D2[Update formData dengan setFormData]
    D2 --> D3{errors[name] ada?}
    D3 -->|Ya| D4[Reset error field terkait]
    D3 -->|Tidak| D5[Selesai]

    E --> E1[Buat newErrors {}]
    E1 --> E2{title kosong atau < 3 char?}
    E2 -->|Ya| E3[Set newErrors.title]
    E2 -->|Tidak| E4[Lanjut]
    E3 --> E4
    E4 --> E5{description kosong atau < 10 char?}
    E5 -->|Ya| E6[Set newErrors.description]
    E5 -->|Tidak| E7[Lanjut]
    E6 --> E7
    E7 --> E8{priority termasuk low/medium/high?}
    E8 -->|Tidak| E9[Set newErrors.priority]
    E8 -->|Ya| E10[Lanjut]
    E9 --> E10
    E10 --> E11[Return newErrors]

    F --> F1[e.preventDefault()]
    F1 --> F2[Panggil validateForm()]
    F2 --> F3{Ada isi di newErrors?}
    F3 -->|Ya| F4[setErrors(newErrors) + stop]
    F3 -->|Tidak| F5[await onSubmit(formData)]
    F5 --> F6{onSubmit gagal?}
    F6 -->|Ya| F7[setErrors submit error]
    F6 -->|Tidak| F8[Selesai]
```

## 2. Ringkasan Cara Kerja (sebelum `return`)

1. Komponen membuat 2 state:
   - `formData` untuk nilai input (`title`, `description`, `priority`).
   - `errors` untuk pesan validasi.
2. `handleChange`:
   - Ambil `name` dan `value` dari input.
   - Update field yang sesuai di `formData`.
   - Jika field itu sebelumnya error, error-nya langsung dibersihkan.
3. `validateForm`:
   - Cek `title` wajib isi dan minimal 3 karakter.
   - Cek `description` wajib isi dan minimal 10 karakter.
   - Cek `priority` hanya boleh `low | medium | high`.
   - Mengembalikan object `newErrors`.
4. `handleSubmit`:
   - Hentikan reload default form.
   - Jalankan validasi.
   - Jika ada error, simpan ke `errors` lalu berhenti.
   - Jika valid, kirim data ke `onSubmit(formData)`.
   - Jika submit gagal, simpan error submit ke `errors.submit`.

## 3. Struktur Data yang Dipakai

```js
formData = {
  title: string,
  description: string,
  priority: 'low' | 'medium' | 'high'
}

errors = {
  title?: string,
  description?: string,
  priority?: string,
  submit?: string
}
```
