import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pdfviewer',
  templateUrl: './pdfviewer.component.html',
  styleUrls: ['./pdfviewer.component.css']
})
export class PdfviewerComponent implements OnInit {
  @Input() cadenaB64: string;
  @Input() zoomPdf: number;
  pdfSrc: string;

  constructor() {}

  ngOnInit() {
  }

}
