const $ = require("jquery");
const dxChart = require("devextreme/viz/chart");
const Invoker = require("./invoker");

function randomNumner(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const functions = {
  simpleLine: () => {
    new dxChart(this.domContainer, {
      dataSource: this.dataSource,
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
        value: randomNumner(0, count),
        argument: i
      };
    });
}

this.domContainer = document.getElementById("chart");

var invoker = new Invoker();

invoker.beforeEach = () => {
  this.dataSource = generateDataSource();
};
invoker.afterEach1 = () => {
  this.domContainer.innerHTML = "";
};
debugger;
parent.store.getState().functions.forEach(f => {
  const result = invoker.invoke(
    functions[f].bind(this),
    parent.store.getState().experiments
  );
  parent.store.dispatch({
    type: "dx_result",
    payload: {
      name: f,
      result
    }
  });
});