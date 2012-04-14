
htutil = require('./htutil.js');
math = require('./math.js');

exports.get = function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html' });
    res.end(
        htutil.page("Fibonacci", htutil.navbar(),
        [
            (!isNaN(req.a) 
                ? "<p>fibonacci({a}) = {result}</p>"
                    .replace(/{a}/g, req.a)
                    .replace(/{result}/g, math.fibonacci(Math.floor(req.a)))
                : ""),
            "<p>Enter the number to calculate fibonacci</p>",
            "<form>",
            "A: <input type='text' name='a'><br />",
            "<input type='submit' value='Submit'>",
            "</form>"
        ].join("\n"))
    );
}
