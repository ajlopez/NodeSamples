
htutil = require('./htutil.js');
math = require('./math.js');

function doGet(req, res, result) {
    res.writeHead(200, {'Content-Type': 'text/html' });
    res.end(
        htutil.page("Asynchronous Fibonacci", htutil.navbar(),
        [
            (!isNaN(req.a) 
                ? "<p>fibonacci({a}) = {result}</p>"
                    .replace(/{a}/g, req.a)
                    .replace(/{result}/g, result)
                : ""),
            "<p>Enter the number to calculate fibonacci</p>",
            "<form>",
            "A: <input type='text' name='a'><br />",
            "<input type='submit' value='Submit'>",
            "</form>"
        ].join("\n"))
    );
}

exports.get = function(req, res) {
    if (!isNaN(req.a))
        math.fibonacciAsync(Math.floor(req.a), function(result) {
            doGet(req, res, result);
        });
    else
        doGet(req, res, NaN);
}

