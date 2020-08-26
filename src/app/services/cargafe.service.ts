import { Injectable } from '@angular/core';
import { GlobalsService } from './globals.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CargafeService {

  constructor( private global: GlobalsService, private http: HttpClient ) { }

  connectService(base64: string, filename: string, extension: string, suppId: any) {
    const token = JSON.parse(localStorage.getItem('access_token'));
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })};
    const fakeParameters = {
      content: base64,
      supplierId: suppId,
      format: extension,
      originalFilename: filename
    }  
    const servUrl = this.global.urlServices + this.global.portServices + this.global.context + '/integration/emission';
    return this.http.post( servUrl, fakeParameters, httpOptions );
  }


}
