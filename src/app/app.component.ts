import { Component, OnInit} from '@angular/core';
import 'hammerjs';
import { DataTransportService } from './services/data-transport.service';
import { Router, NavigationEnd } from '@angular/router';

declare let gtag: (x: any, y: any, z: any) => void;
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showNavbar = false;
  changeCompany = false;
  title = 'portalfe';
  switchMessage: string;
  permissionsDriver = [];

  constructor( private dataSwitch: DataTransportService, public router: Router ) {
    dataSwitch.changeEmitted$.subscribe(
    data => {
      if ( typeof(data) === 'string' ){
        if ( data === '1'){
          this.changeCompany = !this.changeCompany;
        }
        if ( data === '2'){
          this.showNavbar = !this.showNavbar;
        }
      }
      if ( typeof(data) === 'object' ){
        this.permissionsDriver = data;
      }
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd){
        gtag('config', 'UA-158227335-1', { page_path: event.urlAfterRedirects});
        $('.navbar-collapse').collapse('hide');
       }
    });
  }

  ngOnInit() {
    console.log('%cPTESA   ', 'font-weight: bolder; font-size: 50px; color: rgba(0,66,122,1); text-shadow: 3px 3px 1px rgba(0,66,122,0.5) , 6px 6px 2px rgba(0,66,122,0.4) ');
    console.log('%c> Portal de Facturación Electrónica (V.P.) ', 'font-size: 16px; color: #ffffff; background-color: rgba(0,66,122,1); padding: 10px');
    console.log('%c¡ATENCIÓN! Esta función del navegador está diseñada únicamente para desarrolladores. El uso indebido de esta herramienta por parte de terceros constituye una violación que podría ser penalizada.', 'background-color: red; color:#ffffff; padding: 7px; margin:0px');
  }
  closeChangeCompany(){
    this.changeCompany = false;
  }
}
