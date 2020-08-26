import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ChangePasswordService } from '../../services/change-password.service';

declare var $: any;


@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.css']
})

// OJO: Esta clase, solo se está ocupando del cambio de contraseña.

export class AjustesComponent implements OnInit {
  changePwdRequest = {
    username: '',
    newPassword: '',
    oldPassword: '',
    confirmPassword: ''
  };

  samePwd = true;
  errorPwd = false;
  err500 = false;
  preloader = false;
  env = environment;

  constructor( private changePwdService: ChangePasswordService, private router: Router) {
  }

  ngOnInit() {
    
  }

  comparePwds(){
    // Verifica que los nuevos passwords son iguales.
    if ( this.changePwdRequest.newPassword === this.changePwdRequest.confirmPassword){
      this.samePwd = true;
    } else {
      this.samePwd = false;
    }
  }

  changePassword( form: NgForm){
    // Conecta con el back-end y gestiona respuesta
    this.preloader = true;
    this.errorPwd = false;
    const finalForm = form.value;
    delete finalForm.confirmPassword;
    const username = JSON.parse(localStorage.getItem('user')).email;
    finalForm.username = username;
    console.log(finalForm);
    this.changePwdService.connectService( finalForm ).subscribe( (data: any) => {
      console.log(data);
      this.preloader = false;
      const codigoRespuesta = data.changePasswordResponse;
      if (codigoRespuesta === 0) {
        this.cleanModel();
        $('#confirmModal').modal('show');
      }else{
        if (codigoRespuesta === -1) {
          this.errorPwd = true;
          this.changePwdRequest.oldPassword = '';
        }
        if (codigoRespuesta === -2) {
          this.changePwdRequest.newPassword = '';
          this.changePwdRequest.confirmPassword = '';
          $('#pwdUsedModal').modal('show');
        }
      }
    }, error => {
      this.preloader = false;
      const errorStatus = error.status;
      if( errorStatus === 401 ){
        this.router.navigate(['/']);
      }
      if( errorStatus === 500){
        this.err500 = true;
        this.cleanModel();
      }
    });
  }
  cleanModel(){
    // Limpia todos los datos del modelo de datos
    this.changePwdRequest.username = null;
    this.changePwdRequest.oldPassword = null;
    this.changePwdRequest.newPassword = null;
    this.changePwdRequest.confirmPassword = null;
  }
  logout(){
    // Limpia interfaz y redirecciona al login.
    $('#confirmModal').modal('hide');
    this.env.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}