import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalsService } from './globals.service';

@Injectable({
  providedIn: 'root'
})
export class DescargaFilesService {

  constructor( private global: GlobalsService, private http: HttpClient ) { }
  connectService( id ) {
    const token = JSON.parse(localStorage.getItem('access_token'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })};
    const fakeParameters = {
      "downloadDocumentFileRequestDto": {
        "documentFileId": id
      }
    }

    const servUrl = this.global.urlServices + this.global.portServices + this.global.context + '/web/emission/files';
    return this.http.post( servUrl, fakeParameters, httpOptions );
  }


}
