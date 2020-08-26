import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LibraryComponent } from 'src/app/jslib/library/library.component';
import { trigger, query, style, animate, transition, stagger, keyframes } from '@angular/animations';

@Component({
  providers: [LibraryComponent],
  selector: 'app-filas',
  templateUrl: './filas.component.html',
  styleUrls: ['./filas.component.css'],
  animations: [
    trigger('cardAnimation', [
      // Transition from any state to any state
      transition('* => *', [
        // Initially the all cards are not visible
        query(':enter', style({ opacity: 0 }), { optional: true }),

        // Each card will appear sequentially with the delay of 300ms
        query(':enter', stagger('90ms', [
          animate('.4s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(50%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(10px) scale(1.1)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
          ]))]), { optional: true }),
      ]),
    ])
  ]
})
export class FilasComponent implements OnInit {
@Input() invoicesSentArray: any;
@Output() transportDocumentId = new EventEmitter();

  constructor( public libr: LibraryComponent ) { }

  ngOnInit() {
  }

  // documentDetail(invoiceId) {
  //   console.log('clic desde filas:', invoiceId);
  // }
  setDocumentId(event, documentId){
    //this.documentId = documentId;
    console.log('(hijo) setDocumentId:', documentId);
    this.transportDocumentId.emit({ documentId: documentId});
  }
}
