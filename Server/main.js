// backend web server
// Author Jaime Fanjul García
// Date: 20/08/2020
// SocketIO 

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var server = require('http').Server(app);
var io = require('socket.io')(server);



// a la variable app que es la que contiene express
// le pasamos la ruta estatica de donde está la parte
// del frontend para que la use
app.use(express.static('public'));


// ahora creo el web socket que se comunica en tiempo real con
// el FrontEND y manda la info recibida
io.on('connection', function(socket) {
  console.log('FrontEND se ha conectado con Sockets');
  socket.on('telemetria_data', function(data) {
   console.log(data);
   io.sockets.emit('telemetriaInfo', data);
  });
});

// una vez iniciadas las variables requeridas ponemos el servidor a la escucha
// en el puerto 8080
server.listen(8080, function() {
	console.log('Servidor corriendo en http://localhost:8080');
});
