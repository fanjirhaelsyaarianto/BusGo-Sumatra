let harga = 0;

const tombolPilih =
document.querySelectorAll(".pilih");

tombolPilih.forEach(btn => {

    btn.addEventListener("click", () => {

        document.getElementById("rute").value =
        btn.dataset.rute;

        document.getElementById("jam").value =
        btn.dataset.jam;

        harga =
        Number(btn.dataset.harga);

        hitungTotal();

    });

});

document
.getElementById("jumlah")
.addEventListener("input", hitungTotal);

function hitungTotal(){

    const jumlah =
    Number(document.getElementById("jumlah").value);

    const total =
    harga * jumlah;

    document.getElementById("total").value =
    "Rp " + total.toLocaleString("id-ID");
}

const modal =
document.getElementById("modalBayar");

modal.addEventListener("show.bs.modal", () => {

    document.getElementById("mRute").innerText =
    document.getElementById("rute").value;

    document.getElementById("mJam").innerText =
    document.getElementById("jam").value;

    document.getElementById("mJumlah").innerText =
    document.getElementById("jumlah").value;

    document.getElementById("mTotal").innerText =
    document.getElementById("total").value;

});

document
.getElementById("bayar")
.addEventListener("click", () => {

    const kode =
    "BSG" + Math.floor(Math.random()*100000);

    const jumlah =
    Number(document.getElementById("jumlah").value);

    const total =
    harga * jumlah;

    localStorage.setItem(
        "kode",
        kode
    );

    localStorage.setItem(
        "nama",
        document.getElementById("nama").value
    );

    localStorage.setItem(
        "rute",
        document.getElementById("rute").value
    );

    localStorage.setItem(
        "jam",
        document.getElementById("jam").value
    );

    localStorage.setItem(
        "jumlah",
        jumlah
    );

    localStorage.setItem(
        "total",
        total
    );

    window.location.href =
    "sukses.html";

});