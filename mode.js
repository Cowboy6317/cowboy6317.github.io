const lightModeButton = document.querySelector("#light-mode");
const darkModeButton = document.querySelector("#dark-mode");
const dropdownButton = document.querySelector(".dropbtn");

// Function to toggle between light mode and dark mode
function toggleMode(event) {
  if (event.target.id === "light-mode") {
    // Turn on light mode
    document.documentElement.setAttribute("data-mode", "light");
    dropdownButton.style.backgroundColor = "#f2f2f2";
    document.body.style.backgroundColor = "#fff";
    document.body.style.color = "#000";
  } else {
    // Turn on dark mode
    document.documentElement.setAttribute("data-mode", "dark");
    dropdownButton.style.backgroundColor = "#2c3e50";
    document.body.style.backgroundColor = "#111";
    document.body.style.color = "#fff";
  }

  // update localStorage with the current mode
  localStorage.setItem("mode", document.documentElement.getAttribute("data-mode"));
}

lightModeButton.addEventListener("click", toggleMode);
darkModeButton.addEventListener("click", toggleMode);

// set the initial mode based on localStorage
let currentMode = localStorage.getItem("mode") || "light";
setMode(currentMode);

// function to set the mode and update localStorage
function setMode(mode) {
  document.documentElement.setAttribute("data-mode", mode);
  if (mode === "light") {
    dropdownButton.style.backgroundColor = "#f2f2f2";
    document.body.style.backgroundColor = "#fff";
    document.body.style.color = "#000";
  } else {
    dropdownButton.style.backgroundColor = "#2c3e50";
    document.body.style.backgroundColor = "#111";
    document.body.style.color = "#fff";
  }
}

// event listener for mode toggle button
document.querySelector("#toggle-mode").addEventListener("click", function () {
  if (currentMode === "light") {
    setMode("dark");
    currentMode = "dark";
  } else {
    setMode("light");
    currentMode = "light";
  }

  // update localStorage with the current mode
  localStorage.setItem("mode", currentMode);
});
