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
      max: Math.max.apply(null, results),
      min: Math.min.apply(null, results),
      avg: results.reduce((p, c) => p + c, 0) / results.length
    };
  }
}

module.exports = Invoker;
