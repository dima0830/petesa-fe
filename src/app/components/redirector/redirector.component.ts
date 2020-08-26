import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-redirector',
  template: ` `,
  styles: []
})
export class RedirectorComponent implements OnInit {
  env = environment;
  constructor( private activatedRoute: ActivatedRoute, private router: Router ) {
   
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe( parametro => {
      const param =  +parametro['documentId'];
      if(!Number.isNaN(param)){
        localStorage.setItem('redirector', param.toString());
        this.router.navigate(['/']);
      }else{
        this.router.navigate(['/']);
      }
    });
  }

}
