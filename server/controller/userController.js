const { validationResult } = require("express-validator");
const db = require('../db/queries');


const registerUser = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(404).json({ errors: error.array });
  }

  const { userName, userPassword } = req.body;
  await db.insertUser(userName, userPassword);
  res.status(200).json({ message: "User registered!" });
};

const loginUser = async (req, res) => {
  const usernames = await db.getAllUsers();
  res.json(usernames);
};

module.exports = {
  registerUser,
  loginUser,
};
