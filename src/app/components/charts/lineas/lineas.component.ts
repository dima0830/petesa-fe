import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
// import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-lineas',
  templateUrl: './lineas.component.html',
  styleUrls: ['./lineas.component.css']
})
export class LineasComponent implements OnInit {
  @Input() datos: ChartDataSets[];
  @Input() etiquetas: any;
  @Input() colors: string;
  lineChartColors: Color[];
  public lineChartData = this.datos;

  public lineChartLabels: Label[] = ['Enero', 'Febrero', 'Marzo'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    elements: {
      line: {
          tension: 0.1
      }
  },
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {}
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  // public lineChartColors: Color[] = [
  //   { // Blue
  //     backgroundColor: 'rgba(56,48,130,0.3)',
  //     borderColor: 'rgba(56,48,130,1)',
  //     pointBackgroundColor: 'rgba(56,48,130,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  //   },
  //   { // Yellow
  //     backgroundColor: 'rgba(255,193,7,0.3)',
  //     borderColor: 'rgba(255,193,7,0.8)',
  //     pointBackgroundColor: 'rgba(255,193,7,0.8)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(77,83,96,1)'
  //   },
  //   { // red
  //     backgroundColor: 'rgba(255,0,0,0.3)',
  //     borderColor: 'red',
  //     pointBackgroundColor: 'rgba(148,159,177,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  //   }
  // ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  // public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor() {
    
  }

  ngOnInit() {
    this.lineChartColors = this.selectColor( this.colors );
    // console.log('colorSet:', this.lineChartColors);
  }

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.length; i++) {
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        this.lineChartData[i].data[j] = this.generateNumber(i);
      }
    }
    this.chart.update();
  }

  private generateNumber(i: number) {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public hideOne() {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
  }

  public pushOne() {
    this.lineChartData.forEach((x, i) => {
      const num = this.generateNumber(i);
      const data: number[] = x.data as number[];
      data.push(num);
    });
    this.lineChartLabels.push(`Label ${this.lineChartLabels.length}`);
  }

  selectColor( index ) {
    let colorSet = [];
    if ( index === 1 ) {
      colorSet = [
        { // Blue
          backgroundColor: 'rgba(56,48,130,0.3)',
          borderColor: 'rgba(56,48,130,1)',
          pointBackgroundColor: 'rgba(56,48,130,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // Yellow
          backgroundColor: 'rgba(255,193,7,0.3)',
          borderColor: 'rgba(255,193,7,0.8)',
          pointBackgroundColor: 'rgba(255,193,7,0.8)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        { // red
          backgroundColor: 'rgba(255,0,0,0.3)',
          borderColor: 'red',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
      ];
    }
    if ( index === 2 ) {
      colorSet = [
        { // Yellow
          backgroundColor: 'rgba(255,193,7,0.3)',
          borderColor: 'rgba(255,193,7,0.8)',
          pointBackgroundColor: 'rgba(255,193,7,0.8)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        { // red
          backgroundColor: 'rgba(255,0,0,0.3)',
          borderColor: 'red',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // Blue
          backgroundColor: 'rgba(56,48,130,0.3)',
          borderColor: 'rgba(56,48,130,1)',
          pointBackgroundColor: 'rgba(56,48,130,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
      ];
    }
    return colorSet;
  }
}