import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LibraryComponent } from '../../../jslib/library/library.component';
import { environment } from 'src/environments/environment';


@Component({
  providers: [LibraryComponent],
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit {
  @Input() factura: any = {};
  @Output() transportDocumentId = new EventEmitter();
  today: number = Date.now();

  env = environment;
  
  constructor( public libr: LibraryComponent) {

  }

  ngOnInit() {
    
  }
  setDocumentId(event, documentId) {
    // console.log('(hijo) setDocumentId:', documentId);
    this.transportDocumentId.emit({ documentId: documentId});
  }
  
  randomBranchId(){
    const storedBranchOffices = JSON.parse(localStorage.getItem('currentBranches'));
    const len = storedBranchOffices.length-1;
    return storedBranchOffices[ this.randomIntFromInterval(0, len) ];
  }
  randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
