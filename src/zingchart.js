const zingchart = require("zingchart");
const Invoker = require("./invoker");

function randomNumner(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const functions = {
  simpleLine: () => {
    zingchart.render({
      id: "chart",
      data: {
        type: "line",
        series: [
          {
            values: generateDataSource()
          }
        ]
      }
    });
  },
  simpleArea: () => {
    zingchart.render({
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
    zingchart.render({
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
    .map((_, i) => {
      return randomNumner(0, count);
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
    type: "zingchart_result",
    payload: {
      name: f,
      result
    }
  });
});
