var helper = document.getElementById("details-box");

document.addEventListener("mouseover", function (e) {
  if (e.target.tagName === "path") {
    //retrieve our state name
    var stateFullName = e.target.getAttribute("data-name");
    helper.textContent = stateFullName;
    //make it fully visible and display it
    helper.style.opacity = "1";
    helper.style.display = "block";
  } else {
    //hide if not hovering
    helper.style.opacity = "0";
  }
});

//update helper position based on mouse position
window.onmousemove = function (e) {
  var x = e.clientX,
    y = e.clientY;
  helper.style.top = y + 20 + "px";
  helper.style.left = x + "px";
};

document.addEventListener("mouseout", function (e) {
  if (e.target.tagName === "path") {
    //set to transparent when leaves a path
    helper.style.opacity = "0";
  }
});
