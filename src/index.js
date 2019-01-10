function loadScript(path) {
  const script = document.createElement("script");
  script.src = path;

  document.body.appendChild(script);
}

document.getElementById("charts").addEventListener("change", event => {
  switch (event.target.value) {
    case "dx":
      loadScript("dist/dx.js");
      break;
    case "highcharts":
      loadScript("dist/highcharts.js");
      break;
    default:
      alert("unsupported");
  }
});
