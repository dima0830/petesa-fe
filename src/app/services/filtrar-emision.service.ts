import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalsService } from './globals.service';

@Injectable({
  providedIn: 'root'
})
export class FiltrarEmisionService {

  constructor( private http: HttpClient, private global: GlobalsService ) {}

  invoiceFilter( parametros: any ) {
    const token = JSON.parse(localStorage.getItem('access_token'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })};
    // const urlServicio = 'http://localhost:8888/simulacion/filtroDocumentosEmitidos.php';
    // return this.http.post(urlServicio, parametros);
    

    const fakeParameters = {
      "invoiceFilterRequest": {
        "branchTarget": [
        ],
        "document": {
          "prefix": "",
          "number": "",
          "hasDebitNote": false,
          "hasCreditNote": false,
          "status": -1
        },
        "buyer": {
          "query": ""
        },
        "date": {
          "begin": "2019-11-17",
          "end": "2019-11-17"
        },
        "options": {
          "resultOffset": "3",
          "startPosition": "0",
          "fieldOrder": "",
          "order": ""
        }
      }
    }



    // parametros.branchTarget = [1, 2, 3];
    const newParameters = {
      invoiceFilterRequest: parametros
    }
    // Injectamos los branch targets activos
    const bTarget = JSON.parse(localStorage.getItem('currentBranches'));
    parametros.invoiceFilterRequest.branchTarget = bTarget;
    const urlServicio = this.global.urlServices + this.global.portServices + this.global.context + '/web/filter/documents';
    return this.http.post(urlServicio, parametros, httpOptions);
  }
}
