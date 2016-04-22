var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;
var url = 'localhost'
var server = app.listen(port);
var io = require("socket.io").listen(server);


app.use(express.static(__dirname + ''));
app.use('/inside',express.static(__dirname + ''));
console.log('Simple static server listening at '+url+':'+port);

var Xval;
var Yval;
var Zval;
var accelerationX;

// ondevicemotion = function(event){
// 	accelerationX = event.accelerationIncludingGravity.x;
// }

io.sockets.on('connection', function (socket){
	//console.log("hey 1");
	socket.on('toScreen', function (data){
		Xval = data.xVal;
		Yval = data.yVal;
		Zval = data.zVal;
		//console.log(data);
		//console.log(data);
		// console.log("hey");

		// socket.emit('toConsole', {x:Xval})
	})
    var interval = setInterval(function () {
        socket.emit('toConsole', {x:Xval, y:Yval, z:Zval});
    }, 100);
	// socket.emit('toConsole', {x:Xval})
});


//getRemoteSocketAddress().toString();


