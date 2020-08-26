import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CheckpermService } from '../checkperm.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor( private chechPerm: CheckpermService ) {
    console.log(chechPerm.getOverAllPermissions());
  }
  canActivate (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if ( this.chechPerm.getOverAllPermissions().includes('1') ){
        return true;
      } else {
        return false;
      }
  }
  
}
