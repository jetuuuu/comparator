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

    var chart = anychart.line(dataSet);

    chart.container(this.domContainer);
    chart.draw();
  },
  simpleArea: () => {
    var dataSet = anychart.data.set();

    dataSet.data(this.dataSource);

    var chart = anychart.area(dataSet);

    chart.container(this.domContainer);
    chart.draw();
  },
  simpleBar: () => {
    var dataSet = anychart.data.set();

    dataSet.data(this.dataSource);

    var chart = anychart.bar(dataSet);

    chart.container(this.domContainer);
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
