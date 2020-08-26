import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CheckpermService } from '../checkperm.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OutboundSearchGuard implements CanActivate {
  env = environment;
  constructor( private chechPerm: CheckpermService, private router: Router ) {}

  canActivate( ): boolean {
      if ( this.env.overallPermissions.showOutboundSearch ) {
        return true;
      } else {
        this.router.navigate(['login']);
        return false;
      }
  }
  
}
