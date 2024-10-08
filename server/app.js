const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const users = [];

app.post("/register", (req, res) => {
  const { userName, userPassword, userConfirmPassword } = req.body;

  if (userPassword !== userConfirmPassword) {
    return res.status(400).json({ message: "Passwords do not match!" });
  }

  users.push({ userName, userPassword });
  res.status(201).json({ message: "User registered!" });
});

app.get("/login", (req, res) => {
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
