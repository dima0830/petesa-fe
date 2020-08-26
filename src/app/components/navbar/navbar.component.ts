import { Component, OnInit, Input } from '@angular/core';
import { CheckpermService } from 'src/app/services/checkperm.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { DataTransportService } from 'src/app/services/data-transport.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() permissionsDriver;
  env = environment;
  constructor( private chechPerm: CheckpermService,
               private dataSwitch: DataTransportService,
               private router: Router ) {
  }

  ngOnInit() {
  }

  showCompanyOptions() {
    // Dispara comando para abrir menú de empresas / branches.
    this.dataSwitch.emitChange('1');
  }

  goto(path) {
    // Cambia a una ruta definida.
    this.router.navigate([path]);
  }

}

