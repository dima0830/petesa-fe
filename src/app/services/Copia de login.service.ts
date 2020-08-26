import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from './globals.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private global: GlobalsService, private http: HttpClient ) {
    
  }

  loginConnect( parameters: any ){
    const serviceParameters: object = {
      "loginRequest": {
        "usr": parameters.user,
        "pwd": parameters.password
      }
    };
    const servUrl: string = this.global.urlServices + this.global.portServices + this.global.context + '/loginfe_.php';
    return this.http.post( servUrl, serviceParameters);
  }
}
