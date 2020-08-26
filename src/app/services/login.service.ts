import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { GlobalsService } from './globals.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private global: GlobalsService, private http: HttpClient) {
    
  }

  loginConnect( parameters: any ){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        //'Authorization': 'Basic ' + btoa('angularapp' + ':' + 'abcde')
      })};

    let serviceParameters = new URLSearchParams();
    serviceParameters.append('username', parameters.user);
    serviceParameters.append('password', parameters.password);
    serviceParameters.append('grant_type', 'password');
    // serviceParameters.append('angularapp', 'abcde'); // no

    // const servUrl: string = this.global.urlServices + this.global.portServices + this.global.context + '/loginfe_.php';
    // return this.http.post( servUrl, {} );

    // const servUrl = 'https://secfevalpruebas.ptesa.com.co:8443/api/fe/v1/security/oauth/token';
    const servUrl: string = this.global.urlServices + this.global.portServices + this.global.context + '/security/oauth/token';
    return this.http.post( servUrl, serviceParameters.toString(), httpOptions );

    // const servUrl = 'http://192.168.121.81:5500/api/fe/v1/security/oauth/token';
    // return this.http.post( servUrl, serviceParameters.toString(), httpOptions );


  }
}
