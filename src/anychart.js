const anychart = require("anychart");
const $ = require("jquery");
const Invoker = require("./invoker");

function randomNumner(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const functions = {
  simpleLine: () => {
    var dataSet = anychart.data.set();

    dataSet.data(this.dataSource);

    // create line chart
    var chart = anychart.line(dataSet);

    // set container id for the chart
    chart.container(this.domContainer);
    // initiate chart drawing
    chart.draw();
  }
};

function generateDataSource() {
  const count = store.getState().points;
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
    type: "anychart_result",
    payload: {
      name: f,
      result
    }
  });
});
