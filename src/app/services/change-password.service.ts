import { Injectable } from '@angular/core';
import { GlobalsService } from './globals.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor( private global: GlobalsService, private http: HttpClient ) { }

  connectService( params: any ) {
    const token = JSON.parse(localStorage.getItem('access_token'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })};
  
    
    const servUrl = this.global.urlServices + this.global.portServices + this.global.context + '/users/password/change';
    return this.http.post( servUrl, params, httpOptions );
  }
}
