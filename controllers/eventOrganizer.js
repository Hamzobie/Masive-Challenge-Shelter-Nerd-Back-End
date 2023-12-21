const query = require("../database");

function validation(req, res, next) {
  const { nama, email, password, telepon } = req.body;

  if (nama === "" || nama === undefined || email === "" || email === undefined || password === "" || password === undefined || telepon === "" || telepon === undefined)
    return res.status(400).json({
      message: "Invalid data!",
    });

  next();
}

const getEO = async (req, res) => {
  try {
    const data = await query(`SELECT * FROM event_organizer`);

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const getEOIndex = async (req, res) => {
  try {
    const theId = req.params.id;
    const data = await query(`SELECT * FROM event_organizer where eo_id = ?`, [theId]);

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const createEO = async (req, res) => {
  const { nama, email, password, telepon} = req.body;

  try {
    //  prevent SQL injection
    const { insertId: id } = await query(
      `INSERT INTO event_organizer (nama_eo, email, password, telepon) VALUES (?, ?, ?, ?);`,
      [nama, email, password, telepon]
    );

    return res.status(200).json({
      message: "EO added success!",
      data: {
        id,
        ...req.body,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const updateEO = async (req, res) => {
  const { nama, email, password, telepon, alamat, link, instagram, facebook, x } = req.body;
  const theId = req.params.id;
  try {
    //  prevent SQL injection
    const { insertId: id } = await query(
      'UPDATE event_organizer SET nama = ?, email = ?, password = ?, telepon = ?, alamat =?, eo_link =?, instagram_link=?, facebook_link=?,x_link=? WHERE EO_id = ?;',
      [nama, email, password, telepon,alamat, link, instagram, facebook, x, theId]
    );

    return res.status(200).json({
      message: "EO update success!",
      data: {
        id,
        ...req.body,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const login = async (req,res)=>{
  const { email, password } = req.body;

  try {
    const results = await query('SELECT * FROM event_organizer WHERE email = ? AND password = ?' , [email, password]);

    if (results.length === 0) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }else if (results.length === 1){
      return res.status(200).json({message : "berhasil login"});
    }else{
      return res.status(404).json({message : "Data tidak ditemukan"})
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  createEO,
  getEO,
  validation,
  getEOIndex,
  updateEO,
  login
};
