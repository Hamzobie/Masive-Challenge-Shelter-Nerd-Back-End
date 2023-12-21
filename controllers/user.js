const query = require("../database");

function validation(req, res, next) {
  const { nama, email, password, telepon } = req.body;

  if (nama === "" || nama === undefined || email === "" || email === undefined || password === "" || password === undefined || telepon === "" || telepon === undefined)
    return res.status(400).json({
      message: "Invalid data!",
    });

  next();
}

const getUser = async (req, res) => {
  try {
    const data = await query(`SELECT * FROM user`);

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const getUserIndex = async (req, res) => {
  try {
    const theId = req.params.id;
    const data = await query(`SELECT * FROM user where user_id = ?`, [theId]);

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const createUser = async (req, res) => {
  const { nama, email, password, telepon } = req.body;

  try {
    //  prevent SQL injection
    const { insertId: id } = await query(
      `INSERT INTO user (nama, email, password, telepon) VALUES (?, ?, ?, ?);`,
      [nama, email, password, telepon]
    );

    return res.status(200).json({
      message: "User added success!",
      data: {
        id,
        ...req.body,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const updateUser = async (req, res) => {
  const { nama, email, password, telepon } = req.body;
  const theId = req.params.id;
  try {
    //  prevent SQL injection
    const { insertId: id } = await query(
      'UPDATE user SET nama = ?, email = ?, password = ?, telepon = ? WHERE user_id = ?;',
      [nama, email, password, telepon, theId]
    );

    return res.status(200).json({
      message: "User update success!",
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
    const results = await query('SELECT * FROM user WHERE email = ? AND password = ?' , [email, password]);

    if (results.length === 0) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }else if(results.length === 0){
      return res.status(200).json({message : "berhasil login"});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  createUser,
  getUser,
  validation,
  getUserIndex,
  updateUser,
  login
};
