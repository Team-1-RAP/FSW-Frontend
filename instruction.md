### Instruksi untuk Developer

#### 1. Memulai Pengembangan Fitur Baru

1. **Buat Branch Fitur Baru:**
   - Pastikan Anda berada di dalam branch `development`.

   ```bash
   git checkout development
   git pull origin development
   ```

2. **Buat Branch Fitur:**
   - Buat branch baru untuk fitur yang akan Anda kembangkan, dengan format `feat/nama-fitur`.

   ```bash
   git checkout -b feat/nama-fitur
   ```

3. **Kembangkan Fitur Baru:**
   - Implementasikan perubahan yang diperlukan di dalam branch fitur yang baru dibuat.

   ```bash
   # Lakukan perubahan
   git add .

   # Uji kode dengan linting sebelum commit
   npm run lint
   ```

   - Pastikan tidak ada error atau warning dari linting sebelum melanjutkan ke langkah berikutnya.

4. **Commit Perubahan:**
   - Setelah yakin kode telah lulus linting, lakukan commit dengan pesan yang deskriptif.

   ```bash
   git commit -m "feat: tambahkan fitur baru"
   ```

#### 2. Review dan Merge

1. **Buat Pull Request (PR):**
   - Setelah selesai mengembangkan fitur, buat Pull Request (PR) dari branch fitur ke branch `development`.
   - Berikan deskripsi yang jelas dan rinci tentang perubahan yang dilakukan.

2. **Code Review:**
   - Tim melakukan code review terhadap PR.
   - Diskusikan dan selesaikan perubahan yang diperlukan.

3. **Merge ke Development:**
   - Setelah PR disetujui dan konflik (jika ada) diselesaikan, merge PR ke branch `development`.

   ```bash
   git checkout development
   git pull origin development
   git merge --no-ff feat/nama-fitur
   git push origin development
   ```

#### 3. Deployment ke Main (Produksi)

1. **Stabilisasi di Development:**
   - Pastikan branch `development` stabil dan sudah melalui pengujian sebelum dipromosikan ke `main`.

2. **Merge ke Main:**
   - Lakukan merge dari branch `development` ke `main` hanya untuk versi yang siap untuk rilis.

   ```bash
   git checkout main
   git pull origin main
   git merge --no-ff development
   git push origin main
   ```

3. **Deployment:**
   - Setelah merge ke `main`, siapkan build dan deploy ke lingkungan produksi.

### Catatan Tambahan

- Pastikan untuk selalu melakukan pull terbaru dari branch sebelum mulai bekerja dan sebelum melakukan push.
- Sebelum melakukan commit, pastikan kode telah diuji dengan linting menggunakan `npm run lint` untuk memastikan memenuhi standar kode yang ditetapkan.
- Gunakan alat manajemen proyek dan sistem issue tracking untuk mengelola tugas dan diskusi tim (Trello).
- Perbarui dokumentasi setiap fitur dan perubahan yang signifikan di `README.md` atau dokumentasi lainnya.