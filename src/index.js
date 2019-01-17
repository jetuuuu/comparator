import "babel-polyfill";

function loadScript(path, id) {
  const iframe = document.createElement("iframe");
  iframe.id = `${id}_frame`;
  iframe.src = path;

  const currentIframe = document.getElementById(`${iframe.id}`);
  if (currentIframe) currentIframe.parentNode.removeChild(currentIframe);

  document.body.appendChild(iframe);
}

document.getElementById("charts").addEventListener("click", event => {
  const type = event.target.checked
    ? "add_chart_library"
    : "remove_chart_library";
  store.dispatch({
    type,
    payload: {
      name: event.target.id
    }
  });
});

document.getElementById("start").addEventListener("click", event => {
  store.dispatch({ type: "clear_results" });
  store.getState().libraries.forEach(chart => {
    loadScript(`dist/${chart}.html`, chart);
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
        `<p>
          <span>${key}[${name}];</span>
          <span>max: ${result.max};</span>
          <span>min: ${result.min};</span>
          <span>avg: ${result.avg}</span>
        </p>`
    );
    result = result.concat(html);
  }

  document.getElementById("results").innerHTML = result.join("");
});

window.addEventListener("load", () => {
  const app = document.getElementById("app");

  const checkboxes = document.createElement("div");
  checkboxes.id = "checkboxes";
  checkboxes.classList.add("container");

  checkboxes.innerHTML =
    "<span>Types</span>" +
    ["simpleLine", "simpleArea", "simpleBar"]
      .map(func => {
        return `<div>
                    <input type="checkbox" id="${func}" name="${func}">
                    <label for="${func}">${func}</label>
                </div>`;
      })
      .join("");

  checkboxes.addEventListener("click", event => {
    const type = event.target.checked ? "add_function" : "remove_function";
    store.dispatch({
      type,
      payload: {
        func: event.target.id
      }
    });
  });
  app.insertBefore(checkboxes, document.getElementById("start"));
});
