var edge = require('edge');

function OrdenPagosDAO(){
	"use strict";

	/* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
   if (false === (this instanceof OrdenPagosDAO)) {
        console.log('Warning: OrdenPagosDAO constructor called without "new" operator');
        return new OrdenPagosDAO(db);
   }

	this.insertOrdenPago = function(st, from, callback) {
        "use strict";

      // insertar orden de pago
			var insertOP = edge.func('sql', function () {/*
						
					  insert dbo.TCJ_Orden_Pago ( 
							Cod_Base_Procedencia, Tipo_Doc_Solicitud, Nro_Solicitud, Cod_Base_Origen, Tipo_Documento, 
							FechaHora_Recepcion, FechaHora_Solicitud, Primer_Beneficiario, Segundo_Beneficiario, 
							Direccion_Beneficiario, Moneda_Importe, Importe, Comision_Bancaria, 
							Derecho_Transf, Derecho_Fax, Cod_Banco, Nro_Cuenta_Bancaria, Tipo_Destino_Banco, 
							Solicitante, Direccion_Solicitante, Destino, Estado, Cod_Cuenta
					  )
					  values ( 
							@Cod_Base_Procedencia, @Tipo_Doc_Solicitud, @Nro_Solicitud, @Cod_Base_Origen, 'OP-', 
							GETDATE(), @FechaHora_Solicitud, @Primer_Beneficiario, @Segundo_Beneficiario, 
							@Direccion_Beneficiario, @Moneda_Importe, @Importe, @Comision_Bancaria, 
							@Derecho_Transf, @Derecho_Fax, @Cod_Banco, @Nro_Cuenta_Bancaria, @Tipo_Destino_Banco, 
							@Solicitante, @Direccion_Solicitante, @Destino, 'PENDIENTE', @Cod_Cuenta
					  )
					  
			*/});	

			insertOP({ 
							Cod_Base_Procedencia:from, Tipo_Doc_Solicitud:st.Tipo_Documento, Nro_Solicitud:st.Nro_Solicitud
							, Cod_Base_Origen:from, FechaHora_Solicitud:st.FechaHora_Solicitud, Primer_Beneficiario:st.Primer_Beneficiario
							, Segundo_Beneficiario:st.Segundo_Beneficiario, Direccion_Beneficiario:st.Direccion_Beneficiario
							, Moneda_Importe:st.Moneda_Importe, Importe:st.Importe, Comision_Bancaria:st.Comision_Bancaria
							, Derecho_Transf:st.Derecho_Transf, Derecho_Fax:st.Derecho_Fax, Cod_Banco:st.Cod_Banco
							, Nro_Cuenta_Bancaria:st.Nro_Cuenta_Bancaria, Tipo_Destino_Banco:st.Tipo_Destino_Banco 
							, Solicitante:st.Solicitante, Direccion_Solicitante:st.Direccion_Solicitante, Destino:st.Destino
							, Cod_Cuenta:st.Cod_Cuenta }, function (error, result) {
				
				if (error) throw error;
							
				var selectOP = edge.func('sql', function() {/*
						select * 
						from dbo.TCJ_Orden_Pago	
						where Cod_Base_Origen = @Cod_Base_Origen and
							Tipo_Doc_Solicitud = @Tipo_Documento and
							Nro_Solicitud = @Nro_Solicitud
				*/});

				selectOP({Cod_Base_Origen:from, Tipo_Documento:st.Tipo_Documento, Nro_Solicitud:st.Nro_Solicitud}, function(error, op){
					if (error) throw error;						
						callback(error, op); 	 
				});							
			});		                	
   }

   this.UpdateFlagEnviado = function(NroOP, CodBase, NroST, callback) {
        "use strict";

      // actualizar flagEnviado
		var update = edge.func('sql', function () {/*
						
			update dbo.TCJ_Orden_Pago 
			set flagEnviado = 1,
				Nro_Orden_Pago = @Nro_Orden_Pago
			where Nro_Solicitud = @Nro_Solicitud
				and Cod_Base_Procedencia = @Cod_Base_Procedencia
					  
		*/});	

		update({ Nro_Orden_Pago:NroOP, Cod_Base_Procedencia:CodBase, Nro_Solicitud:NroST }, function (error, result) {
				
			if (error) throw error;
							
			callback(error, result); 	 

		});		                	
   }

   this.PagarOp = function(codBase, nroSt, pagadoA, fechaHora, callback){
   	"use strict";

   	//actualizar pago
   	var update = edge.func('sql', function () {/*
   		update dbo.TCJ_Orden_Pago 
   		set Pagado_A = @Pagado_A, FechaHora_Pago = @FechaHora_Pago,
   			Estado = 'CANCELADA'
   		where Nro_Solicitud = @Nro_Solicitud
				and Cod_Base_Procedencia = @Cod_Base_Procedencia
   	*/});
   	
   	update({ Cod_Base_Procedencia:codBase, Nro_Solicitud:nroSt,
   				Pagado_A:pagadoA, FechaHora_Pago:fechaHora }, function (error, result){
   		if (error) throw error;

   		callback(error, result);
   	});
   }   
}

module.exports.OrdenPagosDAO = OrdenPagosDAO;
