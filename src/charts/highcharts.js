import "babel-polyfill";

const Highcharts = require("highcharts");
const Invoker = require("../invoker");
const utils = require("../utils");

let store;
if (utils.isIframe()) {
  store = parent.store;
}

const functions = {
  simpleArea: () => {
    Highcharts.chart("chart", {
      chart: {
        type: "area"
      },
      series: [
        {
          data: dataSource
        }
      ]
    });
  },
  simpleLine: () => {
    Highcharts.chart("chart", {
      chart: {
        type: "line"
      },
      series: [
        {
          data: dataSource
        }
      ]
    });
  },
  simpleBar: () => {
    Highcharts.chart("chart", {
      chart: {
        type: "bar"
      },
      series: [
        {
          data: dataSource
        }
      ]
    });
  }
};

function generateDataSource() {
  const count = parent.store.getState().points;
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
    type: "highcharts_result",
    payload: {
      name: f,
      result
    }
  });
});
