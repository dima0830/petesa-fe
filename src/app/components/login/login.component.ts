import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login.service';
import { NgForm } from '@angular/forms';
import { DataTransportService } from '../../services/data-transport.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { GoogleAnalyticsService } from '../../services/google-analytics.service';
import { LibraryComponent } from '../../jslib/library/library.component';
import { RecordarContrasenaService } from '../../services/recordar-contrasena.service';

declare var $: any;

@Component({
  providers: [LibraryComponent],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  myParams: object = {};
  width = 100;
  height = '100px';

  userToStore: object = {};
  companiesToStore = [];
  env = environment;
  switchMessage: string;
  loginLoading = false;
  loginFailed = false;
  loginRequest = {
    usr: null,
    pwd: null
  };
  errorStatus = null;
  emailRecordarContrasena = '';
  recordarContrasenaLoading = false;
  recordarContrasenaConfirma = false;
  recordarContrasenaError = false;

  colorSet = ['#007bff','#ff0029', '#66a61e', '#984ea3', '#00d2d5', '#ff7f00', '#af8d00', '#377eb8',
  '#7f80cd', '#b3e900', '#c42e60', '#a65628', '#f781bf', '#8dd3c7', '#bebada',
  '#fb8072', '#80b1d3', '#fdb462', '#fccde5', '#bc80bd', '#ffed6f', '#c4eaff',
  '#cf8c00', '#1b9e77', '#d95f02', '#e7298a', '#e6ab02', '#a6761d', '#0097ff',
  '#00d067', '#000000', '#252525', '#525252', '#737373', '#969696', '#bdbdbd',
  '#f43600', '#4ba93b', '#5779bb', '#927acc', '#97ee3f', '#bf3947', '#9f5b00',
  '#f48758', '#8caed6', '#f2b94f', '#eff26e', '#e43872', '#d9b100', '#9d7a00',
  '#698cff', '#d9d9d9', '#00d27e', '#d06800', '#009f82', '#c49200', '#cbe8ff',
  '#fecddf', '#c27eb6', '#8cd2ce', '#c4b8d9', '#f883b0', '#a49100', '#f48800',
  '#27d0df', '#a04a9b'];


  constructor( private loginService: LoginService, 
               private dataSwitch: DataTransportService, 
               private router: Router,
               private serv: RecordarContrasenaService, 
               private _ga: GoogleAnalyticsService,
               public libr: LibraryComponent ) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.libr.resetEnviromentPermissions();
    this.dataSwitch.emitChange( this.libr.getOverAllPermissions() );
    const overallPermissions = this.libr.getOverAllPermissions();
    this.libr.modifyEnviromentPermissions( overallPermissions );
    this.showNavbar();
  }

  logIn(form: NgForm) {
    // Envía datos del formulario para autenticación
    this.loginLoading = true;
    this.loginService.loginConnect(form.value).subscribe( (data: any) => {
      this.loginProcess(data);
    }, error => {
      this.loginLoading = false;
      this.loginFailed = true;
      this.loginRequest.pwd = null;
      // this.router.navigate(['login']);
      this._ga.eventEmitter('Errores', 'login_error', 'Errores de Autenticación', error.status, 1);
      this.errorStatus = error.status;
    }
     );
  }

  loginProcess( loginReply: any ): void {
    // Procesa el logín, según la respuesta del servicio.
    this.loginLoading = false;
    let userStructureOk = true;
    const serviceReply = loginReply;
    if ( serviceReply.access_token ) {
      const access_token = loginReply.access_token;
      const refresh_token = loginReply.refresh_token;
      const expires_in = loginReply.expires_in;
      const currentUser = loginReply.user;
      let userCompanies = loginReply.user.companies;
      let branchOfficesCount = 0;
      this.userToStore = currentUser;
      localStorage.setItem('access_token', JSON.stringify(access_token));
      localStorage.setItem('refresh_token', JSON.stringify(refresh_token));
      localStorage.setItem('expires_in', JSON.stringify(expires_in));

      const clearedCompanies = [];
      const arrFailedCompany = [];
      let colorAssigner = 0;
      userCompanies.forEach( (company, ind) => {
        const cleanerResult = this.companyCleaner(company);
        if( cleanerResult ){
          // Asignamos los posibles colores de identificacion
          cleanerResult.branches.forEach( brn => {
            brn.color = this.colorSet[colorAssigner];
            colorAssigner++;
          })
          clearedCompanies.push(cleanerResult)
        }
      });
      currentUser.companies = clearedCompanies;
      userCompanies = clearedCompanies;
      localStorage.setItem('user', JSON.stringify(currentUser));

      if ( userCompanies.length > 0) {
        userCompanies.forEach(element => {
          this.companyCleaner(element);
          const branchOffices = element.branches;
          if ( branchOffices.length > 0){
            branchOffices.forEach( branch => {
              branchOfficesCount ++ ;
              const permissions = branch.permissions;
              if (permissions.length < 1) {
                userStructureOk = false;
              }
            });
          } else {
            userStructureOk = false;
          }
        });
      } else {
        userStructureOk = false;
      }
      if ( userStructureOk ) {
        this.env.isLoggedIn = true;
        this.env.userEmail = JSON.parse( localStorage.getItem('user') ).email;
        if ( userCompanies.length === 1 && branchOfficesCount === 1 ) {
          const arrAlone = [];
          arrAlone.push(userCompanies[0].branches[0].branchId);
          localStorage.setItem('currentBranches', JSON.stringify(arrAlone));
          this.router.navigate(['/inicio']);
        } else {
          this.env.usesMultipleBranches = true;
          this.showCompanyOptions();
        }
      }
    }
  }

  showCompanyOptions() {
    this.dataSwitch.emitChange('1');
  }

  showNavbar(){
    const objeto = [];
    this.dataSwitch.emitChange('2');
  }

  companyCleaner( company: any ) {
    // Depura la información del usuario, compañías y branches
    const branches = company.branches;
    if ( branches ) { // Reviso si existen branches de la compañia
      const numBranches = branches.length;
      let arrFailedBranches = [];
      branches.forEach( (branch, bi) => {
        if ( !branch['permissions'] || branch['permissions'].length === 0 ){
          arrFailedBranches.push( bi );
        }
      });
      if ( arrFailedBranches.length > 0 ){
        if ( arrFailedBranches.length === numBranches ) {
          return false;
        } else {
          // se deben eliminar los branches con error
          arrFailedBranches.reverse();
          arrFailedBranches.forEach ( ind => {
            company.branches.splice(ind, 1);
            return company;
          })
        }
      }
    } else {
      return false;
    }
    return company;
  }

  openModalRecordar(){
    // Despliega ventana de recordar contraseña
    this.emailRecordarContrasena = '';
    this.recordarContrasenaLoading = false;
    this.recordarContrasenaConfirma = false;
    this.recordarContrasenaError = false;
    $('#resetPwdModal').modal('show');
  }

  recordarContrasena(){
    // Conecta al servicio de recordat contraseña y gestiona posibles respuestas.
    this.recordarContrasenaLoading = true;
    const params = {
      username: this.emailRecordarContrasena
    };
    this.serv.connectService(params).subscribe( (dato: any) => {
      console.log(dato);
      if(dato){
        if(dato.code === 0){
          this.emailRecordarContrasena = null;
          this.recordarContrasenaLoading = false;
          this.recordarContrasenaConfirma = true;
        }else{
          this.router.navigate(['/']);
        }
      }else{
        this.router.navigate(['/']);
      }
    },error => {
      window.scrollTo(0, 0);
      const errorStatus = error.status;
      if ( errorStatus === 400 ){ // usuario no existe
        this.recordarContrasenaError = true;
      }

      this.recordarContrasenaLoading = false;
      this.emailRecordarContrasena = null;
    });
  }


}