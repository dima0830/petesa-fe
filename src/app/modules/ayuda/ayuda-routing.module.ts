import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AyudaComponent } from '../../components/ayuda/ayuda.component';


const routes: Routes = [
    { path: '', component: AyudaComponent },
    // { path: 'dashboard', component: dashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AyudaRoutingModule { }