export const environment = {
  production: true,
  isLoggedIn: false,
  usesMultipleBranches: false,
  usesAnalitica: false,
  userName: '',
  userSurname: '',
  userEmail: '',
  overallPermissions: {
    showOutboundOperate: false, // 1 emisión de facturas
    showTrackSearch: false, // 2 busqueda track id
    showTrackDocSearch: false, // 3 busqueda rastreo de documentos emitidos
    showOutboundSearch: false, // 4 busqueda emision
    showOutboundDocumentDetails: false, // 5 ver detalle documento emitido
    showOutboundFiltersDownload: false, // 6 Permite exportar excel resultados emitidos
    showOutboundDocumentsDownload: false, // 7 Permite descargar files de documentos emitidos: (soportes, app response, reprgrafica, etc)
    showInboundFiltersDownload: false, // 8 Permite exportar excel resultados recibidos
    showUsersManagement: false, //
    showGroupsManagement: false,  // 
    showInboundSearch: false, // 9 busqueda recepción
    showStatusChange: false, // 10 busqueda recepción
    showInboundOperate: false // 
  }
};
