import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-emisionf',
  templateUrl: './emisionf.component.html',
  styleUrls: ['./emisionf.component.css']
})
export class EmisionfComponent implements OnInit {
  env = environment;
  constructor() { }

  ngOnInit() {
  }

}
