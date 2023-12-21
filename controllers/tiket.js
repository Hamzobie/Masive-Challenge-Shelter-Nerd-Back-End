const query = require("../database");

function validation(req, res, next) {
  const { nama, harga, sale_start, sale_end } = req.body;

  if (nama === "" || nama === undefined || harga === undefined || sale_start === "" || sale_start === undefined || sale_end === "" || sale_end === undefined)
    return res.status(400).json({
      message: "Invalid data!",
    });

  next();
}

const getTiket = async (req, res) => {
  try {
    const data = await query(`SELECT * FROM tiket`);

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const getTiketIndex = async (req, res) => {
  try {
    const theId = req.params.id;
    const data = await query(`SELECT * FROM tiket where tiket_id = ?`, [theId]);

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const createTiket = async (req, res) => {
  const { nama, harga, sale_start, sale_end,event_id, id_eo } = req.body;

  try {
    //  prTiket SQL injection
    const { insertId: id } = await query(
      `INSERT INTO Tiket (nama_tiket, harga, sale_start,sale_end, event_event_id, event_event_organizer_eo_id) VALUES (?, ?, ?, ?, ?, ?);`,
      [nama, harga, sale_start, sale_end, event_id, id_eo]
    );

    return res.status(200).json({
      message: "Tiket added success!",
      data: {
        id,
        ...req.body,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const updateTiket = async (req, res) => {
  const { nama, harga, sale_start, sale_end } = req.body;
  const theId = req.params.id;
  try {
    //  prTiket SQL injection
    const { insertId: id } = await query(
      'UPDATE Tiket SET nama = ?, harga = ?, sale_start = ?, sale_end=? WHERE Tiket_id = ?;',
      [nama, harga, sale_start, sale_end, theId]
    );

    return res.status(200).json({
      message: "Tiket update success!",
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
  createTiket,
  getTiket,
  validation,
  getTiketIndex,
  updateTiket
};
