import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuscadorEmisionComponent } from './components/buscador-emision/buscador-emision.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { TarjetasComponent } from './components/shared/tarjetas/tarjetas.component';
import { LoginComponent } from './components/login/login.component';
import { EmisionfComponent } from './components/footers/emisionf/emisionf.component';
import { EmisionComponent } from './components/emision/emision.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CargafeComponent } from './components/cargafe/cargafe.component';
import { InfopieComponent } from './components/shared/infopie/infopie.component';
import { PrecargaComponent } from './components/shared/precarga/precarga.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AjustesComponent } from './components/ajustes/ajustes.component';
import { LineasComponent } from './components/charts/lineas/lineas.component';
import { PieComponent } from './components/charts/pie/pie.component';
// import { AlertasComponent } from './components/alertas/alertas.component';
import { BarrasComponent } from './components/charts/barras/barras.component';
import { PdfviewerComponent } from './components/pdfviewer/pdfviewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { HttpClientModule } from '@angular/common/http';
import { SwitchCompanyComponent } from './components/switch-company/switch-company.component';
import { Navbar0Component } from './components/shared/navbar0/navbar0.component';
import { LibraryComponent } from './jslib/library/library.component';
import { FilasComponent } from './components/shared/filas/filas.component';
import { RecepcionComponent } from './components/recepcion/recepcion.component';
import { BuscadorRecepcionComponent } from './components/buscador-recepcion/buscador-recepcion.component';
import { RastreadorComponent } from './components/rastreador/rastreador.component';
import { BuscadorRastreadorComponent } from './components/buscador-rastreador/buscador-rastreador.component';
import { ActivarUsuarioComponent } from './components/activar-usuario/activar-usuario.component';
import { StatusComponent } from './components/shared/status/status.component';
import { CounterPipe } from './pipes/counter.pipe';
import { RedirectorComponent } from './components/redirector/redirector.component';
import { RecordarcontrasenaComponent } from './components/recordarcontrasena/recordarcontrasena.component';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    BuscadorEmisionComponent,
    NavbarComponent,
    InicioComponent,
    TarjetasComponent,
    LoginComponent,
    EmisionfComponent,
    EmisionComponent,
    CargafeComponent,
    InfopieComponent,
    PrecargaComponent,
    UsuariosComponent,
    AjustesComponent,
    LineasComponent,
    PieComponent,
    BarrasComponent,
    PdfviewerComponent,
    SwitchCompanyComponent,
    Navbar0Component,
    LibraryComponent,
    FilasComponent,
    RecepcionComponent,
    BuscadorRecepcionComponent,
    RastreadorComponent,
    BuscadorRastreadorComponent,
    ActivarUsuarioComponent,
    StatusComponent,
    CounterPipe,
    RedirectorComponent,
    RecordarcontrasenaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatTooltipModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
  }),
  FormsModule,
  ReactiveFormsModule,
  ChartsModule,
  PdfViewerModule,
  HttpClientModule,
  NgxPaginationModule
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es' } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
