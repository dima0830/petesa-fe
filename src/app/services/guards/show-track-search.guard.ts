import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CheckpermService } from '../checkperm.service';

@Injectable({
  providedIn: 'root'
})
export class ShowTrackSearchGuard implements CanActivate {
  env = environment;
  constructor( private chechPerm: CheckpermService, private router: Router ) {}

  canActivate( ): boolean {
      if ( this.env.overallPermissions.showTrackDocSearch ) {
        return true;
      } else {
        this.router.navigate(['login']);
        return false;
      }
  }
  
}
