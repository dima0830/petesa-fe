import { Injectable } from '@angular/core';
import { GlobalsService } from './globals.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

  export class CargarSoportesService {

    constructor( private global: GlobalsService, private http: HttpClient ) { }
    connectService(base64:string, fileName: string, documentId: number, category: any) {
      const token = JSON.parse(localStorage.getItem('access_token'));
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token
        })};
      const parameters = {
        billingDocumentId: documentId,
        categoryId: category,
        originalFilename: fileName,
        contentBase64: base64
      }
      const servUrl = this.global.urlServices + this.global.portServices + this.global.context + '/web/detail/document/attachment';
      // const servUrl = 'http://192.168.15.156:38086/api/fe/v1/load-attachment/web-attachment-processor'
      return this.http.post( servUrl, parameters, httpOptions );
    }
  }
