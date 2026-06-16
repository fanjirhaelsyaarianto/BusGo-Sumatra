let harga = 0;

// Daftar harga rute
const hargaRute = {
    "Jambi - Palembang": 180000,
    "Jambi - Pekanbaru": 150000,
    "Jambi - Padang": 250000,
    "Jambi - Bengkulu": 280000,
    "Jambi - Lampung": 350000,
    "Jambi - Medan": 550000,
    "Jambi - Banda Aceh": 850000
};

// ─────────────────────────────────────────
// Tombol Pilih Jadwal (jadwal.html)
// ─────────────────────────────────────────
document.addEventListener('click', function (e) {

    const btn = e.target.closest('.pilih');

    if (!btn) return;

    localStorage.setItem('temp_rute', btn.dataset.rute);
    localStorage.setItem('temp_jam', btn.dataset.jam);
    localStorage.setItem('temp_harga', btn.dataset.harga);

    window.location.href = 'pesan.html';
});

// ─────────────────────────────────────────
// Saat halaman pesan.html dibuka
// ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {

    if (!window.location.pathname.includes('pesan.html')) return;

    const rute = document.getElementById('rute');
    const jam = document.getElementById('jam');

    if (!rute || !jam) return;

    // Jika berasal dari halaman jadwal
    const tempRute = localStorage.getItem('temp_rute');
    const tempJam = localStorage.getItem('temp_jam');
    const tempHarga = localStorage.getItem('temp_harga');

    if (tempRute) {
        rute.value = tempRute;
    }

    if (tempJam) {
        jam.value = tempJam;
    }

    if (tempHarga) {
        harga = Number(tempHarga);
    } else {
        harga = hargaRute[rute.value] || 0;
    }

    hitungTotal();
});

// ─────────────────────────────────────────
// Saat rute berubah
// ─────────────────────────────────────────
document.addEventListener('change', function (e) {

    if (e.target.id === 'rute') {

        harga = hargaRute[e.target.value] || 0;

        hitungTotal();
    }
});

// ─────────────────────────────────────────
// Saat jumlah tiket berubah
// ─────────────────────────────────────────
document.addEventListener('input', function (e) {

    if (e.target.id === 'jumlah') {
        hitungTotal();
    }
});

// ─────────────────────────────────────────
// Hitung Total
// ─────────────────────────────────────────
function hitungTotal() {

    const jumlahField = document.getElementById('jumlah');
    const totalField = document.getElementById('total');

    if (!jumlahField || !totalField) return;

    const jumlah = Number(jumlahField.value) || 1;

    const total = harga * jumlah;

    totalField.value =
        total > 0
            ? 'Rp ' + total.toLocaleString('id-ID')
            : '';
}

// ─────────────────────────────────────────
// Isi Modal Pembayaran
// ─────────────────────────────────────────
document.addEventListener('show.bs.modal', function (e) {

    if (e.target.id !== 'modalBayar') return;

    document.getElementById('mRute').innerText =
        document.getElementById('rute').value;

    document.getElementById('mJam').innerText =
        document.getElementById('jam').value;

    document.getElementById('mJumlah').innerText =
        document.getElementById('jumlah').value + ' tiket';

    document.getElementById('mTotal').innerText =
        document.getElementById('total').value;
});

// ─────────────────────────────────────────
// Tombol Bayar
// ─────────────────────────────────────────
document.addEventListener('click', function (e) {

    if (e.target.id !== 'bayar') return;

    const nama = document.getElementById('nama').value.trim();

    if (!nama) {
        alert('Nama penumpang belum diisi!');
        return;
    }

    const rute = document.getElementById('rute').value;
    const jam = document.getElementById('jam').value;
    const tanggal = document.getElementById('tanggal').value;

    if (!rute) {
        alert('Silakan pilih rute!');
        return;
    }

    if (!jam) {
        alert('Silakan pilih jam keberangkatan!');
        return;
    }

    if (!tanggal) {
        alert('Tanggal berangkat belum diisi!');
        return;
    }

    const jumlah =
        Number(document.getElementById('jumlah').value) || 1;

    const total = harga * jumlah;

    const kode =
        'BSG' + Math.floor(Math.random() * 100000);

    localStorage.setItem('kode', kode);
    localStorage.setItem('nama', nama);
    localStorage.setItem('rute', rute);
    localStorage.setItem('jam', jam);
    localStorage.setItem('tanggal', tanggal);
    localStorage.setItem('jumlah', jumlah);
    localStorage.setItem('total', total);

    localStorage.removeItem('temp_rute');
    localStorage.removeItem('temp_jam');
    localStorage.removeItem('temp_harga');

    window.location.href = 'sukses.html';
});