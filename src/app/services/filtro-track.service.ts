import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { GlobalsService } from './globals.service';

@Injectable({
  providedIn: 'root'
})
export class FiltroTrackService {

  constructor( private global: GlobalsService, private http: HttpClient ) {}

  connectService( parametros ) {
    const servUrl: string = this.global.urlServices + this.global.portServices + this.global.context + '/listaTrackId.php';
    return this.http.post( servUrl, {} );
  }
}
