function loadScript(path) {
    const script = document.createElement("script");
    script.src = path;

    document.body.appendChild(script);
}

document.getElementById("charts").addEventListener("change", (event) => {
    switch (event.target.value) {
        case "dx":
            ["dist/dx.js"].map(loadScript);
            break
        case "highcharts":
            alert("unsupported");
    }
});