const express = require("express");
const path = require("path");

// Initialize Express app
const app = express();
require("dotenv").config();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "user-view/pages"));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000; // Use the PORT from environment or default to 3000

// Serve the main page
app.get("/", (req, res) => {
  res.render("index");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
