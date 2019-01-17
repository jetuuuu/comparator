import "babel-polyfill";

const dxChart = require("devextreme/viz/chart");
const Invoker = require("../invoker");
const utils = require("../utils");

let store;
if (utils.isIframe()) {
  store = parent.store;
}

const functions = {
  simpleLine: () => {
    new dxChart(domContainer, {
      dataSource: dataSource,
      commonSeriesSettings: {
        argumentField: "argument",
        type: "line"
      },
      series: [{ valueField: "value", name: "value" }]
    });
  },
  simpleArea: () => {
    new dxChart(this.domContainer, {
      dataSource: this.dataSource,
      commonSeriesSettings: {
        argumentField: "argument",
        type: "area"
      },
      series: [{ valueField: "value", name: "value" }]
    });
  },
  simpleBar: () => {
    new dxChart(this.domContainer, {
      dataSource: this.dataSource,
      commonSeriesSettings: {
        argumentField: "argument",
        type: "bar"
      },
      series: [{ valueField: "value", name: "value" }]
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

var invoker = new Invoker();
let dataSource;

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
    type: "dx_result",
    payload: {
      name: f,
      result
    }
  });
});
