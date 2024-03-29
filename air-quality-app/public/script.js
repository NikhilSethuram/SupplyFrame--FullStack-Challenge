var helper = document.getElementById("details-box");

var stateCapitals = {
  AL: "Montgomery",
  AK: "Anchorage",
  AZ: "Phoenix",
  AR: "Little Rock",
  CA: "Sacramento",
  CO: "Denver",
  CT: "Hartford",
  DE: "Dover",
  FL: "Tallahassee",
  GA: "Atlanta",
  HI: "Honolulu",
  ID: "Boise",
  IL: "Springfield",
  IN: "Indianapolis",
  IA: "Des Moines",
  KS: "Topeka",
  KY: "Frankfort",
  LA: "Baton Rouge",
  ME: "Augusta",
  MD: "Annapolis",
  MA: "Boston",
  MI: "Lansing",
  MN: "St. Paul",
  MS: "Jackson",
  MO: "Jefferson City",
  MT: "Helena",
  NE: "Lincoln",
  NV: "Las Vegas",
  NH: "Concord",
  NJ: "Trenton",
  NM: "Albuquerque",
  NY: "Albany",
  NC: "Raleigh",
  ND: "Bismarck",
  OH: "Columbus",
  OK: "Oklahoma City",
  OR: "Salem",
  PA: "Harrisburg",
  RI: "Providence",
  SC: "Columbia",
  SD: "Nebraska",
  TN: "Nashville",
  TX: "Austin",
  UT: "Salt Lake City",
  VT: "Middlebury",
  VA: "Richmond",
  WA: "Olympia",
  WV: "Charleston",
  WI: "Madison",
  WY: "Cheyenne",
};

document.addEventListener("mouseover", function (e) {
  if (e.target.tagName === "path") {
    var stateAbbreviation = e.target.getAttribute("data-id");
    var stateCapital = stateCapitals[stateAbbreviation];

    if (stateCapital) {
      fetchAqiData(stateCapital, stateAbbreviation);
    }
  }
});

window.onmousemove = function (e) {
  var x = e.clientX,
    y = e.clientY;
  helper.style.top = y + 20 + "px";
  helper.style.left = x + "px";
};

document.addEventListener("mouseout", function (e) {
  if (e.target.tagName === "path") {
    helper.style.opacity = "0";
    helper.style.display = "none";
  }
});

// Function to fetch AQI data and display it
function fetchAqiData(city, stateAbbreviation) {
  var apiUrl = `https://api.waqi.info/feed/${city}/?token=ef8d51fcfae8754f3004ec5099f25c39926078ef`;
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.status === "ok") {
        var aqi = data.data.aqi;
        helper.innerHTML = `<div>${city}, ${stateAbbreviation}</div><div>AQI: ${aqi}</div>`;
        helper.style.opacity = "1";
        helper.style.display = "block";
      } else {
        throw new Error("AQI data could not be retrieved");
      }
    })
    .catch(function (error) {
      console.error("Error fetching AQI data:", error);
      helper.innerHTML = `<div>${city}, ${stateAbbreviation}</div><div>AQI data unavailable</div>`;
      helper.style.opacity = "1";
      helper.style.display = "block";
    });
}
