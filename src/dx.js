const $ = require("jquery");
const dxChart = require('devextreme/viz/chart');
const Invoker = require("./invoker");

function randomNumner(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function simpleLine() {
    new dxChart(this.domContainer, {
        dataSource: this.dataSource,
        commonSeriesSettings: {
            argumentField: "argument",
            type: "line"
        },
        series: [
            { valueField: "value", name: "value" },
        ],
        title: { 
            text: "Energy Consumption in 2004",
        }
    });
}

function generateDataSource() {
    return Array(10000).fill().map((_, i) => {
        return {
            value: i,
            argument: randomNumner(0, 10000)
        }
    });
}

$(function(){

    this.domContainer = document.getElementById("chart");

    const invoker = new Invoker();

    invoker.beforeEach = () => {
        this.dataSource = generateDataSource();
    }
    invoker.afterEach = () => {
        this.domContainer.innerHTML = "";
    };

    const result = invoker.invoke(simpleLine.bind(this), 10);
    console.log(result);
});