import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FilterDocument } from '../../models/documento-filtro.model';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-buscador-emision',
  templateUrl: './buscador-emision.component.html',
  styleUrls: ['./buscador-emision.component.css']
})
export class BuscadorEmisionComponent implements OnInit {
  @Output() pasarParametros = new EventEmitter();
  @Output() estadoFiltro = new EventEmitter();

  visibilidadBuscador = {
    documento: true,
    empresa: false,
    fecha: false
  };

  filters = new FilterDocument();

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
  }
  resetFilters(){
    // Limpia todos los filtros del formulario
    this.filters.invoiceFilterRequest.document.prefix = '';
    this.filters.invoiceFilterRequest.document.number = '';
    this.filters.invoiceFilterRequest.document.hasDebitNote = false;
    this.filters.invoiceFilterRequest.document.hasCreditNote = false;
    this.filters.invoiceFilterRequest.document.status = -1;
    this.filters.invoiceFilterRequest.buyer.query = '';
    this.fromDate = null;
    this.toDate = null;
    this.modelChange();
  }

  muestraDocumento() {
    // Maneja visibilidad de pestaña DOCUMENTO
    this.visibilidadBuscador = {
      documento: true,
      empresa: false,
      fecha: false
    };
  }

  muestraEmpresa() {
    // Maneja visibilidad de pestaña OBLIGADO A FACTURAR
    this.visibilidadBuscador = {
      documento: false,
      empresa: true,
      fecha: false
    };
  }

  muestraFecha() {
    // Maneja visibilidad de pestaña FECHAS
    this.visibilidadBuscador = {
      documento: false,
      empresa: false,
      fecha: true
    };
  }

  enviarFormulario(form: NgForm) {
    // Transfiere datos al componente padre: emisionComponent para procesarlos.
    this.filters.invoiceFilterRequest.date.begin = '';
    this.filters.invoiceFilterRequest.date.end = '';
    if( this.fromDate && !this.toDate){
      this.filters.invoiceFilterRequest.date.begin = this.fromDate.year + '-' + this.fromDate.month + '-' + this.fromDate.day;
      this.filters.invoiceFilterRequest.date.end = this.fromDate.year + '-' + this.fromDate.month + '-' + this.fromDate.day;
    }
    if( this.fromDate && this.toDate){
      this.filters.invoiceFilterRequest.date.begin = this.fromDate.year + '-' + this.fromDate.month + '-' + this.fromDate.day;
      this.filters.invoiceFilterRequest.date.end = this.toDate.year + '-' + this.toDate.month + '-' + this.toDate.day;
    }
    this.pasarParametros.emit({passValue: this.filters, withCriteria: this.withCriteria});
  }

  modelChange(){
    // Verifica si el modelo de datos original cambia.
    // Se usa para saber si existe algún criterio activo en el formulario.
    if( this.filters.invoiceFilterRequest.document.prefix.length === 0 &&
        this.filters.invoiceFilterRequest.document.number.length === 0 &&
        !this.filters.invoiceFilterRequest.document.hasCreditNote &&
        !this.filters.invoiceFilterRequest.document.hasDebitNote &&
        this.filters.invoiceFilterRequest.document.status.toString() === '-1' &&
        this.filters.invoiceFilterRequest.buyer.query.length === 0 &&
        !this.fromDate
    ){
      this.withCriteria = false;
    } else {
      this.withCriteria = true;
    }
  }

  onDateSelection(date: NgbDate) {
    // Llamado de callback al selecionar una fecha en el calendario
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

  isHovered(date: NgbDate) {
    // Callback al hacer rollover sobre una fecha
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    // Verifica si una fecha se encuentra dentro de un rango establecido.
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    // Verifica si la fecha seleccionada es un rango o un solo día.
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }
  selHoy(dp:any){
    // Selecciona como fecha del día actual
    this.toDate = this.calendario.getToday();
    this.fromDate = this.calendario.getToday();
    this.mesInicial = {
      year: this.anioActual,
      month: this.mesActual
    }
    dp.navigateTo(this.mesInicial);
    this.modelChange();
  }
  selAyer(dp:any){
    // Selecciona como fecha el día anterior al actual
    this.toDate = this.calendario.getPrev(this.calendario.getToday(), 'd', 1);
    this.fromDate = this.calendario.getPrev(this.calendario.getToday(), 'd', 1);
    this.mesInicial = {
      year: this.anioActual,
      month: this.mesActual
    }
    dp.navigateTo(this.mesInicial);
    this.modelChange();
  }

  // OJO: sel7dias() y sel30dias se puede reducir a un solo metodo con nuevo parametro: numDiasAtras
  sel7dias(dp:any){
    // Selecciona rango de fechas 30 días antes hasta hoy.
    this.toDate = this.calendario.getToday();
    this.fromDate = this.calendario.getPrev(this.calendario.getToday(), 'd', 7);
    this.mesInicial = {
      year: this.anioActual,
      month: this.mesActual
    }
    dp.navigateTo(this.mesInicial);
    this.modelChange();
  }

  // OJO: sel7dias() y sel30dias se puede reducir a un solo metodo con nuevo parametro: numDiasAtras
  sel30dias( dp: any ){
    // Selecciona rango de fechas 30 días antes hasta hoy.
    this.toDate = this.calendario.getToday();
    this.fromDate = this.calendario.getPrev(this.calendario.getToday(), 'd', 30);
    this.mesInicial = {
      year: this.anioActual,
      month: this.mesActual
    }
    dp.navigateTo(this.mesInicial);
    this.modelChange();
  }

  selMesPasado( dp:any ){
    // Selecciona desde el primer día hasta el último día del mes anterior al actual.
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
    // Limpia las fechas seleccionadas en el buscador
    this.fromDate = null; 
    this.toDate = null;
    this.modelChange();
  }

  private daysInMonth (month, year) {
    // Devuelve el número de días de un mes específico. Verifica años bisiestos
    return new Date(year, month, 0).getDate();
  }
}