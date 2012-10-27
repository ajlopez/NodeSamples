
function ConnectFourBoard(canvas, width, height) {
    var board = this;
    this.canvas = canvas;
    this.width = width;
    this.height = height;

    canvas.onclick = function (e) {
        if (board.onMove == null)
            return;

        var width = board.canvas.width;
        var height = board.canvas.height;

        var position = board.getPosition(e);

        var clickX = position.x;
        var clickY = position.y;

        var y = Math.floor(clickY / (height / board.height));
        var x = Math.floor(clickX / (width / board.width));

        board.onMove(x);
    };

    this.draw();
};

ConnectFourBoard.prototype.getPosition = function (e) {
    if (e.offsetX != undefined && e.offsetY != undefined) {
        return { x: e.offsetX, y: e.offsetY };
    }

    var x;
    var y;

    if (e.x != undefined && e.y != undefined) {
        x = e.x;
        y = e.y;
    }
    else {
        x = e.clientX + document.body.scrollLeft +
              document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop +
              document.documentElement.scrollTop;
    }

    x -= this.canvas.offsetLeft;
    y -= this.canvas.offsetTop;

    return { x: x, y: y };
};

ConnectFourBoard.prototype.draw = function () {
    var width = this.canvas.width;
    var height = this.canvas.height;
    var context = this.canvas.getContext("2d");

    context.fillStyle = 'White';
    context.fillRect(0, 0, width, height);

    context.beginPath();
    context.lineWidth = 4;

    for (var x = 1; x < this.width; x++) {
        context.moveTo((width / this.width) * x, 0);
        context.lineTo((width / this.width) * x, height);
    }

    context.stroke();
    context.closePath();
};

ConnectFourBoard.prototype.drawMove = function (x, y, color) {
    if (color == C4Color.Cross)
        this.drawX(x, y);
    if (color == C4Color.Circle)
        this.drawO(x, y);
};

ConnectFourBoard.prototype.drawX = function (x, y) {
    var width = this.canvas.width;
    var height = this.canvas.height;
    var context = this.canvas.getContext("2d");

    context.beginPath();
    context.strokeStyle = "#0000ff";
    context.lineWidth = 4;

    var offsetX = (width / this.width) * 0.1;
    var offsetY = (height / this.height) * 0.1;

    var beginX = x * (width / this.width) + offsetX;
    var beginY = y * (height / this.height) + offsetY;

    var endX = (x + 1) * (width / this.width) - offsetX;
    var endY = (y + 1) * (height / this.height) - offsetY;

    context.moveTo(beginX, beginY);
    context.lineTo(endX, endY);

    context.moveTo(beginX, endY);
    context.lineTo(endX, beginY);

    context.stroke();
    context.closePath();
};

ConnectFourBoard.prototype.drawO = function (x, y) {
    var width = this.canvas.width;
    var height = this.canvas.height;
    var context = this.canvas.getContext("2d");

    context.beginPath();
    context.strokeStyle = '#00ff00';
    context.lineWidth = 4;

    var offsetX = (width / this.width) * 0.1;
    var offsetY = (height / this.height) * 0.1;

    var beginX = x * (width / this.width) + offsetX;
    var beginY = y * (height / this.height) + offsetY;

    var endX = (x + 1) * (width / this.width) - offsetX;
    var endY = (y + 1) * (height / this.height) - offsetY;

    context.arc(beginX + ((endX - beginX) / 2), beginY + ((endY - beginY) / 2), (endX - beginX) / 2, 0, Math.PI * 2, true);

    context.stroke();
    context.closePath();
};

