let harga = 0;

// ── Pilih Jadwal ─────────────────────────────────────────────────────────────
// Pakai event delegation (document) agar tombol .pilih yang dimuat
// secara async tetap terdeteksi.
document.addEventListener('click', function (e) {
    const btn = e.target.closest('.pilih');
    if (!btn) return;

    document.getElementById('rute').value = btn.dataset.rute;
    document.getElementById('jam').value  = btn.dataset.jam;
    harga = Number(btn.dataset.harga);

    hitungTotal();

    // Scroll halus ke form pemesanan
    document.getElementById('pesan')?.scrollIntoView({ behavior: 'smooth' });
});

// ── Update total saat jumlah tiket berubah ────────────────────────────────────
document.addEventListener('input', function (e) {
    if (e.target.id === 'jumlah') hitungTotal();
});

function hitungTotal() {
    const jumlah = Number(document.getElementById('jumlah').value) || 1;
    const total  = harga * jumlah;
    document.getElementById('total').value =
        total > 0 ? 'Rp ' + total.toLocaleString('id-ID') : '';
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
    if (!nama) {
        alert('Nama penumpang belum diisi!');
        return;
    }

    const rute   = document.getElementById('rute').value;
    const jam    = document.getElementById('jam').value;
    const tanggal = document.getElementById('tanggal').value;

    if (!rute) {
        alert('Silakan pilih jadwal terlebih dahulu!');
        return;
    }

    if (!tanggal) {
        alert('Tanggal berangkat belum diisi!');
        return;
    }

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

    window.location.href = 'sukses.html';
});