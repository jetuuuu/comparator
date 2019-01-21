import "babel-polyfill";

const kendo = require("@progress/kendo-ui");
const Invoker = require("../invoker");
const utils = require("../utils");

let store, dataSource, chart;

if (utils.isIframe()) {
  store = parent.store;
}

const functions = {
  simpleLine: () => {
    return new Promise(resolve => {
      chart = kendo.jQuery(domContainer).kendoChart({
        seriesDefaults: {
            type: "line"
        },
        series: [{
            data: dataSource
        }],
        render: resolve
      });
    });
  },
  simpleArea: () => {
    return new Promise(resolve => {
      chart = kendo.jQuery(domContainer).kendoChart({
        seriesDefaults: {
            type: "area"
        },
        series: [{
            data: dataSource
        }],
        render: resolve
      });
    });
  },
  simpleBar: () => {
    return new Promise(resolve => {
      chart = kendo.jQuery(domContainer).kendoChart({
        seriesDefaults: {
            type: "bar"
        },
        series: [{
            data: dataSource
        }],
        render: resolve
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
const invoker = new Invoker();

invoker.beforeEach = () => {
  dataSource = generateDataSource();
};

invoker.afterEach = () => {
  kendo.jQuery(domContainer).data("kendoChart").destroy;
  chart = null;
  domContainer.innerHTML = "";
};

store.getState().functions.forEach(f => {
  invoker
    .invoke(functions[f].bind(this), store.getState().experiments)
    .then(result => {
      store.dispatch({
        type: "kendo_result",
        payload: {
          name: f,
          result
        }
      });
    });
});
