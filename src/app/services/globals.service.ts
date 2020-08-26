import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  urlServices: string;
  portServices: string;
  context: string;
  maxResultsPerPage = 20;

  constructor() {
    // DATOS SERVIDOR PRODUCCIÓN
    // this.urlServices = 'https://facturaelectronicavp.ptesa.com.co';
    // this.portServices = '';
    // this.context = '/api/fe/v1';

    // // DATOS SERVIDOR PRUEBAS
    // this.urlServices = 'https://secfevalpruebas.ptesa.com.co';
    // this.portServices = ':8443';
    // this.context = '/api/fe/v1';

    // // DATOS SERVIDOR DESARROLLO
    this.urlServices = 'https://desarrollofe.ptesa.com.co';
    this.portServices = ':443';
    this.context = '/api/fe/v1';

  }
}
