const express = require("express");

const app = express();
const connect = require("./configs/db");
const CORS = require("cors");
const port =process.env.PORT || 3011

const { login, register } = require("./controllers/auth.controller");

app.use(express.json());
app.use(CORS());
app.post("/register", register);
app.post("/login", login);

app.listen(port, async () => {
  try {
    await connect();
    console.log(`listening on port ${port}`);
  } catch (err) {
    console.log(err.message);
  }
});
