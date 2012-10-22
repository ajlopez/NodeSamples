
function TicTacToeController(viewModel, gameService, board, game)
{
    this.viewModel = viewModel;
    this.gameService = gameService;
    this.board = board;
    this.game = game;
    this.started = false;

    var controller = this;

    this.board.onMove = function (x, y) { controller.onMove(x, y); };

    window.sggamesqueuesCallback = onGameQueueStatus;
    window.sggamesCallback = onGameStatus;

    function onGameQueueStatus(gameQueue) {
        try {
            controller.viewModel.players(gameQueue.Users);
            controller.viewModel.noPlayers(gameQueue.Users.length);

            if (gameQueue.GameId != null && gameQueue.GameId != nullGameId) {
                controller.viewModel.gameId(gameQueue.GameId);
            }

            if (controller.viewModel.gameId() == null && controller.viewModel.isOwner() && gameQueue.Users.length == 2 && !this.started) {
                controller.gameService.startGame(controller.viewModel.gameQueueId());
                this.started = true;
            }
        }
        finally {
            controller.setTimer();
        }
    }

    function onGameStatus(game) {
        try {
            for (var n in game.GameActions) {
                var gameAction = game.GameActions[n];
                if (gameAction.Type != 1)
                    continue;

                var x = parseInt(gameAction.CommandData.x);
                var y = parseInt(gameAction.CommandData.y);
                var color = gameAction.CommandData.color;

                if (!controller.game.isValid(x, y, color))
                    continue;

                controller.game.move(x, y, color);
                controller.board.drawMove(x, y, color);

                controller.updateGameStatus();
            }
        }
        finally {
            controller.setTimer();
        }
    }
};

TicTacToeController.prototype.start = function () {
    if (this.viewModel.gameQueueId() != null) {
        this.viewModel.playerColor(TTTColor.Cross);
        this.gameService.joinGameQueue(gameQueueId, function (data) { });
    }
    else {
        this.viewModel.playerColor(TTTColor.Circle);
        var controller = this;
        this.gameService.createGameQueue(function (data) {
            controller.viewModel.isOwner(true);
            controller.setGameQueueId(data);
            controller.viewModel.inviteURL(document.location.href + "?id=" + data);
        });
    }

    this.refresh();
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

    var action = { type: 1, commandData: { x: x, y: y, color: color} };
    var gameId = this.viewModel.gameId();

    this.gameService.sendGameAction(gameId, action);
};

TicTacToeController.prototype.refresh = function () {
    var controller = this;

    if (this.viewModel.gameId() != null)
        this.gameService.getGameStatus(this.viewModel.gameId(), function (req, status, error) { controller.setTimer(); });
    else if (this.viewModel.gameQueueId() != null)
        this.gameService.getGameQueueStatus(this.viewModel.gameQueueId(), function (req, status, error) { controller.setTimer(); });
    else
        this.setLongTimer();
};

TicTacToeController.prototype.setTimer = function () {
    var controller = this;
    setTimeout(function () { controller.refresh(); }, 300);
};

TicTacToeController.prototype.setLongTimer = function () {
    var controller = this;
    setTimeout(function () { controller.refresh(); }, 1000);
};

TicTacToeController.prototype.setGameQueueId = function (gameQueueId) {
    this.viewModel.gameQueueId(gameQueueId);
};

