var edge = require('edge');

function TransferenciasDAO(){
	"use strict";

	/* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
   if (false === (this instanceof TransferenciasDAO)) {
        console.log('Warning: TransferenciasDAO constructor called without "new" operator');
        return new TransferenciasDAO(db);
   }

	this.insertTrans = function(trans, callback) {
        "use strict";
        var query = edge.func('sql', function () {/*

         INSERT INTO BDMEGA.dbo.Transferencia
         (NumeroDocumento
         ,CodDocumento
         ,OficinaIdProcedencia
         ,OficinaIdDestino
         ,PersonaIdSolicitante
         ,PersonaIdBeneficiario
         ,FechaHoraTransferencia
         ,MonedaId
         ,Importe
         ,DerechoTransferencia
         ,DerechoTransferenciaArreglo
         ,ObsTransferencia
         ,FechaHoraAnulacion
         ,UsuarioAnulacion
         ,BancoId
         ,NumeroCuentaBanco
         ,ComisionBancaria
         ,TipoOperacionBancaria
         ,CodigoOperacion
         ,EstadoOperacionBancaria
         ,MotivoAnulacion
         ,FechaHoraPago
         ,CodDocumentoPago
         ,NroDocumentoPago
         ,ObsPagoTransferencia
         ,Estado
         ,FlagImpreso
         ,CajaAperturaId
         ,TipoTransaccion
         ,ConceptoId
         ,CodigoSeguridad
         ,FlagArregloCuenta
         ,FlagChequeo
         ,FechaHoraChequeo
         ,UsuarioChequeo
         ,UsuarioArregloCuenta)
         VALUES
         (@NumeroDocumento
         ,@CodDocumento
         ,@OficinaIdProcedencia
         ,@OficinaIdDestino
         ,@PersonaIdSolicitante
         ,@PersonaIdBeneficiario
         ,@FechaHoraTransferencia
         ,@MonedaId
         ,@Importe
         ,@DerechoTransferencia
         ,@DerechoTransferenciaArreglo
         ,@ObsTransferencia
         ,@FechaHoraAnulacion
         ,@UsuarioAnulacion
         ,@BancoId
         ,@NumeroCuentaBanco
         ,@ComisionBancaria
         ,@TipoOperacionBancaria
         ,@CodigoOperacion
         ,@EstadoOperacionBancaria
         ,@MotivoAnulacion
         ,@FechaHoraPago
         ,@CodDocumentoPago
         ,@NroDocumentoPago
         ,@ObsPagoTransferencia
         ,@Estado
         ,@FlagImpreso
         ,@CajaAperturaId
         ,@TipoTransaccion
         ,@ConceptoId
         ,@CodigoSeguridad
         ,@FlagArregloCuenta
         ,@FlagChequeo
         ,@FechaHoraChequeo
         ,@UsuarioChequeo
         ,@UsuarioArregloCuenta)
		*/});	

		query({
            NumeroDocumento	: trans.NumeroDocumento
            ,CodDocumento	: trans.CodDocumento
            ,OficinaIdProcedencia	: trans.OficinaIdProcedencia
            ,OficinaIdDestino	: trans.OficinaIdDestino
            ,PersonaIdSolicitante	: trans.PersonaIdSolicitante
            ,PersonaIdBeneficiario	: trans.PersonaIdBeneficiario
            ,FechaHoraTransferencia	: trans.FechaHoraTransferencia
            ,MonedaId	: trans.MonedaId
            ,Importe	: trans.Importe
            ,DerechoTransferencia	: trans.DerechoTransferencia
            ,DerechoTransferenciaArreglo	: trans.DerechoTransferenciaArreglo
            ,ObsTransferencia	: trans.ObsTransferencia
            ,FechaHoraAnulacion	: trans.FechaHoraAnulacion
            ,UsuarioAnulacion	: trans.UsuarioAnulaci
            ,BancoId	: trans.BancoId
            ,NumeroCuentaBanco	: trans.NumeroCuentaBanco
            ,ComisionBancaria	: trans.ComisionBancaria
            ,TipoOperacionBancaria	: trans.TipoOperacionBancaria
            ,CodigoOperacion	: trans.CodigoOperacion
            ,EstadoOperacionBancaria	: trans.EstadoOperacionBancaria
            ,MotivoAnulacion	: trans.MotivoAnulacion
            ,FechaHoraPago	: trans.FechaHoraPago
            ,CodDocumentoPago	: trans.CodDocumentoPago
            ,NroDocumentoPago	: trans.NroDocumentoPago
            ,ObsPagoTransferencia	: trans.ObsPagoTransferencia
            ,Estado	: trans.Estado
            ,FlagImpreso	: trans.FlagImpreso
            ,CajaAperturaId	: trans.CajaAperturaId
            ,TipoTransaccion	: trans.TipoTransaccion
            ,ConceptoId	: trans.ConceptoId
            ,CodigoSeguridad	: trans.CodigoSeguridad
            ,FlagArregloCuenta	: trans.FlagArregloCuenta
            ,FlagChequeo	: trans.FlagChequeo
            ,FechaHoraChequeo	: trans.FechaHoraChequeo
            ,UsuarioChequeo	: trans.UsuarioChequeo
            ,UsuarioArregloCuenta	: trans.UsuarioArregloCuenta
        }, function (error, result) {
				
				 //if (error) throw error;				
				 	 
				callback(error, result); 	 
		});
   }
}

module.exports.TransferenciasDAO = TransferenciasDAO;
