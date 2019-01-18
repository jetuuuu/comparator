import "babel-polyfill";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

const Invoker = require("../invoker");
const utils = require("../utils");

let store = window.store, chart;
if (utils.isIframe()) {
  store = parent.store;
}

const functions = {
  simpleLine: () => {
    return new Promise(resolve => {
        chart = am4core.create(domContainer, am4charts.XYChart);
        chart.events.on("ready", resolve);
        chart.data = dataSource;

        chart.xAxes.push(new am4charts.ValueAxis());
        chart.yAxes.push(new am4charts.ValueAxis());

        const series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "value";
        series.dataFields.valueX = "argument";
    });
  },
  simpleArea: () => {
    return new Promise(resolve => {
        chart = am4core.create(domContainer, am4charts.XYChart);
        chart.events.on("ready", resolve);
        chart.data = dataSource;

        chart.xAxes.push(new am4charts.ValueAxis());
        chart.yAxes.push(new am4charts.ValueAxis());

        const series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "value";
        series.dataFields.valueX = "argument";
        series.fillOpacity = 0.6;
    });
  },
  simpleBar: () => {
    return new Promise(resolve => {
        chart = am4core.create(domContainer, am4charts.XYChart);
        chart.events.on("ready", resolve);
        chart.data = dataSource;

        const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "argument";
        chart.yAxes.push(new am4charts.ValueAxis());

        const series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "value";
        series.dataFields.categoryX = "argument";
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
        type: "amcharts_result",
        payload: {
          name: f,
          result
        }
      });
    });
});
