// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
