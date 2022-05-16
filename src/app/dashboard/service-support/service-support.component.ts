import { Component, OnInit, ViewChild } from '@angular/core';
import * as chartsData from '../../shared/data/service-support';
import { ChartsService } from '../../dashboard/services/charts.service'
import ApexCharts from 'apexcharts/dist/apexcharts.common.js'
import { data } from 'jquery';
// import {
//   ApexAxisChartSeries,
//   ApexChart,
//   ChartComponent,
//   ApexDataLabels,
//   ApexPlotOptions,
//   ApexYAxis,
//   ApexAnnotations,
//   ApexFill,
//   ApexStroke,
//   ApexGrid
// } from "ng-apexcharts";

@Component({
  selector: 'app-service-support',
  templateUrl: './service-support.component.html',
  styleUrls: ['./service-support.component.scss']
})
export class ServiceSupportComponent implements OnInit {
  // @ViewChild("chart") chart: ChartComponent;
  housecount: any;
  toiletcount: any;
  infracount: any;
  stagewisearray: any;
  housearray: any = [];
  toiletarray: any = [];
  infraarray: any = [];
  // months: any = [];
  departmenthousecount: any = [];
  dhcarray: any = [];
  dtcarray: any = [];
  dicarray: any = [];

  departmenttoiletcount: any = [];
  departmentinfracount: any = [];




  // lineChart -Chart 2
  public lineChartData = chartsData.lineChartData;
  public lineChartLabels = chartsData.lineChartLabels;
  public lineChartOptions = chartsData.lineChartOptions;
  public lineChartColors = chartsData.lineChartColors;
  public lineChartLegend = chartsData.lineChartLegend;
  public lineChartType = chartsData.lineChartType;



  // events
  public chartClicked(e: any): void {
    //your code here
  }

  public chartHovered(e: any): void {
    //your code here
  }


  constructor(private chatServ: ChartsService) { }

  ngOnInit() {
    $.getScript('./assets/js/dashboard-service-support.js');
    // $.getScript('./assets/js/dashboard-eCommerce-v2.js');
    // $.getScript('./assets/js/dashboard-human-resources.js');
    this.getcounts();
    this.gettoiletscounts();
    this.getinfracounts();

    this.houseanlysisdata();
    this.toiletanlysisdata();
    this.infraanlysisdata();
    // this.getdepartmenthousecount();
    this.departmenthouseanalysis();
    this.departmenttoiletanalysis();
    this.departmentinfraanalysis1();
    this.getwestgodavaridata();


  }

  getcounts() {
    this.chatServ.getcounts().subscribe(res => {
      this.housecount = res.data.length

    }, error => {
      console.log(error);
    })
  }
  gettoiletscounts() {
    this.chatServ.gettoiletscounts().subscribe(res => {
      console.log(res);

      this.toiletcount = res.data.length
      console.log(this.toiletcount);


    }, error => {
      console.log(error);
    })
  }
  getinfracounts() {
    this.chatServ.getinfracounts().subscribe(res => {
      this.infracount = res.data.length

    }, error => {
      console.log(error);
    })
  }


