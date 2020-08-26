function convTipoDocumento(idDocumento) {
    var respuesta = 'Err.';
    idDocumento = parseInt(idDocumento);
    switch (idDocumento) {
        case 11:
            respuesta = 'R.C.';
            break;
        case 12:
            respuesta = 'T.I.';
            break;
        case 13:
            respuesta = 'C.C.';
            break;
        case 21:
            respuesta = 'T.E.';
            break;
        case 22:
            respuesta = 'C.E.';
            break;
        case 31:
            respuesta = 'NIT';
            break;
        case 41:
            respuesta = 'Pas';
            break;
        case 42:
            respuesta = 'D.I.E.';
    }
    return respuesta;
}

function convEstado(estado) {
    estado = parseInt(estado);
    var arrEstados = ['Emitida', 'Entregada', 'Aceptada', 'Rechazada', 'err', 'Visualizada', 'Endosada', 'Pagada', 'En Negociación', 'No Negociada'];

    return arrEstados[estado];
}