import { Component, OnInit, Input } from '@angular/core';
import { LibraryComponent } from '../../../jslib/library/library.component';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  @Input() status;
  ptesaStatus = '';
  ptesaColor = 0; 
  dianStatus = '';
  dianColor = 0;
  adqStatus = '';
  adqColor = 0;

  constructor( public lib: LibraryComponent) { 
    
  }

  ngOnInit() {
    this.renderStatus( this.status );
  }

  renderStatus( status ){
    //OJO!!!!   documentStatus y ptesaStatus llegan INVERTIDOS desde el ws

    // analisis de ptesaStatus
    if( status.documentStatus === 'BLOCKED' ||
        status.documentStatus === 'ERROR' ) {
        this.adqColor = 1; // red
    }
    if( status.documentStatus === 'PROCESSING' ||
        status.documentStatus === 'WAITING_FOR_ATTACHMENTS' ) {
        this.adqColor = 2; // yellow
    }
    if( status.documentStatus === 'SUCCESS' || status.documentStatus === 'REJECTED_BY_AP' ) {
        this.adqColor = 3; // green
    }

    // analisis de dianStatus
    if( status.dianStatus === 'REJECTED' ||
        status.dianStatus === 'ERROR' ) {
        this.dianColor = 1; // red
    }
    if( status.dianStatus === 'NOT_APPLY' ) {
        this.dianColor = 0; // blank
    }
    if( status.dianStatus === 'ACCEPTED' ) {
        this.dianColor = 3; // green
    }
    if( status.dianStatus === 'ACCEPTED_WITH_NOTIFICATIONS' ) {
        this.dianColor = -3; // green + info
    }
    // analisis documentStatus / adqStatus
    if( status.ptesaStatus === 'REJECTED' ||
        status.ptesaStatus === 'ERROR' ) {
        this.ptesaColor = 1; // red
    }
    if( status.ptesaStatus === 'NOT_APPLY' ) {
        this.ptesaColor = 0; // blank
    }
    if( status.ptesaStatus === 'DELIVERED' ||
        status.ptesaStatus === 'SENT' ||
        status.ptesaStatus === 'VIEWED' ) {
        this.ptesaColor = 2; // blank
    }
    if( status.ptesaStatus === 'ACCEPTED' ||
        status.ptesaStatus === 'TACITLY ACCEPTED' ) {
        this.ptesaColor = 3; // green
    }
  }

}
