import "babel-polyfill";
const anychart = require("anychart");
const Invoker = require("../invoker");
const utils = require("../utils");

let store, chart;
if (utils.isIframe()) {
  store = parent.store;
}

const functions = {
  simpleLine: () => {
    return new Promise(resolve => {
      var dataSet = anychart.data.set();
      dataSet.data(dataSource);

      chart = anychart.line(dataSet);
      chart.container(domContainer);
      chart.listenOnce("chartDraw", resolve);
      chart.animation(false);

      chart.draw();
    });
  },
  simpleArea: () => {
    return new Promise(resolve => {
      var dataSet = anychart.data.set();
      dataSet.data(dataSource);

      chart = anychart.area(dataSet);
      chart.listenOnce("chartDraw", resolve);
      chart.animation(false);
      chart.container(domContainer);

      chart.draw();
    });
  },
  simpleBar: () => {
    return new Promise(resolve => {
      var dataSet = anychart.data.set();
      dataSet.data(dataSource);

      chart = anychart.bar(dataSet);
      chart.listenOnce("chartDraw", resolve);
      chart.animation(false);
      chart.container(domContainer);

      chart.draw();
    });
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
  invoker
    .invoke(functions[f].bind(this), store.getState().experiments)
    .then(result => {
      store.dispatch({
        type: "anychart_result",
        payload: {
          name: f,
          result
        }
      });
    });
});
