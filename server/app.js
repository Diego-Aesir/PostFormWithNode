const express = require("express");
const cors = require("cors");
const userController = require("./controller/userController");
const userValidator = require("./validator/userValidator");
const initDB = require("./db/initDB");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/register", userValidator, userController.registerUser);

app.get("/login", userController.loginUser);

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});