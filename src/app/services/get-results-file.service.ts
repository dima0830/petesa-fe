import { Injectable } from '@angular/core';
import { GlobalsService } from './globals.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetResultsFileService {

  constructor( private global: GlobalsService, private http: HttpClient ) { }

  connectService(params) {
    const token = JSON.parse(localStorage.getItem('access_token'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })};
    const fakeParameters = {
      "invoiceFilterRequest": {
        "branchTarget": [
        ],
        "document": {
          "prefix": null,
          "number": null,
          "hasDebitNote": false,
          "hasCreditNote": false,
          "status": -1
        },
        "buyer": {
          "query": null
        },
        "date": {
          "begin": null,
          "end": null
        },
        "options": {
          "resultOffset": null,
          "startPosition": null,
          "fieldOrder": null,
          "order": null
        }
      }
    }
    // const servUrl: string = this.global.urlServices + this.global.portServices + this.global.context + '/descargaExcel.php';
    // return this.http.post( servUrl, {} );
    const servUrl = this.global.urlServices + this.global.portServices + this.global.context + '/web/emission/documents-as-excel';
    return this.http.post( servUrl, params, httpOptions );
  }
}
