
htutil = require('./htutil.js');

exports.get = function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html' });
    res.end(
        htutil.page("Square", htutil.navbar(),
        [
            (!isNaN(req.a) 
                ? "<p>{a} * {a} = {result}</p>"
                    .replace(/{a}/g, req.a)
                    .replace(/{result}/g, req.a * req.a)
                : ""),
            "<p>Enter the number to square</p>",
            "<form>",
            "A: <input type='text' name='a'><br />",
            "<input type='submit' value='Submit'>",
            "</form>"
        ].join("\n"))
    );
}
