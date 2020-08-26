import { Injectable } from '@angular/core';
import { GlobalsService } from './globals.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BorrarSoportesService {
  constructor( private global: GlobalsService, private http: HttpClient ) { }
    connectService( arrDocs: Array<any> ) {
      const token = JSON.parse(localStorage.getItem('access_token'));
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token
        })};
      const parameters = {
        billingDocumentFileIdList : arrDocs
     }
      const servUrl = this.global.urlServices + this.global.portServices + this.global.context + '/web/document/attachments';
      // const servUrl = 'http://192.168.15.156:38086/api/fe/v1/load-attachment/web-attachment-processor'
      // return this.http.delete( servUrl, parameters, httpOptions );
      return this.http.request('delete', servUrl, { body: parameters, headers: httpOptions.headers });
    }
}
