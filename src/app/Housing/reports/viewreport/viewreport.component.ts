import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {ReportService} from '../services/report.service'
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-viewreport',
  templateUrl: './viewreport.component.html',
  styleUrls: ['./viewreport.component.scss']
})
export class ViewreportComponent implements OnInit {

  displayedColumns: string[] = ['ID', 'Stage', 'Houses', 'Toilets','Infra','Total'];

  
  
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('content', { static: true }) content: ElementRef;
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;

  constructor( private reportservice:ReportService, private modalService: NgbModal, private formBuilder: FormBuilder) { }
  districtArray:any=[];
  divisionArray:any=[];
  nameArray:any=[];
  reportData:any=[];
  searchData:any=[];
  changesreportData:any=[];
  changecolonyData:any=[];
  total:any;
  tot_houses:any;
  tot_toilets:any;
  tot_infra:any;
  district:any;
  division:any;
  colony_name:any;
  ngOnInit(): void {
    // this.getcolonynames();
    this.districtdata();
    // this.getdivisiondata();
    this.getreportdata();
    // this.changedivisiondata(district);
   
  }
  districtdata() {
    this.reportservice.districtdata().subscribe(res => {
      this.districtArray = res.data;
      console.log(this.districtArray);
    }, error => {
      console.log(error);
    })
  }
  
  // getdivisiondata(){
  //   this.reportservice.getdivisiondata().subscribe(res => {
  //     this.divisionArray = res.data;
  //     console.log(this.divisionArray);
  //   }, error => {
  //     console.log(error);
  //   })
  // }

// getcolonynames(){
//     this.reportservice.getcolonynames().subscribe(res => {
//       this.nameArray = res.data;
//       console.log(this.nameArray);
//     }, error => {
//       console.log(error);
//     })
//   }
  getreportdata(){
    this.reportservice.getreportdata().subscribe(res => {
      this.reportData = res.data;         
      console.log(this.reportData);      
      this.dataSource = new MatTableDataSource(this.reportData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;      
    }, error => {
      console.log(error);
    })

  }
  changedivisiondata(district){
    console.log(district);
    this.reportservice.changedivisiondata(district).subscribe(res => {
      this.changesreportData = res.data;         
      console.log(this.changesreportData);
             
       
    }, error => {
      console.log(error);
    })

  }
  changecolonydata(division){
    console.log(division);
    this.reportservice.changecolonydata(division).subscribe(res => {
      this.changecolonyData = res.data;         
      console.log(this.changecolonyData);      
       
    }, error => {
      console.log(error);
    })

  }
  searchdata(district,division,colony_name){
    this.reportservice.searchdata(district,division,colony_name).subscribe(res => {
      this.searchData = res.data;         
      console.log(this.searchData);      
      this.dataSource = new MatTableDataSource(this.searchData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;      
    }, error => {
      console.log(error);
    })
  }


   // Convert Mat Table Data into Pdf file using JSPDF //
 pdfMake(){
  const doc = new jsPDF('p', 'pt', 'letter');
  doc.canvas.height = 72 * 11;
  doc.canvas.width  = 72 * 11;
  const specialElementHandlers = {
    '#editor': function (element, renderer) {
      return true;
    }
  };

  const content = this.content.nativeElement;
  console.log(content);


  doc.fromHTML(content.innerHTML, 15, 15, {
    width: 300,
    'elementHandlers': specialElementHandlers
  });

  doc.save('test.pdf');
//   let doc: jsPDF  = new jsPDF("p", "mm", "a4");

// let data = [];
// const displayedColumns = ['NAme','approved','utilised', 'available','asd','sadadasada','asdas']

// this.dataSource.filteredData.forEach(obj => {
//   let arr = [];
//   this.displayedColumns.forEach(col => {
//     arr.push(obj[col]);
//   });
//   data.push(arr);
// });
//   doc.autoTable({
//     head: [['NAme','approved','utilised', 'available','asd','sadadasada','asdas']],
//     body: data
//   });
//   doc.save('table.pdf')
}


 // Filter function for Amngular Materials Table
 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

}
