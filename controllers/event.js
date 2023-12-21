const query = require("../database");

function validation(req, res, next) {
  const { nama, kategori, lokasi_event, syarat } = req.body;

  if (nama === "" || nama === undefined || kategori === "" || kategori === undefined || lokasi_event === "" || lokasi_event === undefined || syarat === "" || syarat === undefined)
    return res.status(400).json({
      message: "Invalid data!",
    });

  next();
}

const getEvent = async (req, res) => {
  try {
    const data = await query(`SELECT * FROM event`);

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const getEventIndex = async (req, res) => {
  try {
    const theId = req.params.id;
    const data = await query(`SELECT * FROM event where event_id = ?`, [theId]);

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const createEvent = async (req, res) => {
  const { nama, kategori, lokasi_event, link_event, tanggal_event, waktu, image, deskripsi, syarat, id_eo } = req.body;

  try {
    //  prevent SQL injection
    const { insertId: id } = await query(
      `INSERT INTO event (nama_event, kategori, lokasi_event, link_event, tanggal_event, waktu_event, image_event, deskripsi_event,syarat_ketentuan, event_organizer_eo_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?);`,
      [nama, kategori, lokasi_event, link_event, tanggal_event, waktu, image, deskripsi, syarat,id_eo]
    );

    return res.status(200).json({
      message: "Event added success!",
      data: {
        id,
        ...req.body,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const updateEvent = async (req, res) => {
  const { nama, kategori, lokasi_event, link_event, tanggal, waktu, image, deskripsi, syarat } = req.body;
  const theId = req.params.id;
  try {
    //  prevent SQL injection
    const { insertId: id } = await query(
      'UPDATE event SET nama = ?, kategori = ?, lokasi_event = ?, link_event = ?, tanggal_event =?, waktu_event =?, image_event=?, deskripsi_event=?,syarat_ketentuan=? WHERE Event_id = ?;',
      [nama, kategori, lokasi_event, link_event,tanggal, waktu, image, deskripsi, syarat, theId]
    );

    return res.status(200).json({
      message: "Event update success!",
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
  createEvent,
  getEvent,
  validation,
  getEventIndex,
  updateEvent
};
