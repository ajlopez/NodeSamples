
var factorial = exports.factorial = function(n) {
    if (n == 0)
        return 1;
    else
        return n * factorial(n-1);
};


var fibonacci = exports.fibonacci = function(n) {
    if (n == 1)
        return 1;
    else if (n == 2)
        return 1;
    else
        return fibonacci(n-1) + fibonacci(n-2);
};

var fibonacciAsync = exports.fibonacciAsync = function(n, done) {
    if (n == 1 || n == 2)
        done(1);
    else {
        process.nextTick(function() {
            fibonacciAsync(n - 1, function(val1) {
                process.nextTick(function() {
                    fibonacciAsync(n - 2, function(val2) {
                        done(val1+val2);
                    });
                });
            });
        });
    }
}

