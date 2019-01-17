import "babel-polyfill";

const zingchart = require("zingchart");
const Invoker = require("../invoker");
const utils = require("../utils");

let store,
    chart;
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
            values: generateDataSource()
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
    chart = zingchart.render({
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
    chart = zingchart.render({
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

const invoker = new Invoker();

invoker.afterEach = () => {
  chart.destroy();
  chart = null;
  domContainer.innerHTML = "";
};

store.getState().functions.forEach(f => {
  invoker.invoke(
    functions[f].bind(this),
    store.getState().experiments
  ).then(result => {
    store.dispatch({
      type: "zingchart_result",
      payload: {
        name: f,
        result
      }
    });
  })

});
