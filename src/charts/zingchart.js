import "babel-polyfill";

const zingchart = require("zingchart");
const Invoker = require("../invoker");
const utils = require("../utils");

let store, chart;
if (utils.isIframe()) {
  store = parent.store;
}

const functions = {
  simpleLine: () => {
    return new Promise(resolve => {
      chart = zingchart.render({
        id: "chart",
        data: {
          type: "line",
          series: [
            {
              values: dataSource
            }
          ]
        },
        events: {
          complete: resolve()
        }
      });
    });
  },
  simpleArea: () => {
    return new Promise(resolve => {
      chart = zingchart.render({
        id: "chart",
        data: {
          type: "area",
          series: [
            {
              values: dataSource
            }
          ]
        },
        events: {
          complete: resolve()
        }
      });
    });
  },
  simpleBar: () => {
    return new Promise(resolve => {
      chart = zingchart.render({
        id: "chart",
        data: {
          type: "bar",
          series: [
            {
              values: dataSource
            }
          ]
        },
        events: {
          complete: resolve()
        }
      });
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

const invoker = new Invoker();
let dataSource;

invoker.beforeEach = () => {
  dataSource = generateDataSource();
};

invoker.afterEach = () => {
  chart.destroy();
  chart = null;
  domContainer.innerHTML = "";
};

store.getState().functions.forEach(f => {
  invoker
    .invoke(functions[f].bind(this), store.getState().experiments)
    .then(result => {
      store.dispatch({
        type: "zingchart_result",
        payload: {
          name: f,
          result
        }
      });
    });
});
