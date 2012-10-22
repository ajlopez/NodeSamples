
function GameService(apiURL, blobURL, serverInterface) {
    this.serverInterface = serverInterface;
    this.blobURL = blobURL;
    this.apiURL = apiURL;
}

GameService.prototype.createGameQueue = function (success, error) {
    this.serverInterface.sendAjaxPost(this.apiURL + "game/create", { gameType: "invitation" }, success, error);
};

GameService.prototype.joinGameQueue = function (queueId, success, error) {
    this.serverInterface.sendAjaxPost(this.apiURL + "game/join/" + queueId, { gameType: "invitation" }, success, error);
};

GameService.prototype.startGame = function (queueId, success, error) {
    this.serverInterface.sendAjaxPost(this.apiURL + "game/start/" + queueId, { gameType: "invitation" }, success, error);
};

GameService.prototype.sendGameAction = function (gameId, action, success, error) {
    this.serverInterface.sendAjaxPost(this.apiURL + "game/command/" + gameId, action, success, error);
};

GameService.prototype.getGameQueueStatus = function (queueId, error) {
    this.serverInterface.sendAjaxJsonpGet(this.blobURL + "sggamesqueues/" + queueId + "?callback=?", "sggamesqueuesCallback", error);
};

GameService.prototype.getGameStatus = function (gameId, error) {
    this.serverInterface.sendAjaxJsonpGet(this.blobURL + "sggames/" + gameId + "?callback=?", "sggamesCallback", error);
};