const query = require("../database");

function validation(req, res, next) {
  const {tanggal_transaksi, besar_transaksi, jumlah_tiket, kode_transaksi } = req.body;

  if (tanggal_transaksi === undefined || besar_transaksi === "" || besar_transaksi === undefined || jumlah_tiket === "" || jumlah_tiket === undefined || kode_transaksi === "" || kode_transaksi === undefined)
    return res.status(400).json({
      message: "Invalid data!",
    });

  next();
}

const getTransaksi = async (req, res) => {
  try {
    const data = await query(`SELECT * FROM transaksi`);

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const getTransaksiIndex = async (req, res) => {
  try {
    const theId = req.params.id;
    const data = await query(`SELECT * FROM transaksi where transaksi_id = ?`, [theId]);

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const createTransaksi = async (req, res) => {
  const {tanggal_transaksi, besar_transaksi, jumlah_tiket,kode_transaksi,user_id,tiket_id,event_id, id_eo } = req.body;

  try {
    //  prTransaksi SQL injection
    const { insertId: id } = await query(
      `INSERT INTO Transaksi (nama_Transaksi, tanggal_transaksi, besar_transaksi,jumlah_tiket, kode_transaksi,user_user_id,tiket_tiket_id,tiket_event_event_id, tiket_event_event_organizer_eo_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [tanggal_transaksi, besar_transaksi, jumlah_tiket, kode_transaksi, user_id, tiket_id, event_id, id_eo]
    );

    return res.status(200).json({
      message: "transaksi added success!",
      data: {
        id,
        ...req.body,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const updateTransaksi = async (req, res) => {
  const {tanggal_transaksi, besar_transaksi, jumlah_tiket } = req.body;
  const theId = req.params.id;
  try {
    //  prTransaksi SQL injection
    const { insertId: id } = await query(
      'UPDATE transaksi SET tanggal_transaksi = ?, besar_transaksi = ?, jumlah_tiket=? WHERE Transaksi_id = ?;',
      [tanggal_transaksi, besar_transaksi, jumlah_tiket, theId]
    );

    return res.status(200).json({
      message: "Transaksi update success!",
      data: {
        id,
        ...req.body,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

module.exports = {
  createTransaksi,
  getTransaksi,
  validation,
  getTransaksiIndex,
  updateTransaksi
};
