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
// pilih jadwal
document.addEventListener(
    'click',
    function (e) {
        let btn = e.target.closest(".pilih");
        if (!btn) return;
        localStorage.setItem(
            "temp_rute",
            btn.dataset.rute
        );
        localStorage.setItem(
            "temp_jam",
            btn.dataset.jam
        );
        window.location.href = "pesan.html";
    });
document.addEventListener(
    "DOMContentLoaded",
    () => {
        let rute = document.getElementById("rute");
        if (!rute) return;
        rute.value =
            localStorage.getItem("temp_rute") || "";
        document.getElementById("jam").value =
            localStorage.getItem("temp_jam") || "";
        hitungTotal();
    });
document.addEventListener(
    "change",
    function (e) {
        if (
            e.target.id == "rute" ||
            e.target.id == "kelas"
        ) {
            let rute =
                document.getElementById("rute").value;
            let kelas =
                document.getElementById("kelas").value;
            if (rute && kelas) {
                harga =
                    hargaRute[rute][kelas];
            }
            else {
                harga = 0;
            }
            hitungTotal();
        }
    });
document.addEventListener(
    "input",
    function (e) {
        if (e.target.id == "jumlah") {
            hitungTotal();
        }
    });
function hitungTotal() {
    let jumlah =
        Number(
            document.getElementById("jumlah")?.value
        ) || 1;
    let total =
        harga * jumlah;
    let field =
        document.getElementById("total");
    if (field) {
        field.value =
            total ?
                "Rp " + total.toLocaleString("id-ID")
                : "";
    }
}
// modal
document.addEventListener(
    "show.bs.modal",
    function (e) {
        document.getElementById("mRute").innerText =
            document.getElementById("rute").value;
        document.getElementById("mKelas").innerText =
            document.getElementById("kelas").value;
        document.getElementById("mJam").innerText =
            document.getElementById("jam").value;
        document.getElementById("mJumlah").innerText =
            document.getElementById("jumlah").value + " tiket";
        document.getElementById("mTotal").innerText =
            document.getElementById("total").value;
    });
document.addEventListener(
    "click",
    function (e) {
        if (e.target.id != "bayar") return;
        let nama =
            document.getElementById("nama").value;
        let kode =
            "BSG" + Math.floor(Math.random() * 99999);
        localStorage.setItem("kode", kode);
        localStorage.setItem("nama", nama);
        localStorage.setItem(
            "rute",
            document.getElementById("rute").value
        );
        localStorage.setItem(
            "kelas",
            document.getElementById("kelas").value
        );
        localStorage.setItem(
            "jam",
            document.getElementById("jam").value
        );
        localStorage.setItem(
            "jumlah",
            document.getElementById("jumlah").value
        );
        localStorage.setItem(
            "total",
            harga *
            Number(document.getElementById("jumlah").value)
        );
        window.location.href = "sukses.html";
    });
document.getElementById("kelas").innerText =
localStorage.getItem("kelas");