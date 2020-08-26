import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FilterDocument } from '../../models/documento-filtro.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-buscador-rastreador',
  templateUrl: './buscador-rastreador.component.html',
  styleUrls: ['./buscador-rastreador.component.css']
})
export class BuscadorRastreadorComponent implements OnInit {
  @Output() pasarParametros = new EventEmitter();
  @Output() estadoFiltro = new EventEmitter();


  arrSuppliers = [];
  documentsDataModel = {
    fileName: '',
    supplierId: '',
    creationDate: {
      startDate: '',
      endDate: ''
    },
    status: '-1',
    trackId: '',
    pager: {
      startPosition: 0,
      resultOffset: 0,
      fieldOrder: 'FECHA',
      order: 'ASC'
    }
  };

  withCriteria = false;
  d = new Date();
  mesActual = this.d.getMonth() + 1;
  anioActual = this.d.getFullYear();
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  mesInicial: object;
  calendario: NgbCalendar;

  constructor(calendar: NgbCalendar) {
    this.calendario = calendar;
    this.fromDate = null;
    this.toDate = null;
    this.mesInicial = {
      year: this.anioActual,
      month: this.mesActual
    };
  }

  ngOnInit() {
    // Al inicializar el componente, carga los supliers asociados al usuario
    this.getSuppliers();
  }

  resetFilters() {
    // Limpia los filtros del buscador
    this.documentsDataModel.supplierId = '';
    this.documentsDataModel.status = '';
    this.documentsDataModel.fileName = '';
    this.documentsDataModel.trackId = '';
    this.fromDate = null;
    this.toDate = null;
    this.modelChange();
  }


  enviarFormulario( form: NgForm ) {
    // Transmite los criterios de búsqueda al componente padre RastreadorComponent
    const paramsService = {
      supplierId: 0,
      dateStart: '',
      dateEnd: '',
      fileName: '',
      statusId: -1,
      trackId: '',
      resultOffset: 20,
      startPosition: 0
    }
    paramsService.dateStart = '';
    paramsService.dateEnd = '';
    if( this.fromDate && !this.toDate){
      paramsService.dateStart = this.fromDate.year + '-' + this.fromDate.month + '-' + this.fromDate.day;
      paramsService.dateEnd = this.fromDate.year + '-' + this.fromDate.month + '-' + this.fromDate.day;
    }
    if( this.fromDate && this.toDate){
      paramsService.dateStart = this.fromDate.year + '-' + this.fromDate.month + '-' + this.fromDate.day;
      paramsService.dateEnd = this.toDate.year + '-' + this.toDate.month + '-' + this.toDate.day;
    }
    paramsService.supplierId = parseInt(this.documentsDataModel.supplierId, 10);
    paramsService.fileName = this.documentsDataModel.fileName;
    if (this.documentsDataModel.status === '') {
      paramsService.statusId = -1;
    } else {
      paramsService.statusId = parseInt(this.documentsDataModel.status, 10);
    }
    paramsService.trackId = this.documentsDataModel.trackId;
    this.pasarParametros.emit({passValue: paramsService, withCriteria: this.withCriteria});
  }

  modelChange(){
    // Verifica si el modelo de datos del buscador tiene variaciones.
    // Se utiliza para visualizar si hay algún criterio activo en el buscador.
    if( this.documentsDataModel.supplierId === '' &&
        this.documentsDataModel.status === '' &&
        this.documentsDataModel.fileName.length === 0 &&
        this.documentsDataModel.trackId.length === 0 &&
        !this.fromDate
    ){
      this.withCriteria = false;
    } else {
      this.withCriteria = true;
    }
  }

  // OJO: LOS METODOS DE MANEJO DE FECHAS ESTÁN REPETIDOS EN VARIOS COMPONENTES
  // PENDIENTE: Mover metodos a librería compartida y adaptar

  onDateSelection(date: NgbDate): void {
    // Callback al evento de seleccionar una fecha.
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    this.modelChange();
  }

  isHovered(date: NgbDate): boolean {
    // Verifica si el usuario está sobre alguna fecha.
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate): boolean {
    // Verifica si una fecha se encuentra en un rango dado.
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate): boolean {
    // Verifica si la fecha inngresada es un rango o es un solo día
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  selHoy( dp: any ): void {
    // Selección rápida
    this.toDate = this.calendario.getToday();
    this.fromDate = this.calendario.getToday();
    this.mesInicial = {
      year: this.anioActual,
      month: this.mesActual
    }
    dp.navigateTo(this.mesInicial);
    this.modelChange();
  }

  selAyer( dp: any ): void {
    this.toDate = this.calendario.getPrev(this.calendario.getToday(), 'd', 1);
    this.fromDate = this.calendario.getPrev(this.calendario.getToday(), 'd', 1);
    this.mesInicial = {
      year: this.anioActual,
      month: this.mesActual
    }
    dp.navigateTo(this.mesInicial);
    this.modelChange();
  }

  sel7dias(dp:any){
    this.toDate = this.calendario.getToday();
    this.fromDate = this.calendario.getPrev(this.calendario.getToday(), 'd', 7);
    this.mesInicial = {
      year: this.anioActual,
      month: this.mesActual
    }
    dp.navigateTo(this.mesInicial);
    this.modelChange();
  }

  sel30dias(dp:any){
    this.toDate = this.calendario.getToday();
    this.fromDate = this.calendario.getPrev(this.calendario.getToday(), 'd', 30);
    this.mesInicial = {
      year: this.anioActual,
      month: this.mesActual
    }
    dp.navigateTo(this.mesInicial);
    this.modelChange();
  }

  selMesPasado( dp: any ){
    const d = new Date();
    const mesActual = d.getMonth() + 1;
    const mesAnterior = mesActual - 1;
    const anioActual = d.getFullYear();
    const numDiasMesAnterior = this.daysInMonth(mesAnterior, anioActual);
    this.fromDate.day = 1;
    this.fromDate.month = mesAnterior;
    this.toDate.day = numDiasMesAnterior;
    this.toDate.month = mesAnterior;
    this.mesInicial = {
      year: this.anioActual,
      month: mesAnterior
    };
    dp.navigateTo(this.mesInicial);
    this.modelChange();
  }
  clearDate(){
    this.fromDate = null; 
    this.toDate = null;
    this.modelChange();
  }
  private daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
  }

  getSuppliers(){
    // Extrae los supliersID´s del usuario logueado.
    const bTarget = JSON.parse(localStorage.getItem('currentBranches'));
    const dataUser = JSON.parse(localStorage.getItem('user'));
    const companies = dataUser.companies;
    bTarget.forEach( (currentBranchId) => {
      companies.forEach( company => {
        const companyBranches = company.branches;
        companyBranches.forEach( branch => {
          if(branch.branchId === currentBranchId){
            if( branch.permissions.includes(3)){
              const arrSupliers = company.suppliers;
              arrSupliers.forEach( (sup , ind) => {
              });
              this.arrSuppliers = this.arrSuppliers.concat(arrSupliers);
            }
          }
        });
      })
    });
    this.arrSuppliers = this.removeDuplicates(this.arrSuppliers, 'id');
  }

  removeDuplicates(originalArray, prop) {
    // Limpia un array de valores repetidos. Quedan solo valores únicos.
    const newArray = [];
    const lookupObject  = {};
    for(var i in originalArray) {
       lookupObject[originalArray[i][prop]] = originalArray[i];
    }
    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
     return newArray;
  }
}

