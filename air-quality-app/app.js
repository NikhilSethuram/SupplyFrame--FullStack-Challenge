//express setup
const express = require("express");
const app = express();
const path = require("path");
//api key stored here
require("dotenv").config();

//static files
app.use(express.static(path.join(__dirname, "public")));

//homepage --> map
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

//server will run on 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Nikhil's Server is running on port ${PORT}`);
});
