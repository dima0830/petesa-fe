import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from './globals.service';

@Injectable({
  providedIn: 'root'
})
export class AnaliticaService {

  constructor( private global: GlobalsService, private http: HttpClient ) { 
  }

  analiticaConnect( parameters: any ){
    const serviceParameters: object = {
      "analiticaRequest": {
        "date1": parameters.date1,
        "date2": parameters.date2
      }
    };
    const servUrl: string = this.global.urlServices + this.global.portServices + this.global.context + '/grLineas.php';
    return this.http.post( servUrl, serviceParameters);
  }
}
