import "babel-polyfill";

const dxChart = require("devextreme/viz/chart");
const Invoker = require("../invoker");
const utils = require("../utils");

let store, dataSource, chart;

if (utils.isIframe()) {
  store = parent.store;
}

const functions = {
  simpleLine: () => {
    return new Promise(resolve => {
      chart = new dxChart(domContainer, {
        dataSource: dataSource,
        commonSeriesSettings: {
          argumentField: "argument",
          type: "line"
        },
        animation: {
          enabled: false
        },
        onDrawn: resolve,
        series: [{
          valueField: "value",
          name: "value",
          point: { visible: false }
        }]
      });
    });
  },
  simpleArea: () => {
    return new Promise(resolve => {
      chart = new dxChart(domContainer, {
        dataSource: dataSource,
        commonSeriesSettings: {
          argumentField: "argument",
          type: "area"
        },
        animation: {
          enabled: false
        },
        onDrawn: resolve,
        series: [{ valueField: "value", name: "value" }]
      });
    });
  },
  simpleBar: () => {
    return new Promise(resolve => {
      chart = new dxChart(domContainer, {
        dataSource: dataSource,
        commonSeriesSettings: {
          argumentField: "argument",
          type: "bar"
        },
        animation: {
          enabled: false
        },
        onDrawn: resolve,
        series: [{ valueField: "value", name: "value" }]
      });
    });
  }
};

function generateDataSource() {
  const count = parent.store.getState().points;
  return Array(count)
    .fill()
    .map((_, i) => {
      return {
        value: utils.randomNumner(0, count),
        argument: i
      };
    });
}

const domContainer = document.getElementById("chart");
const invoker = new Invoker();

invoker.beforeEach = () => {
  dataSource = generateDataSource();
};

invoker.afterEach1 = () => {
  chart.dispose();
  chart = null;
  domContainer.innerHTML = "";
};

store.getState().functions.forEach(f => {
  invoker
    .invoke(functions[f].bind(this), store.getState().experiments)
    .then(result => {
      store.dispatch({
        type: "dx_result",
        payload: {
          name: f,
          result
        }
      });
    });
});
