import { Injectable } from '@angular/core';
import { GlobalsService } from './globals.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckTrackidService {
  constructor( private global: GlobalsService, private http: HttpClient ) { }

  connectService( params: any ) {
    const token = JSON.parse(localStorage.getItem('access_token'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })};
    const objPrams = {
      trackId: params
    }
    const servUrl = this.global.urlServices + this.global.portServices + this.global.context + '/integration/emission/trackId';
    return this.http.post( servUrl, objPrams, httpOptions );
  }
}
