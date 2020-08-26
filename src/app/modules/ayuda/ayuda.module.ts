import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AyudaRoutingModule } from './ayuda-routing.module';
import { AyudaComponent } from '../../components/ayuda/ayuda.component';
import { IndiceComponent } from '../../components/ayuda/indice/indice.component';
import { ContenidoAyudaComponent } from '../../components/ayuda/contenido-ayuda/contenido-ayuda.component';

@NgModule({
  declarations: [
    AyudaComponent,
    IndiceComponent,
    ContenidoAyudaComponent
  ],
  imports: [
    CommonModule,
    AyudaRoutingModule
  ]
})
export class AyudaModule { }
