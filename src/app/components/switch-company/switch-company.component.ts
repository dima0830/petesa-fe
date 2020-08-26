import { Component, OnInit } from '@angular/core';
import { DataTransportService } from 'src/app/services/data-transport.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { minSwitchValidator } from 'src/app/validators/minSwitchValidator';
import { environment } from '../../../environments/environment';
import { Counter } from '../misc/counter';
import { LibraryComponent } from '../../jslib/library/library.component';


@Component({
  providers: [LibraryComponent],
  selector: 'app-switch-company',
  templateUrl: './switch-company.component.html',
  styleUrls: ['./switch-company.component.css']
})
export class SwitchCompanyComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));
  companies = this.user.companies;
  storedBranchOffices = JSON.parse(localStorage.getItem('currentBranches'));
  switchMessage: string;
  BranchesGroup: FormGroup;
  selectedBranchesArray = [];
  env = environment;
  // counter = 0;
  totalCount =0;

  countInit() {
   return  this.totalCount++;
}
  branchCounter = 0;


  constructor( private dataSwitch: DataTransportService, private router: Router, public libr: LibraryComponent ) {
  }

  ngOnInit() { 
    const controls = {};
    let controlValue = false;
    this.companies.forEach( comp =>{
      // console.log('Switch entra a companies: ', comp)
      comp.branches.forEach( brn => {
        if(this.storedBranchOffices){
          if ( this.storedBranchOffices.includes(brn.branchId)) {
            controlValue = true;
          } else {
            controlValue = false;
          }
        }
        controls[ brn.branchId ] = new FormControl(controlValue);
      });
    });
    this.BranchesGroup = new FormGroup( controls, minSwitchValidator() );
  }

  setBrachOffices() {
    for (const key in this.BranchesGroup.value) {

      if (this.BranchesGroup.value.hasOwnProperty(key)) {
        const element = this.BranchesGroup.value[key];
        if ( element ) {
          this.selectedBranchesArray.push(key);
        }
      }
    }
    const arrBranchNumbers = this.selectedBranchesArray.map( function (item) {
      return parseInt(item, 10);
  })
    localStorage.setItem('currentBranches', JSON.stringify(arrBranchNumbers));
    this.libr.resetEnviromentPermissions();
    const overallPermissions = this.libr.getOverAllPermissions();
    this.libr.modifyEnviromentPermissions( overallPermissions );
    this.dataSwitch.emitChange('1');
    this.router.navigate(['/inicio']);
  }
  counterFn(branch){
    // this.counter = this.counter + 1;
    // console.log(this.counter, branch);
    // return this.counter;
  }
}
