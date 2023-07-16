const express = require("express");
const app = express();
const URLRouter = require("./routes/url.js");
const PORT = 8000;

const getDBConnection = require("./connection.js");

getDBConnection("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use("/url", URLRouter);
app.listen(PORT, () => console.log(`Server started on Port : ${PORT}`));
