
function UserService(apiURL, blobURL, serverInterface) {
    this.serverInterface = serverInterface;
    this.blobURL = blobURL;
    this.apiURL = apiURL;
}

UserService.prototype.verify = function (success, error) {
    this.serverInterface.sendAjaxGet(this.apiURL + "user/verify", success, error);
};

UserService.prototype.getUser = function (userId, error) {
    this.serverInterface.sendAjaxJsonpGet(this.blobURL + "sgusers/" + userId + "?callback=?", "sgusersCallback", error);
};

