import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResetPwdService } from '../../services/reset-pwd.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleAnalyticsService } from 'src/app/services/google-analytics.service';

declare var $: any;

@Component({
  selector: 'app-recordarcontrasena',
  templateUrl: './recordarcontrasena.component.html',
  styleUrls: ['./recordarcontrasena.component.css']
})
export class RecordarcontrasenaComponent implements OnInit {
  // https://secfevalpruebas.ptesa.com.co:8443/#/recordarcontrasena?t=Prrtp1FSVe9guZMjzFxctLDYUwZj-YIJ&f=20200406193252&ua=2
  contra = null;
  passwordConf = null;
  token = null;
  idUser = null;
  cadenaVencimiento: string;
  samePwd = true;
  fechaVencimiento: Date;

  precargaAct = false;

  env = environment;
  err500 = false;

  constructor( private serv: ResetPwdService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private _ga: GoogleAnalyticsService
             ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe( parametro => {
      if(parametro.t && parametro.ua && parametro.f){
        this.token = parametro.t;
        this.idUser = parametro.ua;
        this.cadenaVencimiento = parametro.f;
        const tiempoAhora = new Date();
        const anio = this.cadenaVencimiento.substring(0, 4);
        const mes = +this.cadenaVencimiento.substring(4, 6) - 1;
        const dia = this.cadenaVencimiento.substring(6, 8);
        const hora = this.cadenaVencimiento.substring(8, 10);
        const minuto = this.cadenaVencimiento.substring(10, 12);
        const segundo = this.cadenaVencimiento.substring(12, 14);
        this.fechaVencimiento = new Date(+anio, +mes, +dia, +hora, +minuto, +segundo, 0);
        if ( this.fechaVencimiento < tiempoAhora) {
          $('#expiraModal').modal('show');
        }
      } else {
        this.router.navigate(['/']);
      }
    });
  }
  setPwd(){
    const paramsPwd = {
      idUser: this.idUser,
      password: this.contra,
      token: this.token
    }
    this.precargaAct = true;
    this.serv.connectService(paramsPwd).subscribe( (dato: any) => {
      console.log(dato);
      if(dato){
        if(dato.code === 0){
          this.contra = null;
          this.passwordConf = null;
          // Proceso exitoso... abre ventana de confirmación de activación
          $('#confirmModal').modal('show');
          this.precargaAct = false;
          this._ga.eventEmitter('Usuarios', 'Recordar contraseña', 'Correctos', this.idUser.toString(), 1);
        }else{
          this.router.navigate(['/']);
        }
      }else{
        this.router.navigate(['/']);
      }
    },error => {
      window.scrollTo(0, 0);
      const errorStatus = error.status;
      if ( errorStatus === 400 ){ // ya activado
        $('#expiradoModal').modal('show');
      }
      if ( errorStatus === 500){
        this.err500 = true;
      }
      this.precargaAct = false;
      this.contra = null;
      this.passwordConf = null;
      this._ga.eventEmitter('Usuarios', 'Recordar contraseña', 'Con Error', this.idUser.toString(), 1);
    });
  }
  comparePwds(){
    if ( this.contra === this.passwordConf){
      this.samePwd = true;
    } else {
      this.samePwd = false;
    }
  }

  logout(){
    $('#confirmModal').modal('hide');
    $('#expiraModal').modal('hide');
    $('#expiradoModal').modal('hide');
    this.env.isLoggedIn = false;
    this.router.navigate(['/']);
  }

}
