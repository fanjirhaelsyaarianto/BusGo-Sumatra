let harga = 0;
const hargaRute = {
    "Jambi - Palembang":{
        Executive:180000,
        VIP:250000,
        Sleeper:400000
    },
    "Jambi - Pekanbaru":{
        Executive:200000,
        VIP:300000,
        Sleeper:500000
    },
    "Jambi - Padang":{
        Executive:250000,
        VIP:350000,
        Sleeper:550000
    },
    "Jambi - Bengkulu":{
        Executive:280000,
        VIP:400000,
        Sleeper:650000
    },
    "Jambi - Lampung":{
        Executive:350000,
        VIP:500000,
        Sleeper:750000
    },
    "Jambi - Medan":{
        Executive:550000,
        VIP:750000,
        Sleeper:1000000
    },
    "Jambi - Banda Aceh":{
        Executive:850000,
        VIP:1100000,
        Sleeper:1500000
    }
};
// tombol jadwal
document.addEventListener("click",function(e){
    let tombol=e.target.closest(".pilih");
    if(!tombol)return;
    localStorage.setItem(
        "temp_rute",
        tombol.dataset.rute
    );
    localStorage.setItem(
        "temp_jam",
        tombol.dataset.jam
    );
    window.location="pesan.html";
});
// load pesan
document.addEventListener(
"DOMContentLoaded",
function(){
let rute=document.getElementById("rute");
let jam=document.getElementById("jam");
let kelas=document.getElementById("kelas");
if(!rute)return;
rute.value =
localStorage.getItem("temp_rute") || "";
jam.value =
localStorage.getItem("temp_jam") || "";
hitungHarga();
});
// perubahan input
document.addEventListener(
"change",
function(e){
if(
e.target.id=="rute" ||
e.target.id=="kelas"
){
hitungHarga();
}
});
document.addEventListener(
"input",
function(e){
if(e.target.id=="jumlah"){
hitungHarga();
}
});
function hitungHarga(){
let rute =
document.getElementById("rute")?.value;
let kelas =
document.getElementById("kelas")?.value;
let jumlah =
Number(
document.getElementById("jumlah")?.value
) || 1;
if(
rute &&
kelas
){
harga =
hargaRute[rute][kelas];
}
else{
harga=0;
}
let total =
harga*jumlah;
let hasil =
document.getElementById("total");
if(hasil){
hasil.value =
total ?
"Rp "+total.toLocaleString("id-ID")
:
"";
}
}
// modal
document.addEventListener(
"show.bs.modal",
function(){
document.getElementById("mRute").innerHTML =
document.getElementById("rute").value;
document.getElementById("mKelas").innerHTML =
document.getElementById("kelas").value;
document.getElementById("mJam").innerHTML =
document.getElementById("jam").value;
document.getElementById("mJumlah").innerHTML =
document.getElementById("jumlah").value+" tiket";
document.getElementById("mTotal").innerHTML =
document.getElementById("total").value;
});
// bayar
document.addEventListener(
"click",
function(e){
if(e.target.id!="bayar")
return;
let total =
harga *
Number(
document.getElementById("jumlah").value
);
let kode =
"BSG"+
Math.floor(Math.random()*99999);
localStorage.setItem("kode",kode);
localStorage.setItem(
"nama",
document.getElementById("nama").value
);
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
total
);
location="sukses.html";
});
