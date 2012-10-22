
function ServerInterface() {
}

ServerInterface.prototype.onAjaxGetError = function (req, status, error) {
    var errorMessage;

    if (req.responseText == undefined) {
        errorMessage = "GET Error:\nreq:" + req + "\nstatus:" + status + "\nerror:" + error;
    }
    else {
        errorMessage = "GET Error:\nreq:" + req.responseText + "\nstatus:" + status + "\nerror:" + error;
    }

    alert(errorMessage);
};

ServerInterface.prototype.onAjaxPostError = function (req, status, error) {
    var errorMessage;

    if (req.responseText == undefined) {
        errorMessage = "POST Error:\nreq:" + req + "\nstatus:" + status + "\nerror:" + error;
    }
    else {
        errorMessage = "POST Error:\nreq:" + req.responseText + "\nstatus:" + status + "\nerror:" + error;
    }

    alert(errorMessage);
};

ServerInterface.prototype.sendAjaxJsonCommand = function (type, url, data, success, error) {
    $.ajax({
        type: type,
        url: url,
        dataType: "json",
        data: data,
        success: success,
        error: (error != null ? error : this.onAjaxPostError)
    });
};

ServerInterface.prototype.sendAjaxCommand = function (type, url, data, success, error) {
    $.ajax({
        type: type,
        url: url,
        data: data,
        success: success,
        error: (error != null ? error : this.onAjaxPostError)
    });
};

ServerInterface.prototype.sendAjaxJsonPost = function (url, data, success, error) {
    this.sendAjaxJsonCommand("POST", url, data, success, error);
};

ServerInterface.prototype.sendAjaxPost = function (url, data, success, error) {
    this.sendAjaxCommand("POST", url, data, success, error);
};

ServerInterface.prototype.sendAjaxJsonGet = function (url, data, success, error) {
    this.sendAjaxJsonCommand("GET", url, data, success, error);
};

ServerInterface.prototype.sendAjaxJsonpGet = function (url, callback, error) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: "jsonp",
        jsonpCallback: callback,
        error: (error != null ? error : this.onAjaxGetError)
    });
};
ServerInterface.prototype.sendAjaxJsonpGetFailingSilently = function (url, callback) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: "jsonp",
        jsonpCallback: callback
    });
};

ServerInterface.prototype.sendAjaxJsonCommand = function (type, url, data, success, error) {
    $.ajax({
        type: type,
        url: url,
        dataType: "json",
        data: data,
        success: success,
        error: (error != null ? error : this.onAjaxPostError)
    });
};

ServerInterface.prototype.sendAjaxCommand = function (type, url, data, success, error) {
    $.ajax({
        type: type,
        url: url,
        data: data,
        success: success,
        error: (error != null ? error : this.onAjaxPostError)
    });
};

ServerInterface.prototype.sendAjaxJsonPost = function (url, data, success, error) {
    this.sendAjaxJsonCommand("POST", url, data, success, error);
};

ServerInterface.prototype.sendAjaxPost = function (url, data, success, error) {
    this.sendAjaxCommand("POST", url, data, success, error);
};

ServerInterface.prototype.sendAjaxGet = function (url, success, error) {
    this.sendAjaxCommand("GET", url, null, success, error);
};

ServerInterface.prototype.sendAjaxJsonGet = function (url, data, success, error) {
    this.sendAjaxJsonCommand("GET", url, data, success, error);
};

ServerInterface.prototype.sendAjaxJsonpGet = function (url, callback, error) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: "jsonp",
        jsonpCallback: callback,
        error: (error != null ? error : this.onAjaxGetError)
    });
};

ServerInterface.prototype.sendAjaxJsonpGetFailingSilently = function (url, callback) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: "jsonp",
        jsonpCallback: callback
    });
};
