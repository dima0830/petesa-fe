import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FilterDocument } from '../../models/documento-filtro.model';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-buscador-recepcion',
  templateUrl: './buscador-recepcion.component.html',
  styleUrls: ['./buscador-recepcion.component.css']
})
export class BuscadorRecepcionComponent implements OnInit {
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

  resetFilters() {
    // Limpia el modelo de datos asociados al formulario de búsqueda.
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
    // Controla visivilidad de criterios de DOCUMENTO (Activa Pestaña)
    this.visibilidadBuscador = {
      documento: true,
      empresa: false,
      fecha: false
    };
  }

  muestraEmpresa() {
    // Controla visivilidad de criterios de OBLIGADO (Activa Pestaña)
    this.visibilidadBuscador = {
      documento: false,
      empresa: true,
      fecha: false
    };
  }

  muestraFecha() {
    // Controla visivilidad de criterios de FECHA (Activa Pestaña)
    this.visibilidadBuscador = {
      documento: false,
      empresa: false,
      fecha: true
    };
  }

  enviarFormulario(form: NgForm) {
    // Transmite los datos del modelo al componente padre para ejecutar la búsqueda (WS)
    this.filters.invoiceFilterRequest.date.begin = '';
    this.filters.invoiceFilterRequest.date.end = '';
    if( this.fromDate && !this.toDate) {
      this.filters.invoiceFilterRequest.date.begin = this.fromDate.year + '-' + this.fromDate.month + '-' + this.fromDate.day;
      this.filters.invoiceFilterRequest.date.end = this.fromDate.year + '-' + this.fromDate.month + '-' + this.fromDate.day;
    }
    if( this.fromDate && this.toDate) {
      this.filters.invoiceFilterRequest.date.begin = this.fromDate.year + '-' + this.fromDate.month + '-' + this.fromDate.day;
      this.filters.invoiceFilterRequest.date.end = this.toDate.year + '-' + this.toDate.month + '-' + this.toDate.day;
    }
    this.pasarParametros.emit({passValue: this.filters, withCriteria: this.withCriteria});
  }

  modelChange() {
    // Verifica si el modelo de datos cambia, para conocer si existe algún criterio de búsqueda activo.
    if( this.filters.invoiceFilterRequest.document.prefix.length === 0 &&
        this.filters.invoiceFilterRequest.document.number.length === 0 &&
        !this.filters.invoiceFilterRequest.document.hasCreditNote &&
        !this.filters.invoiceFilterRequest.document.hasDebitNote &&
        this.filters.invoiceFilterRequest.document.status.toString() === '-1' &&
        this.filters.invoiceFilterRequest.buyer.query.length === 0 &&
        !this.fromDate
    ) {
      this.withCriteria = false;
    } else {
      this.withCriteria = true;
    }
  }

  // OJO: LOS METODOS DE MANEJO DE FECHAS ESTÁN REPETIDOS EN VARIOS COMPONENTES
  // PENDIENTE: Mover metodos a librería compartida y adaptar

  onDateSelection(date: NgbDate) {
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
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  selHoy( dp: any ) {
    this.toDate = this.calendario.getToday();
    this.fromDate = this.calendario.getToday();
    this.mesInicial = {
      year: this.anioActual,
      month: this.mesActual
    }
    dp.navigateTo(this.mesInicial);
    this.modelChange();
  }

  selAyer( dp: any ) {
    this.toDate = this.calendario.getPrev(this.calendario.getToday(), 'd', 1);
    this.fromDate = this.calendario.getPrev(this.calendario.getToday(), 'd', 1);
    this.mesInicial = {
      year: this.anioActual,
      month: this.mesActual
    }
    dp.navigateTo(this.mesInicial);
    this.modelChange();
  }

  sel7dias( dp: any ) {
    this.toDate = this.calendario.getToday();
    this.fromDate = this.calendario.getPrev(this.calendario.getToday(), 'd', 7);
    this.mesInicial = {
      year: this.anioActual,
      month: this.mesActual
    }
    dp.navigateTo(this.mesInicial);
    this.modelChange();
  }
  sel30dias(dp: any) {
    this.toDate = this.calendario.getToday();
    this.fromDate = this.calendario.getPrev(this.calendario.getToday(), 'd', 30);
    this.mesInicial = {
      year: this.anioActual,
      month: this.mesActual
    }
    dp.navigateTo(this.mesInicial);
    this.modelChange();
  }
  selMesPasado(dp: any) {
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
  clearDate() {
    this.fromDate = null; 
    this.toDate = null;
    this.modelChange();
  }
  private daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
  }
}