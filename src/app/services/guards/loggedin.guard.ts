import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CheckpermService } from '../checkperm.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggedinGuard implements CanActivate {
  env = environment;

  constructor( private chechPerm: CheckpermService, private router: Router ) {}

  canActivate( ): boolean {
      if ( this.env.isLoggedIn ) {
        return true;
      } else {
        this.router.navigate(['login']);
        return false;
      }
      // return true;
  }
}
