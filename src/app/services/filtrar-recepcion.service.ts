import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalsService } from './globals.service';

@Injectable({
  providedIn: 'root'
})
export class FiltrarRecepcionService {

  constructor( private http: HttpClient, private global: GlobalsService ) {}

  invoiceFilter( parametros: any ) {
    const token = JSON.parse(localStorage.getItem('access_token'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })};
    // Injectamos los branch targets activos
    const bTarget = JSON.parse(localStorage.getItem('currentBranches'));
    parametros.invoiceFilterRequest.branchTarget = bTarget;
    const urlServicio = this.global.urlServices + this.global.portServices + this.global.context + '/web/filter/documents/customer';
    return this.http.post(urlServicio, parametros, httpOptions);
  }
}
