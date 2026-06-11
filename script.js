let harga = 0;

// ── Proses ketika tombol Pilih Jadwal di klik (Halaman jadwal.html) ──
document.addEventListener('click', function (e) {
    const btn = e.target.closest('.pilih');
    if (!btn) return;

    // Simpan data pilihan ke localStorage sementara
    localStorage.setItem('temp_rute', btn.dataset.rute);
    localStorage.setItem('temp_jam', btn.dataset.jam);
    localStorage.setItem('temp_harga', btn.dataset.harga);

    // Redirect otomatis langsung ke halaman pemesanan
    window.location.href = 'pesan.html';
});

// ── Mengisi Form otomatis saat halaman pesan.html terbuka ──
if (window.location.pathname.includes('pesan.html')) {
    const ruteInput = document.getElementById('rute');
    if (ruteInput) {
        ruteInput.value = localStorage.getItem('temp_rute') || '';
        document.getElementById('jam').value = localStorage.getItem('temp_jam') || '';
        harga = Number(localStorage.getItem('temp_harga')) || 0;
        hitungTotal();
    }
}

// Update total saat jumlah tiket berubah
document.addEventListener('input', function (e) {
    if (e.target.id === 'jumlah') hitungTotal();
});

function hitungTotal() {
    const jmlField = document.getElementById('jumlah');
    if (!jmlField) return;
    const jumlah = Number(jmlField.value) || 1;
    const total  = harga * jumlah;
    document.getElementById('total').value = total > 0 ? 'Rp ' + total.toLocaleString('id-ID') : '';
}

// ── Isi data Modal sebelum ditampilkan ────────────────────────────────────────
document.addEventListener('show.bs.modal', function (e) {
    if (e.target.id !== 'modalBayar') return;

    document.getElementById('mRute').innerText   = document.getElementById('rute').value;
    document.getElementById('mJam').innerText    = document.getElementById('jam').value;
    document.getElementById('mJumlah').innerText = document.getElementById('jumlah').value + ' tiket';
    document.getElementById('mTotal').innerText  = document.getElementById('total').value;
});

// ── Tombol Bayar Sekarang ─────────────────────────────────────────────────────
document.addEventListener('click', function (e) {
    if (e.target.id !== 'bayar') return;

    const nama = document.getElementById('nama').value.trim();
    if (!nama) { alert('Nama penumpang belum diisi!'); return; }

    const rute   = document.getElementById('rute').value;
    const jam    = document.getElementById('jam').value;
    const tanggal = document.getElementById('tanggal').value;

    if (!rute) { alert('Silakan pilih jadwal terlebih dahulu!'); return; }
    if (!tanggal) { alert('Tanggal berangkat belum diisi!'); return; }

    const jumlah = Number(document.getElementById('jumlah').value) || 1;
    const total  = harga * jumlah;
    const kode   = 'BSG' + Math.floor(Math.random() * 100000);

    localStorage.setItem('kode',    kode);
    localStorage.setItem('nama',    nama);
    localStorage.setItem('rute',    rute);
    localStorage.setItem('jam',     jam);
    localStorage.setItem('tanggal', tanggal);
    localStorage.setItem('jumlah',  jumlah);
    localStorage.setItem('total',   total);

    // Hapus penyimpanan temporary jadwal
    localStorage.removeItem('temp_rute');
    localStorage.removeItem('temp_jam');
    localStorage.removeItem('temp_harga');

    window.location.href = 'sukses.html';
});