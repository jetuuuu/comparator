import "babel-polyfill";

const zingchart = require("zingchart");
const Invoker = require("../invoker");
const utils = require("../utils");

let store;
if (utils.isIframe()) {
  store = parent.store;
}

const functions = {
  simpleLine: () => {
    zingchart.render({
      id: "chart",
      data: {
        type: "line",
        series: [
          {
            values: generateDataSource()
          }
        ]
      }
    });
  },
  simpleArea: () => {
    zingchart.render({
      id: "chart",
      data: {
        type: "area",
        series: [
          {
            values: generateDataSource()
          }
        ]
      }
    });
  },
  simpleBar: () => {
    zingchart.render({
      id: "chart",
      data: {
        type: "bar",
        series: [
          {
            values: generateDataSource()
          }
        ]
      }
    });
  }
};

function generateDataSource() {
  const count = store.getState().points;
  return Array(count)
    .fill()
    .map(() => {
      return utils.randomNumner(0, count);
    });
}

const domContainer = document.getElementById("chart");
let dataSource;

const invoker = new Invoker();

invoker.beforeEach = () => {
  dataSource = generateDataSource();
};

invoker.afterEach = () => {
  domContainer.innerHTML = "";
};

store.getState().functions.forEach(f => {
  const result = invoker.invoke(
    functions[f].bind(this),
    store.getState().experiments
  );
  store.dispatch({
    type: "zingchart_result",
    payload: {
      name: f,
      result
    }
  });
});
