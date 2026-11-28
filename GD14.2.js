class Saham {
  constructor(kode, harga) {
    this.kode = kode;
    this.harga = harga;
    this.observers = [];
  }

  subscribe(observer) {
    let sudahAda = false;
    for (let i = 0; i < this.observers.length; i++) {
      if (this.observers[i] === observer) {
        sudahAda = true;
      }
    }
    if (sudahAda === false) {
      this.observers.push(observer);
    }
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  ubahHarga(hargaBaru) {
    const hargaLama = this.harga;
    this.harga = hargaBaru;
    this.observers.forEach((o) => o.update(this.kode, hargaLama, hargaBaru));
  }
}

class Investor {
  constructor(nama, batas) {
    this.nama = nama;
    this.batas = batas;
  }

  update(kode, lama, baru) {
    const selisih = Math.abs(baru - lama);
    if (selisih >= this.batas) {
      let arah = "turun";
      if (baru > lama) {
        arah = "naik";
      }
      console.log(`${this.nama}: ${kode} ${lama} -> ${baru} (${arah})`);
    }
  }
}

const bbca = new Saham("BBCA", 9000);
const andi = new Investor("Andi", 100);
const budi = new Investor("Budi", 500);

bbca.subscribe(andi);
bbca.subscribe(budi);
bbca.subscribe(andi);

bbca.ubahHarga(9200);
bbca.ubahHarga(8500);
bbca.unsubscribe(andi);
bbca.ubahHarga(9100);
console.log("Jumlah observer:", bbca.observers.length);