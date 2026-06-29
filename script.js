let harga = 0;
const hargaRute = {
    "Jambi - Palembang": {
        Executive: 180000,
        VIP: 250000,
        Sleeper: 400000
    },
    "Jambi - Pekanbaru": {
        Executive: 200000,
        VIP: 300000,
        Sleeper: 500000
    },
    "Jambi - Padang": {
        Executive: 250000,
        VIP: 350000,
        Sleeper: 550000
    },
    "Jambi - Bengkulu": {
        Executive: 280000,
        VIP: 400000,
        Sleeper: 650000
    },
    "Jambi - Lampung": {
        Executive: 350000,
        VIP: 500000,
        Sleeper: 750000
    },
    "Jambi - Medan": {
        Executive: 550000,
        VIP: 750000,
        Sleeper: 1000000
    },
    "Jambi - Banda Aceh": {
        Executive: 850000,
        VIP: 1100000,
        Sleeper: 1500000
    }
};
function hitungHarga() {
    let rute =
        document.getElementById("rute").value;
    let kelas =
        document.getElementById("kelas").value;
    let jumlah =
        Number(
            document.getElementById("jumlah").value
        ) || 1;
    if (rute && kelas) {
        harga =
            hargaRute[rute][kelas];
    } else {
        harga = 0;
    }
    document.getElementById("total").value =
        harga
            ?
            "Rp " + (harga * jumlah).toLocaleString("id-ID")
            :
            "";
}
document.addEventListener(
    "change",
    function (e) {
        if (
            e.target.id == "rute" ||
            e.target.id == "kelas"
        ) {
            hitungHarga();
        }
    });
document.addEventListener(
    "input",
    function (e) {
        if (e.target.id == "jumlah") {
            hitungHarga();
        }
    });
document
    .getElementById("modalBayar")
    .addEventListener(
        "show.bs.modal",
        function () {
            document.getElementById("mRute").innerText =
                rute.value;
            document.getElementById("mKelas").innerText =
                kelas.value;
            document.getElementById("mJam").innerText =
                jam.value;
            document.getElementById("mJumlah").innerText =
                jumlah.value + " tiket";
            document.getElementById("mTotal").innerText =
                total.value;
        });
document
    .getElementById("bayar")
    .addEventListener(
        "click",
        function () {
            let kode =
                "BSG" + Math.floor(Math.random() * 99999);
            localStorage.setItem("kode", kode);
            localStorage.setItem(
                "nama",
                nama.value
            );
            localStorage.setItem(
                "rute",
                rute.value
            );
            localStorage.setItem(
                "kelas",
                kelas.value
            );
            localStorage.setItem(
                "jam",
                jam.value
            );
            localStorage.setItem(
                "jumlah",
                jumlah.value
            );
            localStorage.setItem(
                "total",
                harga * jumlah.value
            );
            location = "sukses.html";
        });