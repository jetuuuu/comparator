const $ = require("jquery");
const Highcharts = require("highcharts");
const Invoker = require("./invoker");

function randomNumner(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
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
      }
};

function generateDataSource() {
  return Array(10000)
    .fill()
    .map((_, i) => {
      return  randomNumner(0, 10000);
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
    const result = invoker.invoke(functions[f].bind(this), 10);
    store.dispatch({
        type: "highcharts_result",
        payload: {
            name: f,
            result,
        }
    });
  });