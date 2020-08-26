import { Injectable } from '@angular/core';
import { GlobalsService } from './globals.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EntregafeService {

  constructor( private global: GlobalsService, private http: HttpClient ) { }

  // connectService() {
  //   const servUrl: string = this.global.urlServices + this.global.portServices + this.global.context + '/entregaFactura.php';
  //   return this.http.post( servUrl, {} );
  // }
  connectService( docId: number) {
    const token = JSON.parse(localStorage.getItem('access_token'));
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })};

    const fakeParameters = {
      documentDetailsRequest: {
        documentId: docId
      }
    }
    const params = {
      
      documentId: docId
    }
    const servUrl = this.global.urlServices + this.global.portServices + this.global.context + '/web/detail/document';
    return this.http.post( servUrl, params, httpOptions );
  }
}