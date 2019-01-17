const Highcharts = require("highcharts");
const Invoker = require("./invoker");
const utils = require("./utils");

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
          data: this.dataSource
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
          data: this.dataSource
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
          data: this.dataSource
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

this.domContainer = document.getElementById("chart");

const invoker = new Invoker();

invoker.beforeEach = () => {
  this.dataSource = generateDataSource();
};

invoker.afterEach = () => {
  this.domContainer.innerHTML = "";
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
