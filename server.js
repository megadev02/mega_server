// almacena los socket ids
var BaseToSocket = new Object();
var SocketToBase = new Object(); 

var io = require('socket.io').listen(85);
var TransferenciasDAO = require('./Transferencias').TransferenciasDAO;
var OrdenPagosDAO = require('./OrdenPagos').OrdenPagosDAO;

io.sockets.on('connection', function(client){				

	var Transferencias = new TransferenciasDAO();
	var OrdenPagos = new OrdenPagosDAO();

	client.on('st', function(content){									
		
		// decodificar el mensaje
		var st = JSON.parse(content);		
		var from = SocketToBase[client.id];		
		var to = st.Cod_Base_Destino;

		//console.log(st);

	   console.log('base apartir de id '+SocketToBase[client.id]);
		
		// registrar en la base de datos central con edge.js
		// registrar solicitud de transferencia y generar orden de pago
		

		Transferencias.insertST(st, from, function(error,result){
			if (error) throw error;

			// generar orden de pago			
			OrdenPagos.insertOrdenPago(st, from, function(error, op){
				if (error) throw error;				

				var AssocArray = {};

				for (var i = 0; i < op[0].length; i++)
				{
					//controlando nulos
					if (JSON.stringify(op[1][i])=="{}")					
						op[1][i] = null;
					
					AssocArray[op[0][i]]=op[1][i];
				}			

				var json_op = JSON.stringify(AssocArray);

				// enviar mensaje de confirmacion a 'from'
				var st_ok = { 'Nro_Solicitud':st.Nro_Solicitud };
				client.emit('st_ok', JSON.stringify(st_ok));

				// enviar mensaje a 'to' (orden de pago)
				io.sockets.socket(BaseToSocket[to]).emit("op", json_op);
			});
		});
	});	

	client.on('disconnect', function () {
		var base_disconnect = {'BaseOffline': SocketToBase[client.id]};
    	//io.sockets.emit('base_offline', base_disconnect); //envia a todos
    	client.broadcast.emit('base_offline', base_disconnect);
   });

	client.on('nameclient', function (name) {
	
   	console.log(name,' acaba de conectarse!');

   	// almacenar el id del socket con el nombre como clave
		BaseToSocket[name] = client.id;
		SocketToBase[client.id] = name;

		// obtener todas los sockets conectados
		var onlines = io.sockets.clients();

		// notificar a la base entrante sobre las bases que estan conectadas
		onlines.forEach(function(online){
			var base = SocketToBase[online.id];
			if (base != name) //envia todas las bases conectadas menos a si mismo
				client.emit('base_online', {'BaseOnline':base}); 
		});
		
   	// enviar inicio de sesion a las demas bases conectadas menos a quien la invocó
   	var base_online = {'BaseOnline':name};
     	client.broadcast.emit('base_online', base_online);
  	});

  	client.on('op_ok', function(content){
  		// decodificar el mensaje
		var msg = JSON.parse(content);

		// actualizar flagEnviado de OP en sql server
		OrdenPagos.UpdateFlagEnviado(msg.Nro_Orden_Pago, msg.Cod_Base_Procedencia, msg.Nro_Solicitud, function(error,result){
			if (error) throw error;

			// desapilar de op pendientes de envio
		});
  	});

	client.on('op_pagada', function(content){
  		// decodificar el mensaje
		var msg = JSON.parse(content);		

		// actualizar flagEnviado de OP en sql server
		OrdenPagos.PagarOp(msg.Cod_Base_Procedencia, msg.Nro_Solicitud, 
											msg.Pagado_A, msg.FechaHora_Pago, function(error,result){
			if (error) throw error;

			// enviar confirmación de recepción a from
			var op_pagada_ok = {'Cod_Base_Procedencia':msg.Cod_Base_Procedencia, 'Nro_Solicitud':msg.Nro_Solicitud };
			client.emit('op_pagada_ok', JSON.stringify(op_pagada_ok));

			// enviar mensaje de pago al origen
			var st_pagada = {'Nro_Solicitud':msg.Nro_Solicitud};
			io.sockets.socket(BaseToSocket[msg.Cod_Base_Procedencia]).emit("st_pagada", st_pagada);
		});
  	});

  	client.on('st_pagada_ok', function(content){
  		// decodificar el mensaje
  		var msg = JSON.parse(content);

  		// rabbit-mq
  	});
  	
	client.on('op_anulada', function(content){
  		// decodificar el mensaje
		var msg = JSON.parse(content);		

		// actualizar flagEnviado de OP en sql server
		OrdenPagos.UpdateOpAnulada(msg.Cod_Base_Procedencia, msg.Nro_Orden_Pago, msg.Usuario_Anulacion, 
												msg.FechaHora_Anulacion, msg.Motivo_Anulacion, function(error,result){
			if (error) throw error;

			// enviar confirmación de recepcion a from
			var op_anulada_ok = {'Cod_Base_Procedencia':msg.Cod_Base_Procedencia, 'Nro_Orden_Pago':msg.Nro_Orden_Pago};
			client.emit('op_anulada_ok', JSON.stringify(op_anulada_ok));
		});
  	});

  	client.on('st_anulada', function(content){
		// decodificar el mensaje
		var st = JSON.parse(content);		
		var from = SocketToBase[client.id];
		var to = st.Cod_Base_Destino;

		// enviar mensaje a destino	
		var op_anulada = { 'Cod_Base_Procedencia': SocketToBase[client.id], 'Nro_Solicitud':st.Nro_Solicitud };
		//socket.emit('st_anulada', content);

		// enviar mensaje a 'to' (orden de pago)
		io.sockets.socket(BaseToSocket[to]).emit("op_anulada", op_anulada);		
  	});

  	client.on('op_anulada_ok', function(content){
  		// decodificar el mensaje
  		var msg = JSON.parse(content);
  		var to = msg.Cod_Base_Procedencia;

  		// anular en central
  		// actualizar flagEnviado de OP en sql server (central)
		Transferencias.AnularSt(msg.Cod_Base_Procedencia, msg.Nro_Solicitud, 
												function(error,result){
			if (error) throw error;

	  		// poner a cola y enviar al origen la confirmación
	  		var msgjson = { 'Nro_Solicitud':msg.Nro_Solicitud };

			io.sockets.socket(BaseToSocket[to]).emit("st_anulada_ok", msgjson);
		});
  	});
});
