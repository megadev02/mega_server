// almacena los socket ids
var BaseToSocket = new Object(); //clave:base, value:socket
var SocketToBase = new Object(); //clave:socket, value:base

var io = require('socket.io').listen(84);
var OficinasDAO = require('./Oficinas').OficinasDAO;
var TransferenciasDAO = require('./Transferencias').TransferenciasDAO;

io.sockets.on('connection', function(client){

    var Transferencias = new TransferenciasDAO();
	var Oficinas = new OficinasDAO();

	client.on('disconnect', function () {
        console.log('La oficina '+ SocketToBase[client.id] + ' se desconectó');
    	io.emit('oficinaDesconectada', {'oficinaDesconectada': SocketToBase[client.id]});
    });

	client.on('nameclient', function (name) {
	
        console.log(name,' acaba de conectarse!');

        client.username = name;

        // almacenar el id del socket con el nombre como clave
        BaseToSocket[name] = client.id;
        SocketToBase[client.id] = name;

        // obtener todas los sockets conectados
        //var onlines = io.sockets.clients();


        // notificar a la base entrante sobre las bases que estan conectadas
//        onlines.forEach(function(online){
//            var base = SocketToBase[online.id];
//            if (base != name) //envía todas las bases conectadas menos a si mismo
//                client.emit('base_online', {'BaseOnline':base});
//        });
        var myArray = io.sockets.sockets.map(function(e) { return e.username; });
        myArray.forEach(function(c){
            client.emit('base_online', {'BaseOnline':c});
        });

        // enviar inicio de sesion a las demas bases conectadas menos a quien la invocó
        //var base_online = {'BaseOnline':name};
        //client.broadcast.emit('base_online', base_online);
  	});

  	client.on('msgOficina', function(msgOficina){
		// decodificar el mensaje
		var msgJson = JSON.parse(msgOficina);
        var oficina = msgJson.Oficina;
		
		//envía el mensaje a una base que no recibio el ok
		//io.sockets.socket(BaseToSocket[to]).emit("creaOficina", oficina);

        console.log('Nueva oficina '+oficina.NombreOficina+' fue reportada a todas las oficinas.');
        client.broadcast.emit('msgOficina', msgOficina);
  	});

//  	client.on('clientNuevaBaseOk', function(msgNuevaBaseOk){
//  		Oficinas.ConfirmaEntregaMsg(msgNuevaBaseOk, function(error, result){
//  			if (error) throw error;
//  		});
//  	});

    client.on('msgTransferencia', function(msgTransferencia){
        //- decodifica el mensaje
        var msgJson = JSON.parse(msgTransferencia);

        //Transferencias.insertST(transferencia, function(error,result){
        //    if (error) throw error;

            //- enviando solicitante y beneficiario a todas las bases conectadas
            client.broadcast.emit('msgPersona', {CodOfDestino:msgJson.CodOfDestino, Persona:msgJson.Solicitante});
            client.broadcast.emit('msgPersona', {CodOfDestino:msgJson.CodOfDestino, Persona:msgJson.Beneficiario});

            //- enviando mensaje {transferencia, solicitante, beneficiario)
            client.broadcast.to(BaseToSocket[msgJson.CodOfDestino]).emit("msgTransferencia", msgJson);
        //});
    });
});
