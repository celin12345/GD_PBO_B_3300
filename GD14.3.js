class Pembayaran {
  constructor(metode, biaya) {
    this.metode = metode;
    this.biaya = biaya;
  }
  bayar(jumlah) {
    const total = jumlah + this.biaya;
    console.log("Bayar via " + this.metode + ": Rp" + jumlah.toLocaleString("id-ID") + " + biaya Rp" + this.biaya.toLocaleString("id-ID") + " = Rp" + total.toLocaleString("id-ID"));
    return total;
  }
}

class Tunai extends Pembayaran {
  constructor() {
    super("Tunai", 0);
  }
}

class Transfer extends Pembayaran {
  constructor() {
    super("Transfer", 2500);
  }
}

class EWallet extends Pembayaran {
  constructor(provider) {
    super(`E-Wallet ${provider}`, 1000);
  }
  bayar(jumlah) {
    if (jumlah > 1000000) {
      throw new Error("Melebihi limit e-wallet");
    }
    return super.bayar(jumlah);
  }
}

class PembayaranFactory {
  static buat(jenis, opsi = {}) {
    if (jenis === "tunai") {
      return new Tunai();
    } else if (jenis === "transfer") {
      return new Transfer();
    } else if (jenis === "ewallet") {
      return new EWallet(opsi.provider || "Umum");
    } else {
      throw new Error(`Metode pembayaran "${jenis}" tidak tersedia`);
    }
  }
}

[
  ["tunai", 100000],
  ["transfer", 100000],
  ["ewallet", 250000, { provider: "GoPay" }],
].forEach(([jenis, jumlah, opsi]) => {
  console.log("Total dibayar:", PembayaranFactory.buat(jenis, opsi).bayar(jumlah));
});

try {
  PembayaranFactory.buat("ewallet", { provider: "OVO" }).bayar(2000000);
} catch (e) {
  console.log("Error:", e.message);
}
try {
  PembayaranFactory.buat("kredit").bayar(1000);
} catch (e) {
  console.log("Error:", e.message);
}