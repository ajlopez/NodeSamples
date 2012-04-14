
htutil = require('./htutil.js');

exports.get = function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html' });
    res.end(
        htutil.page("Multiply", htutil.navbar(),
        [
            (!isNaN(req.a) && !isNaN(req.b)
                ? "<p>{a} * {b} = {result}</p>"
                    .replace(/{a}/g, req.a)
                    .replace(/{b}/g, req.b)
                    .replace(/{result}/g, req.a * req.b)
                : ""),
            "<p>Enter the numbers to multiply</p>",
            "<form>",
            "A: <input type='text' name='a'><br />",
            "B: <input type='text' name='b'><br />",
            "<input type='submit' value='Submit'>",
            "</form>"
        ].join("\n"))
    );
}
