
function ConnectFourViewModel() {
    this.playerName = ko.observable("user");
    this.isOwner = ko.observable(false);
    this.players = ko.observableArray();

    this.gameQueueId = ko.observable(null);
    this.gameId = ko.observable(null);

    this.noPlayers = ko.observable(0);
    this.inviteURL = ko.observable(null);

    this.playerColor = ko.observable(C4Color.Empty);
    this.winnerColor = ko.observable(C4Color.Empty);
    this.currentColor = ko.observable(C4Color.Cross);
    this.isTie = ko.observable(false);
}



