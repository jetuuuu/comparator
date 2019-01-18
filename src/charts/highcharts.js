import "babel-polyfill";

const Highcharts = require("highcharts");
const Invoker = require("../invoker");
const utils = require("../utils");

let store, chart;
if (utils.isIframe()) {
  store = parent.store;
}

Highcharts.setOptions({
  plotOptions: {
      area: { animation: false, enableMouseTracking: false, stickyTracking: true, shadow: false, dataLabels: { style: { textShadow: false } } },
      bar: { animation: false, enableMouseTracking: false, stickyTracking: true, shadow: false, dataLabels: { style: { textShadow: false } } },
      column: { animation: false, enableMouseTracking: false, stickyTracking: true, shadow: false, dataLabels: { style: { textShadow: false } } },
      line: { animation: false, enableMouseTracking: false, stickyTracking: true, shadow: false, dataLabels: { style: { textShadow: false } } }
  },
  chart: {
      reflow: false,
      animation: false
  },
  tooltip: {
      enabled: false,
      animation: false
  },
  exporting: {
      enabled:false
  },
  credits: {
      enabled: false
  }
});

const functions = {
  simpleLine: () => {
    return new Promise(resolve => {
      chart = Highcharts.chart("chart", {
        chart: {
          type: "line",
          animation: false,
          events: {
            load: resolve
          }
        },
        tooltip: {
          enabled: false,
          animation: false
      },
        title: {
          text: undefined
        },
        plotOptions: {
          series: {
              animation: false
          }
      },
        series: [
          {
            data: dataSource,
            label: {
              enabled: false
            },
            showInLegend: false
          }
        ],
        yAxis: [{
          gridLineWidth: 0,
          minorGridLineWidth: 0 }]
      });
    });
  },
  simpleArea: () => {
    return new Promise(resolve => {
      chart = Highcharts.chart("chart", {
        chart: {
          type: "area",
          animation: false,
          events: {
            load: resolve
          }
        },
        series: [
          {
            data: dataSource
          }
        ]
      });
    });
  },
  simpleBar: () => {
    return new Promise(resolve => {
      chart = Highcharts.chart("chart", {
        chart: {
          type: "bar",
          animation: false,
          events: {
            load: resolve
          }
        },
        series: [
          {
            data: dataSource
          }
        ]
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
let dataSource;

const invoker = new Invoker();

invoker.beforeEach = () => {
  dataSource = generateDataSource();
};

invoker.afterEach = () => {
  chart.destroy();
  chart = null;
  domContainer.innerHTML = "";
};

store.getState().functions.forEach(f => {
  invoker
    .invoke(functions[f].bind(this), store.getState().experiments)
    .then(result => {
      store.dispatch({
        type: "highcharts_result",
        payload: {
          name: f,
          result
        }
      });
    });
});
