
C4Color = { Empty: 0, Cross: 1, Circle: 2 };

function ConnectFourGame(width, height) {
    this.width = width;
    this.height = height;

    this.board = [];

    for (var x = 0; x < width; x++) {
        var column = [];

        for (var y = 0; y < height; y++) {
            column.push(C4Color.Empty);
        }

        this.board.push(column);
    }
}

ConnectFourGame.prototype.move = function (x, color) {
    for (var y = 0; y < this.height; y++)
        if (this.board[x][y] != C4Color.Empty)
            break;

    this.board[x][y - 1] = color;

    return y - 1;
};

ConnectFourGame.prototype.isEmpty = function (x, y) {
    return this.board[x][y] == C4Color.Empty;
};

ConnectFourGame.prototype.getColor = function (x, y) {
    return this.board[x][y];
};

ConnectFourGame.prototype.isValid = function (x, color) {
    return this.isEmpty(x, 0);
};

ConnectFourGame.prototype.nextColor = function (color) {
    if (color == C4Color.Cross)
        return C4Color.Circle;
    if (color == C4Color.Circle)
        return C4Color.Cross;
    return C4Color.Empty;
};

ConnectFourGame.prototype.isTie = function () {
    if (this.hasWinner())
        return false;

    for (var x = 0; x < this.width; x++)
        for (var y = 0; y < this.height; y++)
            if (this.board[x][y] == C4Color.Empty)
                return false;

    return true;
};

ConnectFourGame.prototype.hasWinner = function () {
    return this.getWinner() != C4Color.Empty;
};

ConnectFourGame.prototype.getWinner = function () {
    var winner;
    var x;
    var y;

    for (x = 0; x < this.width - 4; x++) {
        for (y = 0; y < this.height; y++) {
            winner = inRow(this, x, y, 1, 0);
            if (winner != C4Color.Empty)
                return winner;
        }
    }

    for (x = 0; x < this.width - 4; x++) {
        for (y = 0; y < this.height - 4; y++) {
            winner = inRow(this, x, y, 1, 1);
            if (winner != C4Color.Empty)
                return winner;
        }
    }

    for (x = 0; x < this.width; x++) {
        for (y = 0; y < this.height - 4; y++) {
            winner = inRow(this, x, y, 0, 1);
            if (winner != C4Color.Empty)
                return winner;
        }
    }

    for (x = 4; x < this.width; x++) {
        for (y = 4; y < this.height; y++) {
            winner = inRow(this, x, y, -1, -1);
            if (winner != C4Color.Empty)
                return winner;
        }
    }

    return C4Color.Empty;

    function inRow(game, x, y, dx, dy) {
        var color = game.getColor(x, y);

        for (var k = 1; k < 4; k++)
            if (game.getColor(x + dx * k, y + dy * k) !== color)
                return C4Color.Empty;

        return color;
    }
};

