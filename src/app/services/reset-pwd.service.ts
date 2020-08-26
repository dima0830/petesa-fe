import { Injectable } from '@angular/core';
import { GlobalsService } from './globals.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResetPwdService {
  constructor( private global: GlobalsService, private http: HttpClient ) { }
    connectService( params: any) {
      const servUrl = this.global.urlServices + this.global.portServices + this.global.context + '/users/users/password/validate';
      return this.http.put( servUrl, params, {} );
    }
}
