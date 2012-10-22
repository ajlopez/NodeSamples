
function TicTacToeController(viewModel, board, game, socket)
{
    this.viewModel = viewModel;
    this.board = board;
    this.game = game;
    this.started = false;
    this.joined = false;
    this.socket = socket;

    var controller = this;

    this.board.onMove = function (x, y) { controller.onMove(x, y); };

    this.socket.emit('join', this.viewModel.gameId());
    this.socket.on('command', onNewCommand);
    this.joined = true;
	this.started = true;

    function onNewCommand(gameAction) {
        if (gameAction.Type != 1)
            return;
        
        var x = parseInt(gameAction.CommandData.x);
        var y = parseInt(gameAction.CommandData.y);
        var color = gameAction.CommandData.color;

        if (!controller.game.isValid(x, y, color))
            return;

        controller.game.move(x, y, color);
        controller.board.drawMove(x, y, color);
        controller.updateGameStatus();
    }
};

TicTacToeController.prototype.start = function () {
    if (this.viewModel.isOwner()) {
        this.viewModel.playerColor(TTTColor.Cross);
    }
    else {
        this.viewModel.playerColor(TTTColor.Circle);
    }
};

TicTacToeController.prototype.updateGameStatus = function () {
    if (this.game.isTie()) {
        this.viewModel.isTie(true);
        this.viewModel.currentColor(TTTColor.Empty);
    }
    else if (this.game.hasWinner()) {
        this.viewModel.winnerColor(this.game.getWinner());
        this.viewModel.currentColor(TTTColor.Empty);
    }
    else
        this.viewModel.currentColor(this.game.nextColor(this.viewModel.currentColor()));
};

TicTacToeController.prototype.onMove = function (x, y) {
    if (this.viewModel.playerColor() != this.viewModel.currentColor())
        return;

    var color = this.viewModel.playerColor();

    if (!this.game.isValid(x, y, color))
        return;

    this.game.move(x, y, color);
    this.board.drawMove(x, y, color);

    this.updateGameStatus();

    var action = { Type: 1, CommandData: { x: x, y: y, color: color }};
    var gameId = this.viewModel.gameId();

    this.socket.emit('command', action);
};

TicTacToeController.prototype.setGameId = function (gameId) {
    this.viewModel.gameId(gameId);
};

TicTacToeController.prototype.setIsOwner = function (isOwner) {
    this.viewModel.isOwner(isOwner);
};

