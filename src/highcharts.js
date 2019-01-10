const $ = require("jquery");
const Highcharts = require("highcharts");
const Invoker = require("./invoker");

function randomNumner(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function simpleLine() {
  Highcharts.chart("chart", {
    series: [
      {
        data: this.dataSource
      }
    ]
  });
}

function generateDataSource() {
  return Array(10000)
    .fill()
    .map((_, i) => {
      return [i, randomNumner(0, 10000)];
    });
}

$(function() {
  this.domContainer = document.getElementById("chart");

  const invoker = new Invoker();

  invoker.beforeEach = () => {
    this.dataSource = generateDataSource();
  };
  invoker.afterEach = () => {
    this.domContainer.innerHTML = "";
  };

  const result = invoker.invoke(simpleLine.bind(this), 10);

  document.getElementById("results").innerHTML += `<p>highcharts; max: ${
    result.max
  }; min: ${result.min}; avg: ${result.avg}</p>`;
});
