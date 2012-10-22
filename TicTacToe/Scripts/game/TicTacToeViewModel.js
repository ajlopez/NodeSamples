
function TicTacToeViewModel() {
    this.isOwner = ko.observable(false);
    this.gameId = ko.observable(null);

    this.playerColor = ko.observable(TTTColor.Empty);
    this.winnerColor = ko.observable(TTTColor.Empty);
    this.currentColor = ko.observable(TTTColor.Cross);
    this.isTie = ko.observable(false);
}



