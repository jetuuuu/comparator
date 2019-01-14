class Invoker {
  constructor() {
    this.beforeEach = () => {};
    this.afterEach = () => {};
  }

  invoke(func, n) {
    const results = Array(n)
      .fill()
      .map((_, i) => {
        this.beforeEach();

        const start = performance.now();
        func();
        const end = performance.now();

        this.afterEach();

        return end - start;
      });

    return {
      rawResult: results,
      max: Math.max.apply(null, results).toFixed(2),
      min: Math.min.apply(null, results).toFixed(2),
      avg: (results.reduce((p, c) => p + c, 0) / results.length).toFixed(2)
    };
  }
}

module.exports = Invoker;
