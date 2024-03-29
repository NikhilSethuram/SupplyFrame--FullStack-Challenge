var helper = document.getElementById("details-box");

var stateCapitals = {
  AL: "Montgomery",
  AK: "Anchorage",
  AZ: "Phoenix",
  AR: "Beaverfork",
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
    //get the state abbr.
    var stateAbbreviation = e.target.getAttribute("data-id");
    //use our dict to get the capital/city from city
    var stateCapital = stateCapitals[stateAbbreviation];

    if (stateCapital) {
      //helper function
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
    //hide
    helper.style.opacity = "0";
    helper.style.display = "none";
  }
});

// helper function to fetch AQI data and display it
function fetchAqiData(city, stateAbbreviation) {
  var apiUrl = `https://api.waqi.info/feed/${city}/?token=ef8d51fcfae8754f3004ec5099f25c39926078ef`; //my API token
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
        //handle error
      } else {
        throw new Error("AQI data could not be retrieved");
      }
    })
    .catch(function (error) {
      //no data avail
      console.error("Error fetching AQI data:", error);
      helper.innerHTML = `<div>${city}, ${stateAbbreviation}</div><div>AQI data unavailable</div>`;
      helper.style.opacity = "1";
      helper.style.display = "block";
    });
}
