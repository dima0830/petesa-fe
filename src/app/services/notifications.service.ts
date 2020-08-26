import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from './globals.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor( private global: GlobalsService, private http: HttpClient ) {
    
  }

  notificationsConnect( ){
    const serviceParameters: object = {
      notificationsRequest: {
        branchTarget: {
          idType: "31",
          idNumber: "111111111",
          idBranch: "24242424"
        },
        options:{
          resultOffset:50,
          startPosition:0,
        }
      }
    }
    
    const servUrl: string = this.global.urlServices + this.global.portServices + this.global.context + '/notificaciones.php';
    return this.http.post( servUrl, serviceParameters);
  }
}