
function TicTacToeBoard(canvas) {
    var board = this;
    this.canvas = canvas;

    canvas.onclick = function (e) {
        if (board.onMove == null)
            return;

        var width = board.canvas.width;
        var height = board.canvas.height;

        var position = board.getPosition(e);

        var clickX = position.x;
        var clickY = position.y;

        var y = Math.floor(clickY / (height / 3));
        var x = Math.floor(clickX / (width / 3));

        board.onMove(x, y);
    };

    this.draw();
};

TicTacToeBoard.prototype.getPosition = function (e) {
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

TicTacToeBoard.prototype.draw = function () {
    var width = this.canvas.width;
    var height = this.canvas.height;
    var context = this.canvas.getContext("2d");

    context.fillStyle = 'White';
    context.fillRect(0, 0, width, height);

    context.beginPath();
    context.lineWidth = 4;

    context.moveTo((width / 3), 0);
    context.lineTo((width / 3), height);
    context.moveTo((width / 3) * 2, 0);
    context.lineTo((width / 3) * 2, height);

    context.moveTo(0, (height / 3));
    context.lineTo(width, (height / 3));
    context.moveTo(0, (height / 3) * 2);
    context.lineTo(width, (height / 3) * 2);

    context.stroke();
    context.closePath();
};

TicTacToeBoard.prototype.drawMove = function (x, y, color) {
    if (color == TTTColor.Cross)
        this.drawX(x, y);
    if (color == TTTColor.Circle)
        this.drawO(x, y);
};

TicTacToeBoard.prototype.drawX = function (x, y) {
    var width = this.canvas.width;
    var height = this.canvas.height;
    var context = this.canvas.getContext("2d");

    context.beginPath();
    context.strokeStyle = "#0000ff";
    context.lineWidth = 4;

    var offsetX = (width / 3) * 0.1;
    var offsetY = (height / 3) * 0.1;

    var beginX = x * (width / 3) + offsetX;
    var beginY = y * (height / 3) + offsetY;

    var endX = (x + 1) * (width / 3) - offsetX;
    var endY = (y + 1) * (height / 3) - offsetY;

    context.moveTo(beginX, beginY);
    context.lineTo(endX, endY);

    context.moveTo(beginX, endY);
    context.lineTo(endX, beginY);

    context.stroke();
    context.closePath();
};

TicTacToeBoard.prototype.drawO = function (x, y) {
    var width = this.canvas.width;
    var height = this.canvas.height;
    var context = this.canvas.getContext("2d");

    context.beginPath();
    context.strokeStyle = '#00ff00';
    context.lineWidth = 4;

    var offsetX = (width / 3) * 0.1;
    var offsetY = (height / 3) * 0.1;

    var beginX = x * (width / 3) + offsetX;
    var beginY = y * (height / 3) + offsetY;

    var endX = (x + 1) * (width / 3) - offsetX;
    var endY = (y + 1) * (height / 3) - offsetY;

    context.arc(beginX + ((endX - beginX) / 2), beginY + ((endY - beginY) / 2), (endX - beginX) / 2, 0, Math.PI * 2, true);

    context.stroke();
    context.closePath();
};

