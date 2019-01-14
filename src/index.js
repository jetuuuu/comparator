const Push = require("push.js");

function loadScript(path) {
  const script = document.createElement("script");
  script.src = path;

  document.body.appendChild(script);
}

document.getElementById("charts").addEventListener("change", event => {
  store.dispatch({
    type: "add_chart_library",
    payload: {
      name: event.target.value
    }
  });
});

document.getElementById("start").addEventListener("click", event => {
  store.getState().libraries.forEach(chart => {
    loadScript(`dist/${chart}.js`);
  });
});

document.getElementById("points").addEventListener("change", event => {
  store.dispatch({
    type: "points_count",
    payload: {
      count: +event.target.value
    }
  });
});

document.getElementById("experiments").addEventListener("change", event => {
  store.dispatch({
    type: "experiments_count",
    payload: {
      count: +event.target.value
    }
  });
});

store.subscribe(() => {
  const results = store.getState().result;
  let result = [];
  for (let key in results) {
    const html = results[key].map(
      ({ name, result }) =>
        `<p>${key}[${name}]; max: ${result.max}; min: ${result.min}; avg: ${
          result.avg
        }</p>`
    );
    result = result.concat(html);
  }

  document.getElementById("results").innerHTML = result.join("");
});

window.addEventListener("load", () => {
  const app = document.getElementById("app");

  const checkboxes = document.createElement("div");
  checkboxes.id = "checkboxes";

  checkboxes.innerHTML = ["simpleLine", "simpleArea", "simpleBar"]
    .map(func => {
      return `<div>
                    <input type="checkbox" id="${func}" name="${func}">
                    <label for="${func}">${func}</label>
                </div>`;
    })
    .join("");

  checkboxes.addEventListener("click", event => {
    if (event.target.checked) {
      store.dispatch({
        type: "add_function",
        payload: {
          func: event.target.id
        }
      });
    } else {
      store.dispatch({
        type: "remove_function",
        payload: {
          func: event.target.id
        }
      });
    }
  });

  app.appendChild(checkboxes);

  Push.Permission.request();
});
