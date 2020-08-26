import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivarUsuarioService } from '../../services/activar-usuario.service';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { GoogleAnalyticsService } from '../../services/google-analytics.service';

declare var $: any;

@Component({
  selector: 'app-activar-usuario',
  templateUrl: './activar-usuario.component.html',
  styleUrls: ['./activar-usuario.component.css']
})
export class ActivarUsuarioComponent implements OnInit {
    firstName = null;
    lastName = null;
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

  constructor ( private activatedRoute: ActivatedRoute, 
                private serv: ActivarUsuarioService, 
                private router: Router, 
                private _ga: GoogleAnalyticsService) {

                }


  ngOnInit() {
    // Al inicializar el componente, verifica que existen los parametros get requeridos
    // Interpreta el parametro de vencimiento en un objeto Date
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

        // OJO: Este comentario desactiva la validación por fecha de vencimiento
        // if ( this.fechaVencimiento < tiempoAhora) {
        //   $('#expiraModal').modal('show');
        // }

      } else {
        this.router.navigate(['/']);
      }
    }, error => {
      window.scrollTo(0, 0);
      const errorStatus = error.status;
      if ( errorStatus === 400 ){
        this.router.navigate(['/']);
      }
      if ( errorStatus === 500){
        this.err500 = true;
      }
    });
  }

  comparePwds(){
    // Verifica que los campos de nueva contraseña sean iguales.
    if ( this.contra === this.passwordConf){
      this.samePwd = true;
    } else {
      this.samePwd = false;
    }
  }

  userActivate(){
    // Consume el servicio del back-end y notifica su respuesta.
    // Registra el evento en G Analytics.
    const paramsActivar = {
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.contra,
      token: this.token,
      idUser: this.idUser
    }
    this.precargaAct = true;
    this.serv.connectService(paramsActivar).subscribe( (dato: any) => {
      if(dato){
        if(dato.code === 0){
          this.firstName = null;
          this.lastName = null;
          this.contra = null;
          this.passwordConf = null;
          $('#confirmModal').modal('show');
          this.precargaAct = false;
          this._ga.eventEmitter('Usuarios', 'Activación de Usuario', 'Correctos', this.idUser.toString(), 1);
        }else{
          this.router.navigate(['/']);
        }
      }else{
        this.router.navigate(['/']);
      }
    },error => {
      window.scrollTo(0, 0);
      const errorStatus = error.status;
      if ( errorStatus === 400 ){ // ya activado se debe corregir... NO DEBE RETORNAR CON CODIGO ERROR
        $('#yaActivadoModal').modal('show');
      }
      if ( errorStatus === 500){
        this.err500 = true;
      }
      this.precargaAct = false;
      this.firstName = null;
      this.lastName = null;
      this.contra = null;
      this.passwordConf = null;
      this._ga.eventEmitter('Usuarios', 'Activación de Usuario', 'Con Error', this.idUser.toString(), 1);
    });
  }

  logout(){
    // Limpia interfaz, resetea valores y redirecciona al inicio.
    $('#confirmModal').modal('hide');
    $('#expiraModal').modal('hide');
    $('#yaActivadoModal').modal('hide');
    this.env.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
