const kamera = {
    ambilFoto() {
        console.log(this.nama + " mengambil foto.");
    }
};

const internet = {
    bukaBrowser() {
        console.log(this.nama + " membuka browser.");
    }
};

const telepon = {
    panggil() {
        console.log(this.nama + " melakukan panggilan.");
    }
};

function applyCapabilities(Kelas, ...kemampuan) {
    Object.assign(Kelas.prototype, ...kemampuan);
}

class TabletWifi {
    constructor(nama) {
        this.nama = nama;
    }
}

class PonselJadul {
    constructor(nama) {
        this.nama = nama;
    }
}

applyCapabilities(TabletWifi, kamera, internet);
applyCapabilities(PonselJadul, telepon);

const Tablet_3300 = new TabletWifi("Tablet_3300");
const Ponsel_3300 = new PonselJadul("Ponsel_3300");

Tablet_3300.ambilFoto();
Tablet_3300.bukaBrowser();
Ponsel_3300.panggil();

console.log("Ponsel_3300 bisa mengambil foto? " + (typeof Ponsel_3300.ambilFoto === "function"));
console.log("Tablet_3300 bisa melakukan panggilan? " + (typeof Tablet_3300.panggil === "function"));