class Invoker {
    constructor() {
        this.beforeEach = () => {};
        this.afterEach = () => {};
    }
    
    invoke(func, n) {
        return Array(n).fill().map((_, i) => {
            this.beforeEach();
            
            const start = performance.now();
            func();
            const end = performance.now();
    
            this.afterEach();
    
            return {
                number: i,
                duration: end - start
            };
        });
    }
}


module.exports = Invoker;