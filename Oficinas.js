var edge = require('edge');

function OficinasDAO(){
	"use strict";

	/* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
   if (false === (this instanceof OficinasDAO)) {
        console.log('Warning: OficinasDAO constructor called without "new" operator');
        return new OficinasDAO(db);
   }
	
   this.ConfirmaEntregaMsg = function(mensajeId, callback){
   	"use strict";

   	//actualizar pago
   	var update = edge.func('sql', function () {/*
   		update dbo.ColaMensajes 
   		set Estado = true
   		where MensajeId = @MensajeId
   	*/});
   	
   	update({ MensajeId:mensajeId }, function (error, result){
   		if (error) throw error;

   		callback(error, result);
   	});
   }
}

module.exports.OficinasDAO = OficinasDAO;
