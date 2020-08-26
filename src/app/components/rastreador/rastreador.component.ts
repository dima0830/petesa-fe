import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckTrackidService } from '../../services/check-trackid.service';
import { TrackDocumentsService } from '../../services/track-documents.service';
import { GlobalsService } from '../../services/globals.service';
import { environment } from 'src/environments/environment';

declare var $: any;

@Component({
  selector: 'app-rastreador',
  templateUrl: './rastreador.component.html',
  styleUrls: ['./rastreador.component.css']
})
export class RastreadorComponent implements OnInit {
  env = environment;
  track: any;
  preloader = false;
  preloaderDet = false;
  trackContent = false;
  emptyAnwerTrackId = false;
  emptyTrackId = 0;
  errorsCount = 0;
  errorsDetail = true;
  arrSuppliers = [];
  withCriteria = false;
  err500 = false;

  currentPage = 1;
  filterParameters: any;
  maxResultsPerPage;
  totalResults = '0';
  providerName = '';
  detailed = false;

  trackIdParams = {
    trackId: null
  }

  idCompanySelected = null;
  branches = [];
  arrTrackDocuments: any;

  constructor( private servcheckTracId: CheckTrackidService,
               private router: Router,
               private serv: TrackDocumentsService,
               private globals: GlobalsService ) {
    this.preloader = false;
    this.maxResultsPerPage = globals.maxResultsPerPage;
  }

  ngOnInit() {
  }

  getParameters( event ): void {
    // Lee los parámetros enviados por el componente hijo (BuscadorRastreador)
    this.currentPage = 1;
    this.withCriteria = event.withCriteria;
    delete event.withCriteria;
    this.filterParameters = event.passValue;
    this.trackDocuments();
  }

  getTrackId( trackid ) {
    // Consulta los detalles de un trackID
    $('#modalDetalleErrores').modal('show');
    this.preloaderDet = true;
    this.trackContent = false;
    this.emptyAnwerTrackId = false;
    this.servcheckTracId.connectService( trackid ).subscribe( (data: any) => {
      console.log('data', data);
      if ( data.creationDatetime && data.status ){
        this.detailed = true;
        this.track = data;
        this.preloaderDet = false;
        this.trackContent = true;
        if ( data.errors ){
          this.errorsCount = data.errors.length;
        }
      } else {
        console.log(' Sin resultado');
        this.preloader = false;
        this.trackContent = false;
        this.emptyAnwerTrackId = true;
        this.emptyTrackId = this.trackIdParams.trackId;
      }
    }, error => {
      const errorStatus = error.status;
      if ( errorStatus === 401 ){
        $('#modalBuscadorRastreador').modal('hide');
        $('#modalDetalleErrores').modal('hide');
        this.router.navigate(['/']);
      }
      if ( errorStatus === 500){
        $('#modalBuscadorRastreador').modal('hide');
        $('#modalDetalleErrores').modal('hide');
        this.arrTrackDocuments = [];
        this.preloader = false;
        this.preloaderDet = false;
        this.err500 = true;
      }
    });
  }

  showHideErrors(){
    // Muestra / oculta detalles de error en resultados del trackID
    this.errorsDetail = !this.errorsDetail;
  }

  trackDocuments(){
    // Consume servicio de consulta del rastreador.
    this.preloader = true;

    const startIndex = (this.currentPage * this.globals.maxResultsPerPage) - this.globals.maxResultsPerPage;
    this.filterParameters.startPosition = startIndex;
    this.getSuplierName(this.filterParameters.supplierId);
    $('#modalBuscadorRastreador').modal('hide')
    this.serv.connectService( this.filterParameters ).subscribe( (answer: any) => {
      this.totalResults = answer.totalDocuments.toString();
      this.arrTrackDocuments = answer.trackIdSupplierDtoList;
      console.log('arrTrackDocuments:', this.arrTrackDocuments );
      this.preloader = false;
    }, error => {
      const errorStatus = error.status;
      if ( errorStatus === 401 ){
        $('#modalBuscadorRastreador').modal('hide');
        $('#modalDetalleDocumento').modal('hide');
        this.router.navigate(['/']);
      }
      if ( errorStatus === 500){
        this.arrTrackDocuments = [];
        this.preloader = false;
        this.err500 = true;
      }
    })
  }
  
  splitFileName(fileString: string ): string {
    // Corrige las rutas que que usan / y \ y las unifica con / (slash)
    const arrFile = fileString.replace(/\\/g, '/').split('/');
    return arrFile[arrFile.length - 1];
  }

  pageChanged(event){
    // Controla la paginación de resultados.
    this.currentPage = event;
    this.trackDocuments();
  }
  getSuplierName( idS: number ){
    // Extrae los Supliers de una compañia.
    const userData = JSON.parse(localStorage.getItem('user'));
    const companiesData = userData.companies;
    if (companiesData) {
      // console.log('hay banches guardados...')
      companiesData.forEach( company => {
        if ( company.suppliers[0] && company.suppliers[0].id === idS ){
            this.providerName = company.suppliers[0].name;
          }
      });
    }
  }


  convStatus(entrada: string): string {
    // Traduce estados propios del rastreador.
    let salida = '---'
    switch (entrada) {
      case 'Processing': {
         salida = 'Procesando';
         break;
      }
      case 'Sent to Document Manager': {
        salida = 'Solicitud recibida';
        break;
      }
      case 'Error': {
        salida = 'Error';
        break;
      }
      case 'Finished': {
        salida = 'Finalizado';
        break;
      }
   }
    return salida;
  }
}
