import { Injectable } from '@angular/core';
import { GlobalsService } from './globals.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActivarUsuarioService {
  constructor( private global: GlobalsService, private http: HttpClient ) { }
    connectService( params: any) {
      const servUrl = this.global.urlServices + this.global.portServices + this.global.context + '/users/users/activate';
      return this.http.post( servUrl, params, {} );
    }
}
