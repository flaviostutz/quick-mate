// Load required modules
var http    = require("http");              // http server core module
var express = require("express");           // web framework external module
var serveStatic = require('serve-static');  // serve static files
var socketIo = require("socket.io");        // web socket external module

var easyrtc = require("../"); // EasyRTC internal module

// Set process name
process.title = "node-easyrtc";

// Setup and configure Express http server. Expect a subfolder called "static" to be the web root.
var app = express();
app.get('/room/*',function(req,res) {
    res.sendFile('/static/room.html', { root : __dirname});
});
app.get('/room',function(req,res) {
    res.sendFile('/static/room.html', { root : __dirname});
});
app.get('/join',function(req,res) {
    res.sendFile('/static/join.html', { root : __dirname});
});
app.use(serveStatic('static', {'index': ['index.html']}));

// Start Express http server on port 8080
var webServer = http.createServer(app);

// Start Socket.io so it attaches itself to Express server
var socketServer = socketIo.listen(webServer, {"log level":1});

easyrtc.setOption("logLevel", "debug");
easyrtc.setOption("roomDefaultEnable", false);

//ICE configuration
var appIceServers = []
if(process.env.STUN_HOST_PORT != "") {
    appIceServers.push({"url":"stun:" + process.env.STUN_HOST_PORT})
}
if(process.env.TURN_HOST_PORT != "") {
    appIceServers.push({
        "url":"turn:" + process.env.TURN_HOST_PORT,
        "username":process.env.TURN_USERNAME!=""?process.env.TURN_USERNAME:null,
        "credential":process.env.TURN_CREDENTIAL!=""?process.env.TURN_CREDENTIAL:null
    })
}
if(process.env.TURN_TCP_HOST_PORT != "") {
    appIceServers.push({
        "url":"turn:" + process.env.TURN_TCP_HOST_PORT + "[?transport=tcp]",
        "username":process.env.TURN_TCP_USERNAME!=""?process.env.TURN_TCP_USERNAME:null,
        "credential":process.env.TURN_TCP_CREDENTIAL!=""?process.env.TURN_TCP_CREDENTIAL:null
    })
}
console.log(JSON.stringify(appIceServers))
easyrtc.setOption("appIceServers", appIceServers);

// Overriding the default easyrtcAuth listener, only so we can directly access its callback
easyrtc.events.on("easyrtcAuth", function(socket, easyrtcid, msg, socketCallback, callback) {
    easyrtc.events.defaultListeners.easyrtcAuth(socket, easyrtcid, msg, socketCallback, function(err, connectionObj){
        if (err || !msg.msgData || !msg.msgData.credential || !connectionObj) {
            callback(err, connectionObj);
            return;
        }
        connectionObj.setField("credential", msg.msgData.credential, {"isShared":false});
        console.log("["+easyrtcid+"] Credential saved!", connectionObj.getFieldValueSync("credential"));
        callback(err, connectionObj);
    });
});

// To test, lets print the credential to the console for every room join!
easyrtc.events.on("roomJoin", function(connectionObj, roomName, roomParameter, callback) {
    console.log("roomJoin name=" + roomName + "; params=" + roomParameter)
    console.log("["+connectionObj.getEasyrtcid()+"] Credential retrieved!", connectionObj.getFieldValueSync("credential"));
    easyrtc.events.defaultListeners.roomJoin(connectionObj, roomName, roomParameter, callback);
});

// Start EasyRTC server
var rtc = easyrtc.listen(app, socketServer, null, function(err, rtcRef) {
    console.log("Initiated");
    rtcRef.events.on("roomCreate", function(appObj, creatorConnectionObj, roomName, roomOptions, callback) {
        console.log("roomCreate fired! Trying to create: " + roomName);
        appObj.events.defaultListeners.roomCreate(appObj, creatorConnectionObj, roomName, roomOptions, callback);
    });
    rtcRef.createApp(
        "quick-bate"
    );    
});

// Listen on port 8080
webServer.listen(8080, function () {
    console.log('Started EasyRTC server for Quick Mate on port :8080');
});
