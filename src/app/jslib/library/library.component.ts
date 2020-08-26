import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: []
})
export class LibraryComponent {
    env = environment;

  constructor() { }

   convTipoDocumento(idDocumento) {
    let respuesta = 'Err.';
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
            break;
        case 50:
            respuesta = 'NIT(Ext)';
            break;
        case 91:
            respuesta = 'NUIP';
            break;
    }
    return respuesta;
}


getBranchColor( branchId ): string {
    let resp = '#007bff';
    const userData = JSON.parse(localStorage.getItem('user'));
    const companiesData = userData.companies;
    companiesData.forEach(company => {
      company.branches.forEach(branch => {
        if ( branch.branchId === branchId ) {
          resp = branch.color;
        }
      });
    });
    return resp;
  }

  convEstadoDoc(idEstadoo) {
    let respuesta = 'No Entregada.';
    idEstadoo = parseInt(idEstadoo);
    switch (idEstadoo) {
        case 3010:
            respuesta = 'Entregada';
            break;
        case 3011:
            respuesta = 'Recibida';
            break;
        case 3012:
            respuesta = 'Aceptada';
            break;
        case 3013:
            respuesta = 'Aceptada Tácitamente';
            break;
        case 3014:
            respuesta = 'Rechazada';
            break;
    }
    return respuesta;
}

getOverAllPermissions() {
    // console.log('entra a getOverAllPermissions');
    const permArray = [];
    const userData = JSON.parse(localStorage.getItem('user'));
    const companiesData = userData.companies;
    const storedBranches = JSON.parse(localStorage.getItem('currentBranches'));
    if (storedBranches) {
      // console.log('hay banches guardados...')
      storedBranches.forEach( selectedBranches => {
        // console.log('Escaneando branch guardado: ', selectedBranches)
        companiesData.forEach(company => {
          company.branches.forEach(branch => {
            // console.log('comparo: ', branch.branchId, Number(selectedBranches) )
            if ( branch.branchId === Number(selectedBranches)) {
              const currentPermissions = branch.permissions;
              currentPermissions.forEach(perm => {
                if ( !permArray.includes(perm) ) {
                  permArray.push(perm);
                }
              });
            }
          });
        });
      });
    }
    return permArray;
  }

  modifyEnviromentPermissions( permArray ) {
      // 1: Emision de DFE (showOutboundOperate)
      // 2: Consulta de trackID (showTrackSearch)
      // 3: Integration-documents
      // 4: Busqueda emision (showOutboundSearch)
      // 5: Ver detalle documento emitido (showOutboundDocumentDetails)
      // 6: Permite descarga filtros en excel - emisión
      // 7: Permite descarga documentos asociados a una factura. Ej: representaciones graficas, uls´s, etc.
      // 6: Permite descarga filtros en excel - recepcion
      // 9: Busqueda recepcion adq.
      // 10: Cambio de estado.

      if ( permArray.includes('1') || permArray.includes(1)) {
        this.env.overallPermissions.showOutboundOperate = true;
      }
      if ( permArray.includes('2') || permArray.includes(2) ) {
        this.env.overallPermissions.showTrackSearch = true;
      }
      if ( permArray.includes('3') || permArray.includes(3) ) {
        this.env.overallPermissions.showTrackDocSearch = true;
      }
      if ( permArray.includes('4') || permArray.includes(4) ) {
        this.env.overallPermissions.showOutboundSearch = true;
      }
      if ( permArray.includes('5') || permArray.includes(5)) {
        this.env.overallPermissions.showOutboundDocumentDetails = true;
      }
      if ( permArray.includes('6') || permArray.includes(6)) {
        this.env.overallPermissions.showOutboundFiltersDownload = true;
      }
      if ( permArray.includes('7') || permArray.includes(7)) {
        this.env.overallPermissions.showOutboundDocumentsDownload = true;
      }
      if ( permArray.includes('8') || permArray.includes(8)) {
        this.env.overallPermissions.showInboundFiltersDownload = true;
      }
      if ( permArray.includes('9') || permArray.includes(9)) {
        this.env.overallPermissions.showInboundSearch = true;
      }
      if ( permArray.includes('10') || permArray.includes(10)) {
        this.env.overallPermissions.showStatusChange = true;
      }
    }

    resetEnviromentPermissions() {
    this.env.overallPermissions.showOutboundOperate = false;
    this.env.overallPermissions.showTrackSearch = false;
    this.env.overallPermissions.showTrackDocSearch = false;
    this.env.overallPermissions.showOutboundSearch = false;
    this.env.overallPermissions.showOutboundDocumentDetails = false;
    this.env.overallPermissions.showOutboundFiltersDownload = false;
    this.env.overallPermissions.showOutboundDocumentsDownload = false;
    this.env.overallPermissions.showInboundFiltersDownload = false;
    this.env.overallPermissions.showInboundSearch = false;
    this.env.overallPermissions.showStatusChange = false;
    }

    traducirEstado( status: string) {
      let respuesta = '-';
      switch (status) {
        case 'BLOCKED':
            respuesta = 'Bloqueado';
            break;
        case 'ERROR':
            respuesta = 'Error';
            break;
        case 'REJECTED_BY_AP':
            respuesta = 'Procesado';
            break;
        case 'PROCESSING':
            respuesta = 'Procesando';
            break;
        case 'WAITING_FOR_ATTACHMENTS':
            respuesta = 'Esperando adjuntos';
            break;
        case 'REJECTED':
            respuesta = 'Rechazado';
            break;
        case 'NOT_APPLY':
            respuesta = 'No aplica';
            break;

        case 'ACCEPTED':
            respuesta = 'Aceptado';
            break;

        case 'ACCEPTED_WITH_NOTIFICATIONS':
            respuesta = 'Aceptado con notificaciones';
            break;

        case 'DELIVERED':
            respuesta = 'Entregado';
            break;

        case 'SENT':
            respuesta = 'Enviado';
            break;
        case 'VIEWED':
            respuesta = 'Visualizado';
            break;
        case 'SUCCESS':
              respuesta = 'Exitoso';
              break;
              case 'TACITLY ACCEPTED':
              respuesta = 'Aceptado tácitamente';
              break;
    }
      return respuesta;
    }
}
