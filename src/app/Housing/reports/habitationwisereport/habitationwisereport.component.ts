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
  selector: 'app-habitationwisereport',
  templateUrl: './habitationwisereport.component.html',
  styleUrls: ['./habitationwisereport.component.scss']
})
export class HabitationwisereportComponent implements OnInit {
  habitationarray:any = [];
  habitationdata:any=[];
  habitationsearchdata:any=[];
  displayedColumns: string[] = ['ID', 'HouseNo', 'PlotNo', 'House','Toilet'];
  constructor(private reportservice:ReportService, private modalService: NgbModal, private formBuilder: FormBuilder) { }
  habitation_name:any;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('content', { static: true }) content: ElementRef;
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  ngOnInit(): void {
    this.gethabitationddropdown();
    this.gethabitationreport();

  }
  gethabitationddropdown(){
    this.reportservice.gethabitationddropdown().subscribe(res => {
            this.habitationarray = res.data;
            console.log(this.habitationarray);
          }, error => {
            console.log(error);
          })
    }
    searchhabitation(habitation_name){
      this.reportservice.searchhabitation(habitation_name).subscribe(res => {
        this.habitationsearchdata = res.data;         
        console.log(this.habitationsearchdata);      
        this.dataSource = new MatTableDataSource(this.habitationsearchdata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;      
      }, error => {
        console.log(error);
      })

    }
    gethabitationreport(){
      this.reportservice.gethabitationreport().subscribe(res => {
        this.habitationdata = res.data;         
        console.log(this.habitationdata);      
        this.dataSource = new MatTableDataSource(this.habitationdata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;      
      }, error => {
        console.log(error);
      })
    }

     // Filter function for Amngular Materials Table
 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
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
}
