var edge = require('edge');

function TransferenciasDAO(){
	"use strict";

	/* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
   if (false === (this instanceof TransferenciasDAO)) {
        console.log('Warning: TransferenciasDAO constructor called without "new" operator');
        return new TransferenciasDAO(db);
   }

	this.insertST = function(st, from, callback) {
        "use strict";
        var updateST = edge.func('sql', function () {/*
						
        INSERT INTO [TCJ_Solicitud_Transferencia] (
        	  [Tipo_Documento],[Nro_Solicitud],[Cod_Base_Origen],[Cod_Base_Destino],[FechaHora_Solicitud]
           ,[Primer_Beneficiario],[Segundo_Beneficiario],[Direccion_Beneficiario],[DNI],[Moneda_Importe]
           ,[Importe],[Comision_Bancaria],[Derecho_Transf],[Derecho_Fax],[Cod_Banco],[Nro_Cuenta_Bancaria]
           ,[Tipo_Destino_Banco],[Solicitante],[Direccion_Solicitante],[Destino],[Estado],[Flag_Impreso]
           ,[Obs_Solicitud],[Nro_Caja],[Fecha_Trabajo],[Cod_Cuenta],[FechaHora_Anulacion],[Usuario_Anulacion]
           ,[flagEnviadoCliente],[FechaRegServer],[flagCaja],[TipoDocRef],[Doc_Referencia],[flagCierre]
           ,[flagPara_Update],[Usuario_Dictado],[FechaHora_Dictado],[Usuario_Registro],[Flag_Dictado]
        )
        VALUES (
           @Tipo_Documento,@Nro_Solicitud,@Cod_Base_Origen,@Cod_Base_Destino,@FechaHora_Solicitud
           ,@Primer_Beneficiario,@Segundo_Beneficiario,@Direccion_Beneficiario,@DNI,@Moneda_Importe
           ,@Importe,@Comision_Bancaria,@Derecho_Transf,@Derecho_Fax,@Cod_Banco,@Nro_Cuenta_Bancaria
           ,@Tipo_Destino_Banco,@Solicitante,@Direccion_Solicitante,@Destino,@Estado,@Flag_Impreso
           ,@Obs_Solicitud,@Nro_Caja,@Fecha_Trabajo,@Cod_Cuenta,@FechaHora_Anulacion,@Usuario_Anulacion
           ,@flagEnviadoCliente,@FechaRegServer,@flagCaja,@TipoDocRef,@Doc_Referencia,@flagCierre
           ,@flagPara_Update,@Usuario_Dictado,@FechaHora_Dictado,@Usuario_Registro,@Flag_Dictado
        )
		*/});	

		updateST({ 
				Tipo_Documento : st.Tipo_Documento
            ,Nro_Solicitud: st.Nro_Solicitud
				,Cod_Base_Origen: from
				,Cod_Base_Destino: st.Cod_Base_Destino
				,FechaHora_Solicitud: st.FechaHora_Solicitud
				,Primer_Beneficiario: st.Primer_Beneficiario
				,Segundo_Beneficiario: st.Segundo_Beneficiario
				,Direccion_Beneficiario: st.Direccion_Beneficiario
				,DNI: st.DNI
				,Moneda_Importe: st.Moneda_Importe
				,Importe: st.Importe
				,Comision_Bancaria: st.Comision_Bancaria
				,Derecho_Transf: st.Derecho_Transf
				,Derecho_Fax: st.Derecho_Fax
				,Cod_Banco: st.Cod_Banco
				,Nro_Cuenta_Bancaria: st.Nro_Cuenta_Bancaria
				,Tipo_Destino_Banco: st.Tipo_Destino_Banco
				,Solicitante: st.Solicitante
				,Direccion_Solicitante: st.Direccion_Solicitante
				,Destino: st.Destino
				,Estado: st.Estado
				,Flag_Impreso: st.Flag_Impreso
				,Obs_Solicitud: st.Obs_Solicitud
				,Nro_Caja: st.Nro_Caja
				,Fecha_Trabajo: st.Fecha_Trabajo
				,Cod_Cuenta: st.Cod_Cuenta
				,FechaHora_Anulacion: st.FechaHora_Anulacion
				,Usuario_Anulacion: st.Usuario_Anulacion
				,flagEnviadoCliente: st.flagEnviadoCliente
				,FechaRegServer: st.FechaRegServer
				,flagCaja: st.flagCaja
				,TipoDocRef: st.TipoDocRef
				,Doc_Referencia: st.Doc_Referencia
				,flagCierre: st.flagCierre
				,flagPara_Update: st.flagPara_Update
				,Usuario_Dictado: st.Usuario_Dictado
				,FechaHora_Dictado: st.FechaHora_Dictado
				,Usuario_Registro: st.Usuario_Registro
				,Flag_Dictado: st.Flag_Dictado }, function (error, result) {
				
				 //if (error) throw error;				
				 	 
				callback(error, result); 	 
		});
   }

   this.AnularSt = function(codBase, nroSt, callback){
   	"use strict";

   	//actualizar pago
   	var update = edge.func('sql', function () {/*
   		update dbo.TCJ_Solicitud_Transferencia 
   		set Estado = 'ANULADA'
   		where Nro_Solicitud = @Nro_Solicitud
				and Cod_Base_Origen = @Cod_Base_Origen
   	*/});
   	
   	update({ Cod_Base_Origen:codBase, Nro_Solicitud:nroSt }, function (error, result){
   		if (error) throw error;

   		callback(error, result);
   	});
   }
}

module.exports.TransferenciasDAO = TransferenciasDAO;
