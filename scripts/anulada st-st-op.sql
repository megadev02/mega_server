-- prueba para envio de ST y ANULACION desde origen
-- origen
select *
from DBBSCAJAMEC04.dbo.TCJ_Solicitud_Transferencia
order by FechaHora_Solicitud desc
-- central - solicitud
select *
from DBBSCAJA_CENTRALMEC.dbo.TCJ_Solicitud_Transferencia
order by FechaHora_Solicitud desc
-- destino
select *
from DBBSCAJAMEC01.dbo.TCJ_Orden_Pago
order by FechaHora_Solicitud desc