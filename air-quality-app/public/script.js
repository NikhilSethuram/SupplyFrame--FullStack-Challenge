//state capitals to display aqi
const stateCapitals = {
  AL: "Montgomery",
  AK: "Juneau",
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
  NV: "Carson City",
  NH: "Concord",
  NJ: "Trenton",
  NM: "Santa Fe",
  NY: "Albany",
  NC: "Raleigh",
  ND: "Bismarck",
  OH: "Columbus",
  OK: "Oklahoma City",
  OR: "Salem",
  PA: "Harrisburg",
  RI: "Providence",
  SC: "Columbia",
  SD: "Pierre",
  TN: "Nashville",
  TX: "Austin",
  UT: "Salt Lake City",
  VT: "Montpelier",
  VA: "Richmond",
  WA: "Olympia",
  WV: "Charleston",
  WI: "Madison",
  WY: "Cheyenne",
};

var helper = document.getElementById("details-box");
var aqiCache = {}; // Cache to store the AQI data
let apiCallCount = 0; // Counter for API calls

document.addEventListener("mouseover", function (e) {
  if (e.target.tagName === "path") {
    var stateAbbreviation = e.target.getAttribute("data-id");
    var stateCapital = stateCapitals[stateAbbreviation];

    if (aqiCache[stateAbbreviation]) {
      displayAqiData(stateAbbreviation, aqiCache[stateAbbreviation]);
    } else {
      apiCallCount++;
      console.log(`API call count: ${apiCallCount}`);
      fetch(`/get-aqi?city=${stateCapital}&state=${stateAbbreviation}`)
        .then((response) => response.json())
        .then((data) => {
          if (
            data &&
            data.data &&
            data.data.current &&
            data.data.current.pollution
          ) {
            var aqi = data.data.current.pollution.aqius;
            aqiCache[stateAbbreviation] = aqi;
            displayAqiData(stateAbbreviation, aqi);
          }
        })
        .catch((error) => {
          console.error("Error fetching AQI:", error);
        });
    }
  }
});

function displayAqiData(stateAbbreviation, aqi) {
  var stateCapital = stateCapitals[stateAbbreviation];
  helper.innerHTML = `Capital: ${stateCapital}<br>AQI: ${aqi}`;
  helper.style.display = "block";
  helper.style.opacity = "1"; // Make the box fully opaque
}

window.onmousemove = function (e) {
  var x = e.clientX,
    y = e.clientY;
  helper.style.top = y + 20 + "px";
  helper.style.left = x + 20 + "px";
};

document.addEventListener("mouseout", function (e) {
  if (e.target.tagName === "path") {
    helper.style.opacity = "0"; // Make the box transparent
  }
});
