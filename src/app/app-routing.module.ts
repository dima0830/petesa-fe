import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { EmisionComponent } from './components/emision/emision.component';
import { CargafeComponent } from './components/cargafe/cargafe.component';
import { AjustesComponent } from './components/ajustes/ajustes.component';
import { LoggedinGuard } from './services/guards/loggedin.guard';
import { RecepcionComponent } from './components/recepcion/recepcion.component';
import { RastreadorComponent } from './components/rastreador/rastreador.component';
import { ActivarUsuarioComponent } from './components/activar-usuario/activar-usuario.component';
import { OutboundSearchGuard } from './services/guards/outbound-search.guard';
import { InboundSearchGuard } from './services/guards/inbound-search.guard';
import { OutboundOperateGuard } from './services/guards/outbound-operate.guard';
import { ShowTrackSearchGuard } from './services/guards/show-track-search.guard';
import { RedirectorComponent } from './components/redirector/redirector.component';
import { RecordarcontrasenaComponent } from './components/recordarcontrasena/recordarcontrasena.component';

// OJO!!!!! AyudaComponent y AnaliticaComponent estan creados como componentes poero no se han importado al proyecto ni al app.module

// import { AyudaComponent } from './components/ayuda/ayuda.component';
// import { AnaliticaComponent } from './components/analitica/analitica.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'e', component: EmisionComponent, canActivate: [LoggedinGuard, OutboundSearchGuard] },
  { path: 'r', component: RecepcionComponent, canActivate: [LoggedinGuard, InboundSearchGuard] },
  { path: 'r/:documentId', component: RedirectorComponent },
  { path: 'e/cargar', component: CargafeComponent, canActivate: [LoggedinGuard, OutboundOperateGuard] },
  { path: 'inicio', component: InicioComponent, canActivate: [LoggedinGuard], runGuardsAndResolvers: 'always' },
  { path: 'ajustes', component: AjustesComponent, canActivate: [LoggedinGuard] },
  { path: 'rastreador', component: RastreadorComponent, canActivate: [LoggedinGuard, ShowTrackSearchGuard] },
  // { path: 'ayuda', loadChildren: () => import('./modules/ayuda/ayuda.module').then(m => m.AyudaModule) },
  // { path: 'analitica', component: AnaliticaComponent, canActivate: [LoggedinGuard] },
  { path: 'activarusuario', component: ActivarUsuarioComponent },
  { path: 'recordarcontrasena', component: RecordarcontrasenaComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { 
    onSameUrlNavigation: 'reload', 
    enableTracing: false,
    scrollPositionRestoration: 'top',
    useHash: true
   }) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }