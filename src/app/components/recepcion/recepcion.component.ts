import { Component, OnInit, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { FilterDocument } from '../../models/documento-filtro.model';
import { FiltrarRecepcionService } from 'src/app/services/filtrar-recepcion.service';
import { GetResultsFileService } from '../../services/get-results-file.service';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { EntregafeService } from '../../services/entregafe.service';
import { DescargaFilesService } from '../../services/descarga-files.service';
import { GlobalsService } from '../../services/globals.service';
import { environment } from '../../../environments/environment';
import { trigger, query, style, animate, transition, stagger, keyframes } from '@angular/animations';
import { ShepherdService } from 'angular-shepherd';
import { NgForm } from '@angular/forms';
import { CargarSoportesService } from '../../services/cargar-soportes.service';
import { CambiarEstadoService } from '../../services/cambiar-estado.service';
import { LibraryComponent } from 'src/app/jslib/library/library.component';
import { GoogleAnalyticsService } from '../../services/google-analytics.service';



declare var $: any;

@Component({
  providers: [LibraryComponent],
  selector: 'app-recepcion',
  templateUrl: './recepcion.component.html',
  styleUrls: ['./recepcion.component.css'],
  animations: [
    trigger('cardAnimation', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('90ms', [
          animate('.4s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(30%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(10px) scale(1.1)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
          ]))]), { optional: true }),
      ]),
    ])
  ]
})
export class RecepcionComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() currentState;

  displayModeList = false;
  pdfBase64: string;
  totalResults = '0';
  unsignedUbl = null;
  signedUbl = null;
  arrAttachedDocs = [];
  arrApplicationResponseDocs = [];
  arrBillingDocumentAttachementDocs = [];
  zoomPdf = 1;
  private maxZoomAllowed = 2;
  private minZoomAllowed = 1;
  zoomInAllowed = true;
  zoomOutAllowed = true;

  currentDocumentId = null;
  env = environment;
  filterParameters = new FilterDocument();
  withCriteria = false;
  invoicesSentArray: object[];
  currentPage = 1;
  maxResultsPerPage;
  arrCurrentBranchesNames = [];
  currentCufe = null;
  currentStatus = null;
  currentType = null;
  rejectReason = '';

  preloader: boolean;
  resultsDownloadProcess = false;
  username: {};
  err500 = false;
  delBuscador = false;
  detailPreloader = true;
  loaderPdf = false;
  loaderSignedUbl = false;
  loaderAR = false;
  loaderAD = false;
  loaderAtt = false;
  rejetcOpen = false;
  aprovedOpen = false;

  file = null;
  file64 = null;
  filename = null;
  extension = null;
  category = '';
  showLoadAttachement = false;
  cargandoSoporte = false;

  scrollInicial = null;

  tutorialSteps = [];

  constructor( private filter: FiltrarRecepcionService,
               private serv: EntregafeService,
               private servSoporte: CargarSoportesService,
               private excelDownload: GetResultsFileService,
               private router: Router,
               private attachedDocs: DescargaFilesService,
               private globals: GlobalsService,
               private shepherdService: ShepherdService,
               private statusChanger: CambiarEstadoService,
               private _ga: GoogleAnalyticsService,
               public libr: LibraryComponent) {
    this.maxResultsPerPage = globals.maxResultsPerPage;
  }

  ngOnInit() {
    this.getInvoices();

    // Verificamos si es necesario abrir un documento por defecto
    const redirector = JSON.parse(localStorage.getItem('redirector'));
    if(redirector !== null){
      localStorage.setItem('redirector', null);
      this.mostrarpdf2(redirector);
    }
  }

  ngAfterViewInit() {
    this.initTutorialSteps();
  }

  ngOnDestroy(){
    $('#modalBuscadorEmision').modal('hide');
    $('#modalDetalleDocumento').modal('hide');
  }

  getUser(){
    return JSON.parse(localStorage.getItem('user'));
  }

  getParameters( event ): void {
    this.currentPage = 1;
    this.withCriteria = event.withCriteria;
    delete event.withCriteria;
    this.filterParameters = event.passValue;
    this.delBuscador = true;
    this.getInvoices();
  }

  getInvoices(): void {
    this.arrCurrentBranchesNames = this.getActiveBranchesNames();
    let startIndex = (this.currentPage * this.globals.maxResultsPerPage) - this.globals.maxResultsPerPage;
    if (startIndex !== 0){
      startIndex = startIndex;
    }

    this.preloader = true;
    $('#modalBuscadorEmision').modal('hide');
    this.filterParameters.invoiceFilterRequest.options.startPosition = startIndex.toString();

    this.filter.invoiceFilter( this.filterParameters ).subscribe( (dataFromService: any) => {
      this.err500 = false;
      this.totalResults = dataFromService.invoiceFilterResponse.data.totalDocuments;
      this.invoicesSentArray = dataFromService.invoiceFilterResponse.data.documents;
      this.preloader = false;
      this._ga.eventEmitter('Recepción', 'Lista de Documentos', 'Correctos', this.totalResults.toString(), 1);
      this.scrolea( 'tope' );
    }, error => {
      window.scrollTo(0, 0);
      $('#modalBuscadorEmision').modal('hide');
      $('#modalDetalleDocumento').modal('hide');
      const errorStatus = error.status;
      if ( errorStatus === 401 ){
        this.router.navigate(['/']);
      }
      if ( errorStatus === 500){
        this.totalResults = '0';
        this.invoicesSentArray = [];
        this.preloader = false;
        this.err500 = true;
      }
      this._ga.eventEmitter('Recepción', 'Lista de Documentos', 'Con Error', errorStatus.toString(), 1);
    });
  }

  changeviewMode(){
    this.displayModeList = !this.displayModeList;
  }

  mostrarpdf2(docId: number){
    this.currentDocumentId = docId;
    this.file64 = null;
    this.filename = null;
    this.category = '';
    this.showLoadAttachement = false;
    this.cargandoSoporte = false;
    this.currentCufe = null;
    this.currentType = null;
    this.detailPreloader = true;
    $('#modalDetalleDocumento').modal('show');
    this.serv.connectService(docId).subscribe( (dato: any) => {
      this.pdfBase64 =  dato.result.base64;
      this.currentCufe =  dato.result.uuid;
      this.currentType =  dato.result.documentType;
      if( !dato.result.statusDetails ){
        this.rejectReason = '';
      } else {
        this.rejectReason =  dato.result.statusDetails;
      }
      switch ( dato.result.documentType ) {
        case 1: {
          this.currentType = 'INVOICE';
          break;
        }
        case 2: {
          this.currentType = 'CREDIT_NOTE';
          break;
        }
        case 3: {
          this.currentType = 'DEBIT_NOTE';
          break;
        }
      }
      console.log('Tipo doc:', this.currentType);
      this.currentStatus =  dato.result.statusId;
      if (dato.result.docs) {
        const documents = dato.result.docs;
        documents.forEach( doc => {
          const docType = doc.docType;
          switch ( docType ) {
            case 'Attached document to customer': {
              this.arrAttachedDocs.push( doc );
              break;
            }
            case 'Application Response': {
              this.arrApplicationResponseDocs.push( doc );
              break;
            }
            case 'Signed UBL': {
              this.signedUbl = doc;
              break;
            }
            case 'Unsigned UBL': {
              this.unsignedUbl = doc;
              break;
            }
            case 'Billing document attachment': {
              this.arrBillingDocumentAttachementDocs.push( doc );
              break;
            }
          }
        });
      }
      if( this.currentStatus === 3010 && this.currentCufe){ // Cambio a recivida si esta en enviada.
        if(this.env.overallPermissions.showStatusChange){
          this.changeStatus(this.currentCufe, 'RECEIVED', this.currentType, '');
          this.currentStatus = 3011;
        } else {
          // El usuario no tiene permiso para realizar cambios en el estado de un documento..
          // Debe cerrar el documento e impedir su visualización
          $('#modalBuscadorEmision').modal('hide');
          $('#modalDetalleDocumento').modal('hide');
          console.log('Fallo: No tiene permisos para cambiar el estado');
        }
      }
      this.detailPreloader = false;
      this._ga.eventEmitter('Recepción', 'Detalle de Documento', 'Correctos', docId.toString(), 1);
    }, async error => {
      window.scrollTo(0, 0);
      const errorStatus = error.status;
      if ( errorStatus === 401 ){
        this.router.navigate(['/']);
      }
      if ( errorStatus === 500){

        this.preloader = false;
        this.err500 = true;
      }
      await this.delay(500);
      $('#modalBuscadorEmision').modal('hide');
      $('#modalDetalleDocumento').modal('hide');
      this._ga.eventEmitter('Recepción', 'Detalle de Documento', 'Con Error', errorStatus.toString(), 1);
    });
  }

  pdfZoomIn() {
    if (this.zoomPdf < this.maxZoomAllowed) {
      this.zoomPdf += 0.2;
    }
  }
  pdfZoomOut() {
    if (this.zoomPdf > this.minZoomAllowed) {
      this.zoomPdf -= 0.2;
    }
  }
  pdfZoomReset() {
    this.zoomPdf = 1;
  }
  documentDetail(documentId){
    // Muestra el detalle cuando se hace click sobre una tarjeta
    this.mostrarpdf2(documentId);
  }
  showTableDetails(event){
    this.resetDataDetails();
    // Muestra el detalle cuando se hace click sobre una  fila de la tabla. Debe transmitir el id del documento del hijo al padre.
    const documentId = event.documentId;
    this.mostrarpdf2(documentId);
  }

   b64toBlob (b64Data, contentType = '', sliceSize= 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  resultsDownload(): void{
    this.resultsDownloadProcess = true;
    this.excelDownload.connectService(this.filterParameters).subscribe( (base64: any) => {
      const cadenaB64 = base64.documentBase64;
      const cType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      const blob = this.b64toBlob( cadenaB64, cType, 512);
      saveAs(blob, 'resultados.xlsx');
      this.resultsDownloadProcess = false;
    }, error => {
      window.scrollTo(0, 0);
      const errorStatus = error.status;
      $('#modalBuscadorEmision').modal('hide');
      $('#modalDetalleDocumento').modal('hide');
      if ( errorStatus === 401 ){ // Authorization error... invalid token or token expired.
        this.router.navigate(['/']);
      }
      if ( errorStatus === 500){
        this.preloader = false;
        this.err500 = true;
      }
    });
  }

  graphRepresentationDownload(){
    this.loaderPdf = true;
    const cadenaB64 = this.pdfBase64;
    const cType = 'application/pdf';
    this.downloadBase64File(cadenaB64, cType, 'documento.pdf');
    this.loaderPdf = false;
  }

  signedUblDownload(){
    this.loaderSignedUbl = true;
    const docId = this.signedUbl.documentId;
    this.attachedDocs.connectService( docId ).subscribe( (data: any) => {
      const b64 = data.downloadDocumentFileResponse.documentlB64;
      const cType = 'application/xml';
      this.downloadBase64File(b64, cType, 'XML.xml');
      this.loaderSignedUbl = false;
    }, error => {
      window.scrollTo(0, 0);
      const errorStatus = error.status;
      $('#modalBuscadorEmision').modal('hide');
      $('#modalDetalleDocumento').modal('hide');
      if ( errorStatus === 401 ){
        this.router.navigate(['/']);
      }
      if ( errorStatus === 500){
        this.preloader = false;
        this.err500 = true;
      }
    });
  }

  appResponseDownload(ind: number){
    this.loaderAR = true;
    const docId = this.arrApplicationResponseDocs[ind].documentId;
    const docName = 'AR-'+this.arrApplicationResponseDocs[ind].docName;
    this.attachedDocs.connectService( docId ).subscribe( (data: any) => {
      const b64 = data.downloadDocumentFileResponse.documentlB64;
      const cType = 'application/xml';
      this.downloadBase64File(b64, cType, docName);
      this.loaderAR = false;
    }, error => {
      window.scrollTo(0, 0);
      const errorStatus = error.status;
      $('#modalBuscadorEmision').modal('hide');
      $('#modalDetalleDocumento').modal('hide');
      if ( errorStatus === 401 ){
        this.router.navigate(['/']);
      }
      if ( errorStatus === 500){
        this.preloader = false;
        this.err500 = true;
      }
    });
  }

  attachedDocumentsDownload(ind: number){
    this.loaderAD = true;
    const docId = this.arrAttachedDocs[ind].documentId;
    const docName = 'AD-'+this.arrAttachedDocs[ind].docName;
    this.attachedDocs.connectService( docId ).subscribe( (data: any) => {
      const b64 = data.downloadDocumentFileResponse.documentlB64;
      const cType = 'application/xml';
      this.downloadBase64File(b64, cType, docName);
      this.loaderAD = false;
    }, error => {
      window.scrollTo(0, 0);
      const errorStatus = error.status;
      $('#modalBuscadorEmision').modal('hide');
      $('#modalDetalleDocumento').modal('hide');
      if ( errorStatus === 401 ){
        this.router.navigate(['/']);
      }
      if ( errorStatus === 500){
        this.preloader = false;
        this.err500 = true;
      }
    });
  }

  billDocAttDocDownload(ind: number){
    this.loaderAtt = true;
    const docId = this.arrBillingDocumentAttachementDocs[ind].documentId;
    const docName = this.arrBillingDocumentAttachementDocs[ind].docName;
    this.attachedDocs.connectService( docId ).subscribe( (data: any) => {
      const b64 = data.downloadDocumentFileResponse.documentlB64;
      const cType = 'application/xml';
      this.downloadBase64File(b64, cType, docName);
      this.loaderAtt = false;
    }, error => {
      window.scrollTo(0, 0);
      const errorStatus = error.status;
      $('#modalBuscadorEmision').modal('hide');
      $('#modalDetalleDocumento').modal('hide');
      if ( errorStatus === 401 ){
        this.router.navigate(['/']);
      }
      if ( errorStatus !== 401){
        this.preloader = false;
        this.err500 = true;
      }
    });
  }

  downloadBase64File(b64: string, cType: string, filename: string){
    const blob = this.b64toBlob( b64, cType, 512);
    saveAs(blob, filename);
  }

  resetDataDetails(){
    this.pdfBase64 = null;
    this.unsignedUbl = null;
    this.signedUbl = null;
    this.arrAttachedDocs = [];
    this.arrApplicationResponseDocs = [];
    this.arrBillingDocumentAttachementDocs = [];
    this.loaderAD = false;
    this.loaderAR = false;
    this.loaderAtt = false;
    this.loaderPdf = false;
    this.loaderSignedUbl = false;
    this.currentCufe = null;
    this.currentStatus = null;
    this.currentType = null;
    this.rejectReason = '';
    this.aprovedOpen = false;
    this.rejetcOpen = false;
  }

  pageChanged(event){
    this.currentPage = event;
    this.getInvoices();
  }

  getActiveBranchesNames() {
    const namesArray = [];
    const userData = JSON.parse(localStorage.getItem('user'));
    const companiesData = userData.companies;
    const storedBranches = JSON.parse(localStorage.getItem('currentBranches'));
    if (storedBranches) {
      storedBranches.forEach( selectedBranches => {
        companiesData.forEach(company => {
          company.branches.forEach(branch => {
            if ( branch.branchId === Number(selectedBranches)){
              const currentName = branch.name;
              const obj = {
                name : branch.name,
                color: branch.color
              };
              namesArray.unshift(obj);
            }
          });
        });
      });
    }
    return namesArray;
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  changeListener($event) : void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    this.filename = file.name;

    const arrFileName = this.filename.split('.');
    const ultExtension = arrFileName[arrFileName.length-1].toLowerCase();
    if(ultExtension === 'pgp' && arrFileName.length > 2){
      this.extension = arrFileName[arrFileName.length-2].toLowerCase() + '.' + ultExtension.toLowerCase();
    }else{
      this.extension = ultExtension;
    }
    myReader.onloadend = (e) => {
      this.file = myReader.result;
      const arrFile = this.file.split(',');
      this.file64 = arrFile[1];
    };
    myReader.readAsDataURL(file);
  }

  toggleLoadAttachement(): void {
    this.file64 = null;
    this.filename = null;
    this.category = '';
    this.showLoadAttachement = !this.showLoadAttachement;
  }

  loadFile(){
    this.cargandoSoporte = true;
    this.servSoporte.connectService(this.file64, this.filename, this.currentDocumentId, this.category).subscribe( (data: any) =>  {
      this.cargandoSoporte = false;
    }, error => {
      $('#modalBuscadorEmision').modal('hide');
      $('#modalDetalleDocumento').modal('hide');
      const errorStatus = error.status;
      if( errorStatus === 401 ){
        this.router.navigate(['/']);
      }
      if( errorStatus === 500 || errorStatus === 404){
        this.cargandoSoporte = false;
        this.err500 = true;
      }
    } );
  }

  changeStatus(cufe: string, stat: string, type: string, dets: string): void {
    dets = dets + ' ';
    const params = {
      details: dets,
      documentType: type,
      status: stat,
      username: this.env.userEmail,
      uuid: cufe
      };
    this.statusChanger.connectService(params).subscribe ( (data: any) => {
    }, error => {
      window.scrollTo(0, 0);
      const errorStatus = error.status;
      $('#modalBuscadorEmision').modal('hide');
      $('#modalDetalleDocumento').modal('hide');
      if ( errorStatus === 401 ){
        this.router.navigate(['/']);
      }
      if ( errorStatus === 500){
        this.preloader = false;
        this.err500 = true;
      }
    });
  }

  scrolea( elemento ){
    let element, headerOffset, elementPosition, offsetPosition;
    if(!this.scrollInicial && window.scrollY === 0){
      element = document.getElementById(elemento);
      headerOffset = 70;
      elementPosition = element.getBoundingClientRect().top;
      offsetPosition = elementPosition - headerOffset;
      this.scrollInicial = offsetPosition;
    }
    window.scrollTo({
          top: this.scrollInicial,
          behavior: 'smooth'
    });
  }

  confirmReject(){
    this.rejectReason = '';
    this.rejetcOpen = true;
  }

  cancelReject(){
    this.rejetcOpen = false;
  }

  confirmAcept(){
    this.rejectReason = '';
    this.aprovedOpen = true;
  }

  cancelAcept(){
    this.aprovedOpen = false;
  }

  aprobarDocumento(): void {
    this.changeStatus(this.currentCufe, 'ACCEPTED', this.currentType, this.rejectReason);
    this.currentStatus = 3012;
    this._ga.eventEmitter('Recepción', 'Aprobación de Documentos', 'Ok', this.currentDocumentId.toString(), 1);
  }

  rechazarDocumento(): void {
    this.changeStatus(this.currentCufe, 'REJECTED', this.currentType, this.rejectReason);
    this.currentStatus = 3014;
    this._ga.eventEmitter('Recepción', 'Rechazo de Documentos', 'Ok', this.currentDocumentId.toString(), 1);
  }

  startTutorial(): void {
    this.shepherdService.modal = true;
    this.shepherdService.confirmCancel = false;
    this.shepherdService.addSteps( this.tutorialSteps );
    this.shepherdService.start();
  }
  initTutorialSteps(): void {
    this.shepherdService.defaultStepOptions = {
      cancelIcon: {
        enabled: true
      },
      classes: 'custom-class-name-1 custom-class-name-2',
      highlightClass: 'highlight',
      scrollTo: false,
    };


    this.tutorialSteps = [
      { // ================================================= INTRO
        id: 'intro',
        title: 'Búsqueda de Facturas Emitidas.',
        text: ['A continuación le guiaremos a través de esta interfaz que le permite encontrar uno o varios documentos emitidos. Haga clic en "Iniciar" para comenzar el recorrido.'],
        buttons: [
          {
            classes: 'shepherd-button shepherd-button-secondary',
            text: 'Omitir',
            type: 'cancel'
          },
          {
            classes: 'shepherd-button',
            text: 'Iniciar',
            type: 'next'
          }
        ]
      },
      { // =================================================  PASO 1
        id: 'paso1',
        attachTo: {
          element: '.paso1',
          on: 'right'
        },
        title: 'Buscar Documentos Emitidos.',
        text: ['Haga clic sobre este botón para desplegar la ventana de criterios de búsqueda.'],
        buttons: [
          {
            classes: 'shepherd-button',
            text: '<< Ant',
            type: 'back'
          },
          {
            classes: 'shepherd-button',
            text: 'Sig >>',
            type: 'next'
          }
        ]
      },
      { // =================================================  PASO 2
        id: 'paso2',
        attachTo: {
          element: '.paso2',
          on: 'right'
        },
        title: 'Alternar Vista Resultados.',
        text: ['Haga clic sobre este botón para alternar la vista de resultados de documentos, entre tarjetas o filas.'],
        buttons: [
          {
            classes: 'shepherd-button',
            text: '<< Ant',
            type: 'back'
          },
          {
            classes: 'shepherd-button',
            text: 'Sig >>',
            type: 'next'
          }
        ]
      },
      { // =================================================  PASO 3
        id: 'paso3',
        attachTo: {
          element: '.paso3',
          on: 'right'
        },
        title: 'Total Resultados.',
        text: ['En esta área se situa el número total de documentos encontrados. Tenga en cuenta que se visualizan 20 documentos por página.'],
        buttons: [
          {
            classes: 'shepherd-button',
            text: '<< Ant',
            type: 'back'
          },
          {
            classes: 'shepherd-button',
            text: 'Sig >>',
            type: 'next'
          }
        ]
      },
      { // =================================================  PASO 4
        id: 'paso4',
        attachTo: {
          element: '.paso4',
          on: 'right'
        },
        title: 'Orden y Sentido de Resultados.',
        text: ['Aquí puede verse la manera como están ordenados los resultados de búsqueda. Es posible ajustar el orden por: Fecha de emisión, No. de documento, Valor y Adquiriente. Adicionalmente muestra si el sentido es ascendente o descendente.'],
        buttons: [
          {
            classes: 'shepherd-button',
            text: '<< Ant',
            type: 'back'
          },
          {
            classes: 'shepherd-button',
            text: 'Sig >>',
            type: 'next'
          }
        ]
      },
      { // =================================================  PASO 5
        id: 'paso5',
        attachTo: {
          element: '.paso5',
          on: 'bottom'
        },
        title: 'Sucursales Activas.',
        text: ['Si el usuario posee privilegios “multi-sucursal” sabrá que los resultados corresponden únicamente a estas sucursales.'],
        buttons: [
          {
            classes: 'shepherd-button',
            text: '<< Ant',
            type: 'back'
          },
          {
            classes: 'shepherd-button',
            text: 'Sig >>',
            type: 'next'
          }
        ]
      },
      { // =================================================  PASO 6
        id: 'paso6',
        attachTo: {
          element: '.paso6',
          on: 'bottom'
        },
        title: 'Documentos Encontrados.',
        text: ['En esta área se visualizan todos los documentos resultantes del proceso de filtrado.'],
        buttons: [
          {
            classes: 'shepherd-button',
            text: '<< Ant',
            type: 'back'
          },
          {
            classes: 'shepherd-button',
            text: 'Sig >>',
            type: 'next'
          }
        ]
      },
      { // =================================================  PASO 7
        id: 'paso7',
        attachTo: {
          element: '.paso7',
          on: 'top'
        },
        title: 'Controles de Paginación.',
        text: ['Este elemento permite moverse dentro de la paginación de resultados. Tenga en cuenta que cada página contiene un máximo de 20 documentos. '],
        buttons: [
          {
            classes: 'shepherd-button',
            text: '<< Ant',
            type: 'back'
          },
          {
            classes: 'shepherd-button',
            text: 'Sig >>',
            type: 'next'
          }
        ]
      },
      { // =================================================  PASO 8
        id: 'paso8',
        attachTo: {
          element: '.paso8',
          on: 'top'
        },
        title: 'Paso 8.',
        text: ['Ocho emision'],
        buttons: [
          {
            classes: 'shepherd-button',
            text: '<< Ant',
            type: 'back'
          },
          {
            classes: 'shepherd-button',
            text: 'Sig >>',
            type: 'next'
          }
        ]
      },
      { // =================================================  PASO 9
        id: 'paso9',
        attachTo: {
          element: '.paso9',
          on: 'left'
        },
        title: 'Paso 9.',
        text: ['Rastreo emision'],
        buttons: [
          {
            classes: 'shepherd-button',
            text: '<< Ant',
            type: 'back'
          },
          {
            classes: 'shepherd-button',
            text: 'Sig >>',
            type: 'next'
          }
        ]
      },
      { // =================================================  Final
        id: 'fin',
        title: 'Fin del Recorrido.',
        text: ['Si desea información mas completa y detallada acerca de este proceso, puede consultar la <a href="/ayuda">Ayuda en Línea</a>.'],
        buttons: [
          {
            classes: 'shepherd-button',
            text: 'Finalizar',
            type: 'cancel'
          }
        ]
      }
    ];
  }


}
