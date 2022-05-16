import { Component, OnInit } from '@angular/core';
import * as chartsData from '../../shared/data/dashboard-eCommerce-v1';
import {ChartsService} from '../../dashboard/services/charts.service'
import * as CanvasJS from 'src/canvas/canvasjs.min';
// var CanvasJS = require('canvasjs');
// import CanvasJS from 'canvasjs';
@Component({
  selector: 'app-ecommerce-v1',
  templateUrl: './ecommerce-v1.component.html',
  styleUrls: ['./ecommerce-v1.component.scss']
})
export class EcommerceV1Component implements OnInit {

  eventcount:any=[];
  count:any;
  eventdata:any;
  dataPoints:any=[];

  // line - Chart 1
  public lineChartData = chartsData.lineChartData;
  public lineChartLabels = chartsData.lineChartLabels;
  public lineChartOptions = chartsData.lineChartOptions;
  public lineChartColors = chartsData.lineChartColors;
  public lineChartLegend = chartsData.lineChartLegend;
  public lineChartType = chartsData.lineChartType;

  
  // Doughnut - Chart 2
  public doughnutChartLabels = chartsData.doughnutChartLabels;
  public doughnutChartData = chartsData.doughnutChartData;
  public doughnutChartType = chartsData.doughnutChartType;
  public doughnutChartColors = chartsData.doughnutChartColors;
  public doughnutChartOptions = chartsData.doughnutChartOptions;

  
  // line - Chart 3
  public lineChart3Data = chartsData.lineChart3Data;
  public lineChart3Labels = chartsData.lineChart3Labels;
  public lineChart3Options = chartsData.lineChart3Options;
  public lineChart3Colors = chartsData.lineChart3Colors;
  public lineChart3Legend = chartsData.lineChart3Legend;
  public lineChart3Type = chartsData.lineChart3Type;

  // bar - Chart 4
  public barChartOptions = chartsData.barChartOptions;
  public barChartLabels = chartsData.barChartLabels;
  public barChartType = chartsData.barChartType;
  public barChartLegend = chartsData.barChartLegend;
  public barChartData = chartsData.barChartData;
  public barChartColors = chartsData.barChartColors;

  // bar - Chart 5
  public barChart5Options = chartsData.barChart5Options;
  public barChart5Labels = chartsData.barChart5Labels;
  public barChart5Type = chartsData.barChart5Type;
  public barChart5Legend = chartsData.barChart5Legend;
  public barChart5Data = chartsData.barChart5Data;
  public barChart5Colors = chartsData.barChart5Colors;

  
  
  // events
  public chartClicked(e: any): void {
    //your code here
  }

  public chartHovered(e: any): void {
    //your code here
  }

  constructor(private chatServ: ChartsService) { }

  ngOnInit() {

    $.getScript('./assets/js/dashboard-eCommerce-v1.js');
    // this.geteventcount();
    // this.geteventdata();
 
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Basic Column Chart in Angular"
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: 71, label: "Apple"  },
          { y: 55, label: "Mango"  },
          { y: 50, label: "Orange" },
          { y: 65, label: "Banana" },
          // { y : this.eventdata[0].id , label : this.eventdata[0].location}
        ]
     }]
  });
      
    chart.render();

  }

  // geteventcount(){
 
  //     this.chatServ.geteventcount().subscribe(res => {
  //     this.eventcount = res.data[0].eventcount
  //     console.log(this.eventcount);
  //   }, error => {
  //     console.log(error);
  //   })
  // }

  // geteventdata(){
  //   this.chatServ.geteventdata().subscribe(res => {
  //     this.eventdata = res.data;

  //     console.log(this.eventdata[0].id);
  //     console.log(this.eventdata[0].location);

  //   }, error => {
  //     console.log(error);
  //   })
  // }

}
