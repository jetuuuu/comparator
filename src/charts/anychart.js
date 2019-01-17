import "babel-polyfill";
const anychart = require("anychart");
const Invoker = require("../invoker");
const utils = require("../utils");

let store,
    chart;
if (utils.isIframe()) {
  store = parent.store;
}

const functions = {
  simpleLine: () => {
    var dataSet = anychart.data.set();
    dataSet.data(dataSource);

    chart = anychart.line(dataSet);

    chart.container(domContainer);
    chart.draw();
  },
  simpleArea: () => {
    var dataSet = anychart.data.set();
    dataSet.data(dataSource);

    chart = anychart.area(dataSet);

    chart.container(domContainer);
    chart.draw();
  },
  simpleBar: () => {
    var dataSet = anychart.data.set();
    dataSet.data(dataSource);

    chart = anychart.bar(dataSet);

    chart.container(domContainer);
    chart.draw();
  }
};

function generateDataSource() {
  const count = store.getState().points;
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
let dataSource;

const invoker = new Invoker();

invoker.beforeEach = () => {
  dataSource = generateDataSource();
};
invoker.afterEach = () => {
  chart.dispose();
  chart = null;
  domContainer.innerHTML = "";
};

store.getState().functions.forEach(f => {
  const result = invoker.invoke(
    functions[f].bind(this),
    store.getState().experiments
  );
  store.dispatch({
    type: "anychart_result",
    payload: {
      name: f,
      result
    }
  });
});
