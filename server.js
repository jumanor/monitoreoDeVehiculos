var IPADDRESS="127.0.0.1";
var PORT=9095
var express = require('express');
var bodyParser = require('body-parser');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,x-access-token');
   
    next();
}

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(allowCrossDomain);

var server = app.listen(PORT,IPADDRESS);
console.log('Escuchando en '+IPADDRESS+':'+PORT);
////////////////////////////////////////////////////////////////////////////////////////////////////////
var SOCKET_MONITOR_ID=null;
var io = require('socket.io').listen(server);
io.on('connection', function (socket) {
	console.log('CONNECTED KEY: '+socket.id);
	
	socket.on("loginMonitor",function(data,response){
	   if(data.monitor="monitor"){	
		   SOCKET_MONITOR_ID=socket.id;
		   var info={id:socket.id};			   
		   response(info);
	   }	
	});
	socket.on("loginCliente",function(data,response){
		var info={id:socket.id};			   
		response(info);
	});	
	socket.on("posicionClientes", function(data) {
		console.log(data);
		if(SOCKET_MONITOR_ID!=null)
			io.sockets.connected[SOCKET_MONITOR_ID].emit('monitorPrincipal',data);
	});	
	socket.on("disconnect", function() {
		console.log('DISCONNECT key: '+socket.id);
	});
});
