const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.static("public"));
app.use(express.json());

app.use((req, res, next) => {
  next();
});

app.get("/", function (req, res) {
  
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Server started on " + PORT);
});