  getHouseChat(data, categories, colors) {
    // var housearray = this.housearray

    console.log(data);

    $(function () {
      var options = {
        chart: {
          height: 400,
          // width:600,

          type: 'bar',
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            columnWidth: '60%',
            endingShape: 'rounded',
            distributed: true,
            horizontal: false,
            dataLabels: {
              position: 'center', // top, center, 
            },
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (value) {
            return value + "";
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            // colors: ["#fff"]
          }
        },
        stroke: {
          width: 1
        },
        series: [{
          name: 'Stage Wise',
          data: data
          // data: housearray.map(res => {
          //   return res.HouseCount;
          // }

          // )
          // data: 

        }],
        tooltip: {
          enabled: false,
          // theme: 'dark',
        },
        grid: {
          show: true,
          borderColor: 'rgba(66, 59, 116, 0.15)',
        },
        xaxis: {
          labels: {
            rotate: -45
          },
          categories: categories,
          // categories: ["Not Grounded/Not Started","Below Basement Level","Basement Level","Column Roof","Slab without Walls","Slab with Walls","Unfinished"],
          // categories:["NG","BBL","BL","CR","SW","SWW","UNF","COM"] ,
          // categories: this.housearray.map(res => {
          //   return res.val;
          // }),

          position: 'bottom',
          // labels: {
          //   offsetY: 0,
          // },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          tickAmount: 10
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            // gradientToColors: colors,
            gradientToColors: ['#d13adf', '#00c8ff', '#ff5447', '#cddc35', '#ffd200', '#00dbde', '#004e92', '#cddc35'],
            // shadeIntensity: 0.5,
            type: 'vertical',
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
          }
        },

        colors: ['#d13adf', '#00c8ff', '#ff5447', '#cddc35', '#ffd200', '#00dbde', '#004e92', '#cddc35'],

        legend: {
          show: false,
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val + "%";
            }
          }
        }
      }
      var chart = new ApexCharts(document.querySelector("#houseanalysisgraph"), options);
      chart.render();
    })


  }
  //toilet graph start
  getToiletChat(arraycount1, categories1, colors1) {
    // var housearray = this.housearray


    $(function () {
      var options = {
        chart: {
          height: 400,
          // width:600,

          type: 'bar',
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            columnWidth: '60%',
            endingShape: 'rounded',
            distributed: true,
            horizontal: false,
            dataLabels: {
              position: 'center', // top, center, 
            },
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (value) {
            return value + "";
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ["#fff"]
          }
        },
        stroke: {
          width: 1
        },
        series: [{
          name: 'Stage Wise',
          data: arraycount1
          // data: housearray.map(res => {
          //   return res.HouseCount;
          // }

          // )
          // data: 

        }],
        tooltip: {
          enabled: true,
          theme: 'dark',
        },
        grid: {
          show: true,
          borderColor: 'rgba(66, 59, 116, 0.15)',
        },
        xaxis: {
          labels: {
            rotate: -45
          },
          categories: categories1,
          // categories: ["Not Grounded/Not Started","Below Basement Level","Basement Level","Column Roof","Slab without Walls","Slab with Walls","Unfinished"],
          // categories:["NG","BBL","BL","CR","SW","SWW","UNF","COM"] ,
          // categories: this.housearray.map(res => {
          //   return res.val;
          // }),

          position: 'bottom',
          // labels: {
          //   offsetY: 0,
          // },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          tickAmount: 10
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            // gradientToColors: colors1,
            gradientToColors: ['#d13adf', '#00c8ff', '#ff5447', '#cddc35', '#ffd200', '#00dbde', '#004e92', '#cddc35'],
            shadeIntensity: 1,
            type: 'vertical',
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
          }
        },
        // colors: ['#d13adf', '#00c8ff', '#ff5447', '#cddc35', '#ffd200', '#00dbde', '#004e92', '#cddc35', '#08a50e', '#f7971e', '#fc00ff', '#000428', '#f1076f'],
        colors: ['#d13adf', '#00c8ff', '#ff5447', '#cddc35', '#ffd200', '#00dbde', '#004e92', '#cddc35'],
        legend: {
          show: false,
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val + "%";
            }
          }
        }
      }
      var chart1 = new ApexCharts(document.querySelector("#toiletanalysisgraph"), options);
      chart1.render();
    })


  }
  //infra chart
  getInfraChat(arraycount2, categories2, colors2) {
    // var housearray = this.housearray


    $(function () {
      var options = {
        chart: {
          height: 400,
          // width:600,

          type: 'bar',
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            columnWidth: '60%',
            endingShape: 'rounded',
            distributed: true,
            horizontal: false,
            dataLabels: {
              position: 'center', // top, center, 
            },
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (value) {
            return value + "";
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ["#fff"]
          }
        },
        stroke: {
          width: 1
        },
        series: [{
          name: 'Stage Wise',
          data: arraycount2
          // data: housearray.map(res => {
          //   return res.HouseCount;
          // }

          // )
          // data: 

        }],
        tooltip: {
          enabled: true,
          theme: 'dark',
        },
        grid: {
          show: true,
          borderColor: 'rgba(66, 59, 116, 0.15)',
        },
        xaxis: {
          labels: {
            rotate: -45
          },
          categories: categories2,
          // categories: ["Not Grounded/Not Started","Below Basement Level","Basement Level","Column Roof","Slab without Walls","Slab with Walls","Unfinished"],
          // categories:["NG","BBL","BL","CR","SW","SWW","UNF","COM"] ,
          // categories: this.housearray.map(res => {
          //   return res.val;
          // }),

          position: 'bottom',
          // labels: {
          //   offsetY: 0,
          // },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          tickAmount: 10
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            gradientToColors: ['#d13adf', '#00c8ff', '#ff5447', '#cddc35', '#ffd200', '#00dbde', '#004e92', '#cddc35'],
            shadeIntensity: 1,
            type: 'vertical',
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
          }
        },
        // colors: ['#d13adf', '#00c8ff', '#ff5447', '#cddc35', '#ffd200', '#00dbde', '#004e92', '#cddc35', '#08a50e', '#f7971e', '#fc00ff', '#000428', '#f1076f'],
        colors: ['#d13adf', '#00c8ff', '#ff5447', '#cddc35', '#ffd200', '#00dbde', '#004e92', '#cddc35'],
        legend: {
          show: false,
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val + "%";
            }
          }
        }
      }
      var chart1 = new ApexCharts(document.querySelector("#infraanalysisgraph"), options);
      chart1.render();
    })


  }

  //toilet graph end
  houseanlysisdata() {
    this.chatServ.gethouseanalysis().subscribe(res => {
      this.housearray = res.data;

      var data = this.housearray.map(res => {
        return res.val;
      })

      console.log(data);
      var datahost = this.housearray.map(res => {
        return res.HouseCount;
      }

      )

      var categories = this.housearray.map(res => {
        return res.val;
      });
      var colors = this.housearray.map(res => {
        return res.color = `rgb${Math.floor(Math.random() * 255)}`
        // return res.color = `# + Math.floor(Math.random() * 10)`;
        // return res.color = '#FF0000';
      })
      this.getHouseChat(datahost, categories, colors);
      console.log(this.housearray, colors);

    }, error => {
      console.log(error);
    })
  }

  toiletanlysisdata() {
    this.chatServ.gettoiletanalysis().subscribe(res => {
      this.toiletarray = res.data;

      var data1 = this.toiletarray.map(res => {
        return res.val;
      })

      console.log(data1);
      var arraycount1 = this.toiletarray.map(res => {
        return res.ToiletCount;
      }

      )

      var categories1 = this.toiletarray.map(res => {
        return res.val;
      });
      var colors1 = this.toiletarray.map(res => {
        return res.color = `rgb${Math.floor(Math.random() * 255)}`
        // return res.color='#000';
      })



      this.getToiletChat(arraycount1, categories1, colors1);
      console.log(this.toiletarray);

    }, error => {
      console.log(error);
    })
  }

  infraanlysisdata() {
    this.chatServ.getinfraanalysis().subscribe(res => {
      this.infraarray = res.data;

      var data2 = this.infraarray.map(res => {
        return res.val;
      })

      console.log(data2);
      var arraycount2 = this.infraarray.map(res => {
        return res.InfraCount;
      }

      )

      var categories2 = this.infraarray.map(res => {
        return res.val;
      });
      var colors2 = this.infraarray.map(res => {
        return res.color = `rgb${Math.floor(Math.random() * 255)}`
      })



      this.getInfraChat(arraycount2, categories2, colors2);
      console.log(this.infraarray);

    }, error => {
      console.log(error);
    })
  }

  getdepartmenthousecount(dhcarray, dhc1array) {
    $(function () {
      var options = {
        chart: {
          height: 200,
          type: 'bar',
          toolbar: {
            show: false
          },
          dropShadow: {
            enabled: true,
            opacity: 0.1,
            blur: 3,
            left: -7,
            top: 22,
          }
        },
        plotOptions: {
          bar: {
            barHeight: '100%',
            endingShape: 'rounded',
            distributed: true,
            horizontal: true,
            dataLabels: {
              position: 'bottom'
            },
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            gradientToColors: ['#8f50ff', '#0072ff', '#f1076f', '#08a50e', '#f7971e'],
            // gradientToColors: ['#8f50ff', '#0072ff', '#f1076f', '#08a50e', '#f7971e', '#fc00ff', '#000428', '#ba8b02', '#009efd', '#000000'],
            shadeIntensity: 1,
            type: 'horizontal',
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
          },
        },
        colors: ['#d13adf', '#00c8ff', '#ff5447', '#cddc35', '#ffd200'],
        // colors: ['#d13adf', '#00c8ff', '#ff5447', '#cddc35', '#ffd200', '#00dbde', '#004e92', '#181818', '#2af598', '#ffffff'],
        dataLabels: {
          enabled: true,
          textAnchor: 'start',
          style: {
            colors: ['#fff']
          },
          formatter: function (val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
          },
          offsetX: 0,
          dropShadow: {
            enabled: true
          }
        },
        series: [{
          // data: [950, 730, 848, 570, 840]
          data: dhc1array
        }],
        stroke: {
          width: 1,
          colors: ['#fff'],
        },
        xaxis: {
          // categories:['AP PR','AP PR','AP TW','APEWIDC','APSHCL']
          categories: dhcarray,
          // categories: ['Direct', 'Google', 'Medium.com', 'Git Hub', 'Envato', 'Youtube', 'cs.champion.com', 'T.co', 'Facebbok', 'LinkedIn'],
        },
        yaxis: {
          labels: {
            show: false
          }
        },
        tooltip: {
          theme: 'dark',
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function () {
                return ''
              }
            }
          }
        },
        legend: {
          show: false,
        }
      }
      var chart = new ApexCharts(document.querySelector("#department-house"), options);
      chart.render();
    }
    )
  }

  departmenthouseanalysis() {
    // console.log("hi");
    this.chatServ.departmenthouseanalysis().subscribe(res => {
      this.departmenthousecount = res.data

      var dhcarray = this.departmenthousecount.map(res => {
        return res.department;
      })

      var dhc1array = this.departmenthousecount.map(res => {
        return res.dhc;
      })
      // console.log(dhcarray);
      // console.log(dhc1array);
      this.getdepartmenthousecount(dhcarray, dhc1array);
      // console.log(this.departmenthousecount);

    }, error => {
      console.log(error);
    })


  }
  getdepartmenttoiletcount(dtcarray, dtc1array) {
    $(function () {
      var options = {
        chart: {
          height: 200,
          type: 'bar',
          toolbar: {
            show: false
          },
          dropShadow: {
            enabled: true,
            opacity: 0.1,
            blur: 3,
            left: -7,
            top: 22,
          }
        },
        plotOptions: {
          bar: {
            barHeight: '100%',
            endingShape: 'rounded',
            distributed: true,
            horizontal: true,
            dataLabels: {
              position: 'bottom'
            },
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            gradientToColors: ['#8f50ff', '#0072ff', '#f1076f', '#08a50e', '#f7971e'],
            // gradientToColors: ['#8f50ff', '#0072ff', '#f1076f', '#08a50e', '#f7971e', '#fc00ff', '#000428', '#ba8b02', '#009efd', '#000000'],
            shadeIntensity: 1,
            type: 'horizontal',
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
          },
        },
        colors: ['#d13adf', '#00c8ff', '#ff5447', '#cddc35', '#ffd200'],
        // colors: ['#d13adf', '#00c8ff', '#ff5447', '#cddc35', '#ffd200', '#00dbde', '#004e92', '#181818', '#2af598', '#ffffff'],
        dataLabels: {
          enabled: true,
          textAnchor: 'start',
          style: {
            colors: ['#fff']
          },
          formatter: function (val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
          },
          offsetX: 0,
          dropShadow: {
            enabled: true
          }
        },
        series: [{
          // data: [950, 730, 848, 570, 840]
          data: dtc1array
        }],
        stroke: {
          width: 1,
          colors: ['#fff'],
        },
        xaxis: {
          // categories:['AP PR','AP PR','AP TW','APEWIDC','APSHCL']
          categories: dtcarray,
          // categories: ['Direct', 'Google', 'Medium.com', 'Git Hub', 'Envato', 'Youtube', 'cs.champion.com', 'T.co', 'Facebbok', 'LinkedIn'],
        },
        yaxis: {
          labels: {
            show: false
          }
        },
        tooltip: {
          theme: 'dark',
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function () {
                return ''
              }
            }
          }
        },
        legend: {
          show: false,
        }
      }
      var chart = new ApexCharts(document.querySelector("#department-toilet"), options);
      chart.render();
    }
    )
  }

  departmenttoiletanalysis() {
    // console.log("hi");
    this.chatServ.departmenttoiletanalysis().subscribe(res => {
      this.departmenttoiletcount = res.data

      var dtcarray = this.departmenttoiletcount.map(res => {
        return res.department;
      })

      var dtc1array = this.departmenttoiletcount.map(res => {
        return res.dtc;
      })
      // console.log(dtcarray);
      // console.log(dtc1array);
      this.getdepartmenttoiletcount(dtcarray, dtc1array);
      // console.log(this.departmenthousecount);

    }, error => {
      console.log(error);
    })


  }

  getdepartmentInfracount(dicarray, dic1array) {
    $(function () {
      var options = {
        chart: {
          height: 140,
          type: 'bar',
          toolbar: {
            show: false
          },
          dropShadow: {
            enabled: true,
            opacity: 0.1,
            blur: 3,
            left: -7,
            top: 22,
          }
        },
        plotOptions: {
          bar: {
            barHeight: '100%',
            endingShape: 'rounded',
            distributed: true,
            horizontal: true,
            dataLabels: {
              position: 'bottom'
            },
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            gradientToColors: ['#8f50ff', '#0072ff'],
            // gradientToColors: ['#8f50ff', '#0072ff', '#f1076f', '#08a50e', '#f7971e', '#fc00ff', '#000428', '#ba8b02', '#009efd', '#000000'],
            shadeIntensity: 1,
            type: 'horizontal',
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
          },
        },
        colors: ['#d13adf', '#00c8ff'],
        // colors: ['#d13adf', '#00c8ff', '#ff5447', '#cddc35', '#ffd200', '#00dbde', '#004e92', '#181818', '#2af598', '#ffffff'],
        dataLabels: {
          enabled: true,
          textAnchor: 'start',
          style: {
            colors: ['#fff']
          },
          formatter: function (val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
          },
          offsetX: 0,
          dropShadow: {
            enabled: true
          }
        },
        series: [{
          // data: [950, 730, 848, 570, 840]
          data: dic1array
        }],
        stroke: {
          width: 1,
          colors: ['#fff'],
        },
        xaxis: {
          // categories:['AP PR','AP PR','AP TW','APEWIDC','APSHCL']
          categories: dicarray,
          // categories: ['Direct', 'Google', 'Medium.com', 'Git Hub', 'Envato', 'Youtube', 'cs.champion.com', 'T.co', 'Facebbok', 'LinkedIn'],
        },
        yaxis: {
          labels: {
            show: false
          }
        },
        tooltip: {
          theme: 'dark',
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function () {
                return ''
              }
            }
          }
        },
        legend: {
          show: false,
        }
      }
      var chart = new ApexCharts(document.querySelector("#department-infra"), options);
      chart.render();
    }
    )
  }

  departmentinfraanalysis1() {
    console.log("hi");
    this.chatServ.departmentinfraanalysis().subscribe(res => {
      this.departmentinfracount = res.data

      var dicarray = this.departmentinfracount.map(res => {
        return res.department;
      })

      var dic1array = this.departmentinfracount.map(res => {
        return res.dic;
      })
      // console.log(dicarray);
      console.log(dic1array);
      this.getdepartmentInfracount(dicarray, dic1array);
      // console.log(this.departmenthousecount);

    }, error => {
      console.log(error);
    })


  }
  getwestgodavaridata() {
    $(function () {
      var options = {
        chart: {
          height: 365,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            //startAngle: -135,
            //endAngle: 135,
            hollow: {
              margin: 12,
              size: '45%',
              background: '#fff',
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: 'front',
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24
              }
            },
            track: {
              background: '#eeedfb',
              strokeWidth: '100%',
              margin: 5, // margin is in pixels
              dropShadow: {
                enabled: false,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35
              }
            },
            dataLabels: {
              name: {
                color: '#000',
                fontSize: '14px',
                offsetY: -5
              },
              value: {
                color: '#000',
                fontSize: '25px',
                offsetY: 5
              },
              total: {
                show: true,
                label: 'Total',
                color: '#000',
                formatter: function (w) {
                  // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                  return 	13508
                }
              }
            }
          }
        },
        stroke: {
          lineCap: "round",
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            // gradientToColors: ['#d13adf', '#d13adf', '#f7971e', '#08a50e'],
            gradientToColors: ['#d13adf', '#d13adf','#f7971e'],
            shadeIntensity: 1,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
          },
        },
        // colors: ["#8f50ff", "#f1076f", "#ffd200", "#cddc35"],
        colors: ["#8f50ff", "#f1076f","#ffd200"],
        // series: [90, 80, 70, 60],
        series: [80, 72,60],
        // labels: ['Career Page', 'Referral', 'Agency', 'Job Boards'],
        labels: ['Houses', 'Toilets','Infra'],
        responsive: [{
          breakpoint: 1280,
          options: {
            chart: {
              height: 350
            }
          }
        }]
      }
      var chart = new ApexCharts(document.querySelector("#application-by-source"), options);
      chart.render();
    }
    )
  }

westgodavaridata(){
  this.chatServ.westgodavaridata().subscribe(res => {
    this.westgodavaridata = res.data
    console.log(this.westgodavaridata);
  }, error => {
    console.log(error);
  })
}


}


