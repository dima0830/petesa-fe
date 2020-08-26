import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckpermService {

  constructor() { 

  }

  getPermisionByBranch ( branchId ) {
    const storedData = JSON.parse(localStorage.getItem('companies'));
    storedData.forEach(company => {
      company.branchOffices.forEach(branch => {
        if (branch === branchId){
          return branch.permissions;
        }
      });
    });
  }

  getOverAllPermissions() {
    // console.log('entra a getOverAllPermissions');
    const permArray = [];
    const storedData = JSON.parse(localStorage.getItem('companies'));
    const storedBranches = JSON.parse(localStorage.getItem('currentBranches'));
    if(storedBranches){
      storedBranches.forEach( selectedBranches => {
        storedData.forEach(company => {
          company.branchOffices.forEach(branch => {
            if ( branch.branchOfficeId === selectedBranches){
              const currentPermissions = branch.permissions;
              currentPermissions.forEach(perm => {
                if ( !permArray.includes(perm) ){
                  permArray.push(perm);
                }
              })
            }
          })
        })
      })
    }


    return permArray;
  }

}
