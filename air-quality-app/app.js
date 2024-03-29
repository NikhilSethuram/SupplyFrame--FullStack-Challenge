const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config(); //for api key security

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "user-view/pages"));

//static files
app.use(express.static(path.join(__dirname, "public")));

const PORT = 3000; //runs on 3000

//oue homepage
app.get("/", (req, res) => {
  res.render("index");
});

//exporting for tests
module.exports = app;

//Start the server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Nikhil's Server is running on port ${PORT}`);
  });
}
