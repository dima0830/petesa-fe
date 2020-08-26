import { Component, OnInit } from '@angular/core';
import { GetHelpService } from '../../services/get-help.service';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})
export class AyudaComponent implements OnInit {
  cadHtml;

  constructor( private srvAyuda: GetHelpService) { }

  ngOnInit() {
    this.srvAyuda.getChapter(3).subscribe( html => {
      console.log(html);
      this.cadHtml = html;
    })
  }

}
