import "babel-polyfill";

const Highcharts = require("highcharts");
const Invoker = require("../invoker");
const utils = require("../utils");

let store, chart;
if (utils.isIframe()) {
  store = parent.store;
}

const functions = {
  simpleLine: () => {
    return new Promise(resolve => {
      chart = Highcharts.chart("chart", {
        chart: {
          type: "line",
          animation: false,
          events: {
            load: resolve
          }
        },
        series: [
          {
            data: dataSource
          }
        ]
      });
    });
  },
  simpleArea: () => {
    return new Promise(resolve => {
      chart = Highcharts.chart("chart", {
        chart: {
          type: "area",
          animation: false,
          events: {
            load: resolve
          }
        },
        series: [
          {
            data: dataSource
          }
        ]
      });
    });
  },
  simpleBar: () => {
    return new Promise(resolve => {
      chart = Highcharts.chart("chart", {
        chart: {
          type: "bar",
          animation: false,
          events: {
            load: resolve
          }
        },
        series: [
          {
            data: dataSource
          }
        ]
      });
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
  chart.destroy();
  chart = null;
  domContainer.innerHTML = "";
};

store.getState().functions.forEach(f => {
  invoker
    .invoke(functions[f].bind(this), store.getState().experiments)
    .then(result => {
      store.dispatch({
        type: "highcharts_result",
        payload: {
          name: f,
          result
        }
      });
    });
});
