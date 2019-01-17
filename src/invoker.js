import "babel-polyfill";

class Invoker {
  constructor() {
    this.beforeEach = () => {};
    this.afterEach = () => {};
  }

  invoke(func, n) {
    let chain = Promise.resolve([]);
    const times = [];
    for (let i = 0; i < n; i++) {
      chain = chain
        .then(this.beforeEach)
        .then(() => {
          times.push({ start: performance.now() });
        })
        .then(func)
        .then(() => {
          times[times.length - 1].end = performance.now();
        })
        .then(this.afterEach);
    }

    return chain.then(() => {
      console.log(times);

      const results = times.map(item => item.end - item.start);

      return {
        rawResult: results,
        max: Math.max.apply(null, results).toFixed(2),
        min: Math.min.apply(null, results).toFixed(2),
        avg: (results.reduce((p, c) => p + c, 0) / results.length).toFixed(2)
      };
    });
  }
}

module.exports = Invoker;
