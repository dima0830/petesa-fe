import { Component, OnInit } from '@angular/core';
import { CargafeService } from 'src/app/services/cargafe.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleAnalyticsService } from '../../services/google-analytics.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cargafe',
  templateUrl: './cargafe.component.html',
  styleUrls: ['./cargafe.component.css']
})
export class CargafeComponent implements OnInit {
  file = null;
  file64 = null;
  filename = null;
  extension = null;
  cargando = false;
  answer = false;
  trackId = null;
  arrSuppliers = [];
  selectedSuplier = '';
  err500 = false;
  env = environment;

  constructor( private serv: CargafeService, private router: Router, private _ga: GoogleAnalyticsService ) { }

  ngOnInit() {
    // Al inicializar el componente, carga los suplkiers del usuario
    this.getSuppliers();
  }

  changeListener($event) : void {
    // Callback al seleccionar un archivo
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    // Captura propiedades del archivo selecionado
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();
    this.filename = file.name;
    const arrFileName = this.filename.split('.');
    const ultExtension = arrFileName[arrFileName.length-1].toLowerCase();
    if(ultExtension === 'pgp' && arrFileName.length > 2){
      this.extension = arrFileName[arrFileName.length-2].toLowerCase() + '.' + ultExtension.toLowerCase();
    }else{
      this.extension = ultExtension;
    }
    myReader.onloadend = (e) => {
      this.file = myReader.result;
      const arrFile = this.file.split(',');
      this.file64 = arrFile[1];
    }
    myReader.readAsDataURL(file);
  }

  enviarArchivo(form: NgForm){
    // console.log('enviando: ', form)
  }

  loadFile() {
    // Consume el servicio para cargar el archivo
    this.cargando = true;
    this.serv.connectService(this.file64, this.filename, this.extension, this.selectedSuplier).subscribe( (data: any) =>  {
      this.trackId = data.trackId;
      this.cargando = false;
      this.answer = true;
      this._ga.eventEmitter('Emisión', 'Carga Documentos Web', 'Exitosos', data.trackId, 1);
    }, error => {
      const errorStatus = error.status;
      if( errorStatus === 401 ){
        this.router.navigate(['/']);
      }
      if( errorStatus === 500 || errorStatus === 404){
        this.cargando = false;
        this.err500 = true;
      }
      this._ga.eventEmitter('Emisión', 'Carga Documentos Web', 'Fallo', error.status, 1);
    } );
  }

  resetProcess(){
    // Reinicia el proceso
    this.file64 = null;
    this.answer = false;
  }

  getSuppliers() {
    // Carga los supliers del almacenamiento local
    const bTarget = JSON.parse(localStorage.getItem('currentBranches'));
    const dataUser = JSON.parse(localStorage.getItem('user'));
    const companies = dataUser.companies;
    bTarget.forEach( (currentBranchId) => {
      companies.forEach( company => {
        const companyBranches = company.branches;
        companyBranches.forEach( branch => {
          if(branch.branchId === currentBranchId){
            if( branch.permissions.includes(1)){
              const arrSupliers = company.suppliers;
              arrSupliers.forEach( (sup , ind) => {
              });
              this.arrSuppliers = this.arrSuppliers.concat(arrSupliers);
            }
          }
        });
      })
    });
    this.arrSuppliers = this.removeDuplicates(this.arrSuppliers, 'id');
  }

  removeDuplicates(originalArray, prop) {
    // Depura un array dejando solo un valor único por elemento.
    let newArray = [];
    let lookupObject  = {};
    for(var i in originalArray) {
       lookupObject[originalArray[i][prop]] = originalArray[i];
    }
    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
     return newArray;
  }
}
