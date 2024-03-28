//express setup
const express = require("express");
//for api calls
const axios = require("axios");
const app = express();
const path = require("path");
//api key stored here
require("dotenv").config();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "user-view/pages"));
//static files
app.use(express.static(path.join(__dirname, "public")));

const stateNames = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};

//homepage --> map
app.get("/", (req, res) => {
  res.render("index");
});

//for handling api call
const cache = new Map(); //simple caching

app.get("/get-aqi", async (req, res) => {
  const { city, state } = req.query;
  const apiKey = process.env.API_KEY;
  const cacheKey = `${city}-${state}`;

  //Check cache first
  if (
    cache.has(cacheKey) &&
    Date.now() - cache.get(cacheKey).timestamp < 60000
  ) {
    return res.json(cache.get(cacheKey).data);
  }

  const fullStateName = stateNames[state];

  // Handle invalid state abbreviation
  if (!fullStateName) {
    return res.status(400).json({ error: "Invalid state abbreviation" });
  }

  const url = `http://api.airvisual.com/v2/city?city=${encodeURIComponent(
    city
  )}&state=${encodeURIComponent(fullStateName)}&country=USA&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    // Save to cache
    cache.set(cacheKey, { timestamp: Date.now(), data: response.data });
    res.json(response.data); // Send to frontend
  } catch (error) {
    if (error.response && error.response.status === 429) {
      // Handle rate limit error, possibly with a retry or sending a message to the client to try again later
      console.error("Rate limit exceeded, please try again later");
      return res
        .status(429)
        .json({ error: "Rate limit exceeded, please try again later" });
    }
    console.error("Error fetching AQI data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//server will run on 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Nikhil's Server is running on port ${PORT}`);
});
