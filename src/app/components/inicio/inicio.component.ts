import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AnaliticaService } from '../../services/analitica.service';
import { ChartDataSets } from 'chart.js';
import {  Color, Label } from 'ng2-charts';
import { NotificationsService } from 'src/app/services/notifications.service';
import { environment } from '../../../environments/environment';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataTransportService } from 'src/app/services/data-transport.service';
import { ShepherdService } from 'angular-shepherd';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, AfterViewInit {
  user = JSON.parse(localStorage.getItem('user'));
  companies = this.user.companies;
  userData = {
    name: '',
    surname: '',
    email: ''
  };
  currentBranches: [];
  outboundData: ChartDataSets[];
  outboundTitleX: Label[];
  outboundColors: Color;
  analiticaLoading = true;
  notificatiosLoading = true;
  notificationsList = [];
  env = environment;
  colorSet = ['#007bff', '#6610f2', '#dc3545', '#fd7e14', '#ffc107', '#28a745', '#6f42c1', '#6c757d'];
  actualFeature = null;

  navigationSubscription: Subscription;
  tutorialSteps = [];

  constructor(  private analiticaService: AnaliticaService,
                private notificacionsService: NotificationsService,
                private router: Router,
                private dataSwitch: DataTransportService,
                private shepherdService: ShepherdService ) {

    this.userData.name = this.getUser().name;
    this.userData.surname = this.getUser().surname;
    this.userData.email = this.getUser().email;
    this.outboundTitleX = [];
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.loadAuthorizedBranches();
      }
    });
   }

  ngOnInit() {
    this.setFeature( 0 );
    this.loadAuthorizedBranches();
    const redirector = JSON.parse(localStorage.getItem('redirector'));
    if (redirector){
      this.router.navigate(['/r']);
    }
  }

  ngAfterViewInit() {
  }
  getUser(){
    // Extrae los datos del usuario almacenado localmente.
   return JSON.parse(localStorage.getItem('user'));
  }

  loadNotificatios(){
    this.notificacionsService.notificationsConnect().subscribe( (resNotifications: any) => {
      this.notificatiosLoading = false;
      this.notificationsList = resNotifications.notificationsResponse.data.notifications;
    } );
  }

  getFeature( index: number ){
    // Definición de textos promocionales del inicio.
    let arrFeatures = [
      'En PTESA, la seguridad de la información de nuestros clientes es una prioridad. Contamos con certificado ISO 27001:2013 lo cual garantiza la integridad de los datos, así como de los sistemas encargados de procesarlos.',
      'Nuestra plataforma ha sido desarrollado por expertos arquitectos de software, siguiendo estrictos requerimientos de velocidad en el procesamiento de datos, lo cual garantiza el procesamiento de altos volúmenes de facturación.',
      'Ofrecemos soluciones modulares que permiten crecer según las necesidades de su empresa. Ponemos a su disposición un conjunto de herramientas adaptables a la capacidad de sus sistemas informáticos y de las necesidades específicas de su organización.',
      'Nuestra plataforma de facturación electrónica proporciona alternativas para segmentar operativamente las funciones de facturación por parte de sus empleados y colaboradores, limitado convenientemente las funciones disponibles para cada usuario.'
    ];
    return arrFeatures[index];
  }

  setFeature( index ){
    this.actualFeature = this.getFeature(index);
  }

  loadAuthorizedBranches(){
    // Carga los branches activos.
    this.currentBranches = JSON.parse(localStorage.getItem('currentBranches'));
  }

  cambiarCompany(){
    this.dataSwitch.emitChange('1');
  }

}
