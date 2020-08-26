import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetHelpService {
  constructor( private http: HttpClient ) { }
    getChapter( params: any) {
      const servUrl = '/assets/html/ayuda/prueba.html';
      return this.http.get( servUrl, {responseType: 'text'} );
    }
}
