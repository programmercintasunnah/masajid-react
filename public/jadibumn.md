# Referensi Perubahan Layout Menu — Mengikuti app.jadibumn.id

Dokumen ini menjelaskan perubahan posisi menu dari tampilan app kamu saat ini agar mengikuti layout **app.jadibumn.id**, dengan **pengecualian pada bagian header**.

---

## Ringkasan Perbedaan Layout

| Area | App Kamu (Sekarang) | Target (jadibumn.id) |
|---|---|---|
| **Header** | Tanggal + waktu sholat (tengah/kiri) | ~~Info akun Gmail~~ → **Tetap header kamu, pindah ke kanan** |
| **Navigasi Utama** | Bottom tab bar | **Top nav bar (atas)** |
| **Sidebar** | Tidak ada | **Sidebar kiri** (menu-menu tambahan) |
| **Konten Utama** | Full width | **Tengah** (diapit sidebar kiri & panel kanan) |
| **Panel Kanan** | Tidak ada | **Panel kanan** (info profil / promo) |

---

## Detail Perubahan Per Area

### 1. Header (Pengecualian — Tidak Mengikuti jadibumn.id)

**Kondisi sekarang:** Header berisi tanggal dan waktu sholat di posisi tengah/atas.

**Yang dilakukan:**
- **Pertahankan** konten header (tanggal + waktu sholat).
- **Pindahkan** header ke **pojok kanan atas** (bukan kiri atau tengah).
- Header jadibumn.id menggunakan info akun Gmail — ini **tidak ditiru**.

```
[ Logo / Nama App ]    [ Beranda | Aktivitas | Pembelian | Akun ]    [ Tanggal + Waktu Sholat ]
                                                                       ← pindah ke sini (kanan)
```

---

### 2. Navigasi Utama → Pindah ke Top Nav Bar

**Kondisi sekarang:** Tab navigasi ada di **bawah layar** (bottom tab bar):
`Beranda | Aktivitas | Pembelian | Akun`

**Target:** Pindahkan tab navigasi ke **atas layar** sebagai top navigation bar, persis seperti jadibumn.id:

```
[ LOGO ]  [ Beranda ]  [ Aktivitas 🔴 ]  [ Pembelian ]  [ Akun ]
```

- Letakkan di bawah header.
- Tab aktif menggunakan style pill/rounded (background biru tua seperti di jadibumn.id).
- Notifikasi ditampilkan sebagai badge merah kecil di tab "Aktivitas".

---

### 3. Sidebar Kiri — Menu Tambahan

**Kondisi sekarang:** Tidak ada sidebar. Menu tambahan (Journey of BUMN, Tryout, Latsol, Materi) ditampilkan sebagai ikon grid di tengah halaman beranda.

**Target:** Tambahkan **sidebar kiri** yang berisi menu-menu navigasi tambahan secara vertikal.

Isi sidebar kiri (urutan dari atas ke bawah, mengikuti jadibumn.id):

```
[ Ikon ] Materi
[ Ikon ] Live Class
[ Ikon ] Grup & PDF Gratis
[ Ikon ] Kalender
[ Ikon ] Konsultan Promo
[ Ikon ] Laporkan Masalah
[ Ikon ] Lowongan Kerja BUMN
───────────────────────────
[ Ikon ] Keluar
```

- Sidebar bersifat **fixed** di sisi kiri.
- Lebar sekitar **200–220px**.
- Setiap item berisi ikon di kiri + label teks di kanan.
- Tombol "Keluar" diletakkan paling bawah, diberi separator.

---

### 4. Area Konten Utama — Tetap di Tengah

**Kondisi sekarang:** Konten (banner, daftar tryout, dll.) mengisi **full width** layar.

**Target:** Konten utama berada di **kolom tengah**, diapit oleh sidebar kiri dan panel kanan.

- Banner/carousel tetap tampil di atas area konten.
- Konten utama (Simulasi, daftar tryout, dll.) di bawah banner.

```
| Sidebar Kiri | Konten Utama (Banner + List) | Panel Kanan |
```

---

### 5. Panel Kanan — Info Profil & Promo

**Kondisi sekarang:** Tidak ada panel kanan.

**Target:** Tambahkan **panel kanan** yang berisi:

```
┌──────────────────────────┐
│  [ Foto ]  Muhammad Zakie│
│  📧 email@gmail.com      │
│  📱 +62822...            │
└──────────────────────────┘

┌──────────────────────────┐
│ 🔔 Jangan Lewatkan! [Promo]│
│ Ada promo & penawaran... │
│             [Beli Sekarang]│
└──────────────────────────┘
```

- Lebar panel kanan sekitar **280–300px**.
- Di versi **mobile**, panel kanan ini **disembunyikan** (collapsed).

---

## Layout Keseluruhan (Desktop)

```
┌─────────────────────────────────────────────────────────────────┐
│ [LOGO]   [Beranda] [Aktivitas🔴] [Pembelian] [Akun]  [Header→] │  ← Top Nav + Header kanan
├──────────┬──────────────────────────────────┬───────────────────┤
│          │  [Banner/Carousel]               │  Profil User      │
│ Materi   │  ──────────────────────────────  │  ───────────────  │
│ Live Class│  Simulasi          Lihat Semua  │  Promo Banner     │
│ Grup PDF │    ┌──────────────────────────┐  │                   │
│ Kalender │    │ Tryout Item 1       Free │  │                   │
│ Konsultan│    │ Tryout Item 2       Free │  │                   │
│ Laporkan │    └──────────────────────────┘  │                   │
│ Lowongan │                                  │                   │
│ ──────── │                                  │                   │
│ Keluar   │                                  │                   │
└──────────┴──────────────────────────────────┴───────────────────┘
  Sidebar      Konten Utama                     Panel Kanan
  (~220px)     (flex-grow)                      (~300px)
```

---

## Layout Mobile

Pada mobile, layout menyesuaikan:

- **Header** tetap di kanan atas (lebih kompak).
- **Top nav bar** tetap di atas (bisa scroll horizontal jika sempit).
- **Sidebar kiri** berubah menjadi **drawer** (tersembunyi, muncul saat tombol hamburger diklik).
- **Panel kanan** disembunyikan.
- **Konten utama** mengisi full width.

---

## Catatan Tambahan

- Konten header (tanggal + waktu sholat) tetap dipertahankan dan cukup digeser ke **pojok kanan**.
- Semua perubahan lainnya (top nav, sidebar kiri, panel kanan) mengikuti struktur jadibumn.id.
- Prioritaskan perubahan secara bertahap: **Top Nav → Sidebar Kiri → Panel Kanan**.