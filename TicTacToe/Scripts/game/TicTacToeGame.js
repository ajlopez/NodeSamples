
TTTColor = { Empty: 0, Cross: 1, Circle: 2 };

function TicTacToeGame() {
    this.board = [
     [TTTColor.Empty, TTTColor.Empty, TTTColor.Empty],
     [TTTColor.Empty, TTTColor.Empty, TTTColor.Empty],
     [TTTColor.Empty, TTTColor.Empty, TTTColor.Empty]
     ];
}

TicTacToeGame.prototype.move = function (x, y, color) {
    this.board[x][y] = color;
};

TicTacToeGame.prototype.isEmpty = function (x, y) {
    return this.board[x][y] == TTTColor.Empty;
};

TicTacToeGame.prototype.getColor = function (x, y) {
    return this.board[x][y];
};

TicTacToeGame.prototype.isValid = function (x, y, color) {
    return this.isEmpty(x, y);
};

TicTacToeGame.prototype.nextColor = function (color) {
    if (color == TTTColor.Cross)
        return TTTColor.Circle;
    if (color == TTTColor.Circle)
        return TTTColor.Cross;
    return TTTColor.Empty;
};

TicTacToeGame.prototype.isTie = function () {
    if (this.hasWinner())
        return false;

    for (var x = 0; x < 3; x++)
        for (var y = 0; y < 3; y++)
            if (this.board[x][y] == TTTColor.Empty)
                return false;

    return true;
};

TicTacToeGame.prototype.hasWinner = function () {
    return this.getWinner() != TTTColor.Empty;
};

TicTacToeGame.prototype.getWinner = function () {
    var winner;

    for (var row = 0; row < 3; row++) {
        winner = inRow(this, row, 0, 0, 1);
        if (winner != TTTColor.Empty)
            return winner;
        winner = inRow(this, 0, row, 1, 0);
        if (winner != TTTColor.Empty)
            return winner;
    }

    winner = inRow(this, 0, 0, 1, 1);
    if (winner != TTTColor.Empty)
        return winner;

    winner = inRow(this, 2, 0, -1, 1);

    return winner;

    function inRow(game, x, y, dx, dy) {
        var color = game.getColor(x, y);

        for (var k = 1; k < 3; k++)
            if (game.getColor(x + dx * k, y + dy * k) !== color)
                return TTTColor.Empty;

        return color;
    }
};

