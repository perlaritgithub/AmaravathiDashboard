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
  selector: 'app-departmentwisereport',
  templateUrl: './departmentwisereport.component.html',
  styleUrls: ['./departmentwisereport.component.scss']
})
export class DepartmentwisereportComponent implements OnInit {

  departmentarray:any = [];
  departmentdata:any=[];
  departmentsearchdata:any=[];
  displayedColumns: string[] = ['ID','District','Division','ColonyName','HabitationName','Department','AssetType','HouseNo', 'PlotNo','WorkStage'];
  constructor(private reportservice:ReportService, private modalService: NgbModal, private formBuilder: FormBuilder) { 
  }
  department:any;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('content', { static: true }) content: ElementRef;
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  ngOnInit(): void {
    this.getdepartmentdropdown();
    this.getdepartmentreport();

  }
  getdepartmentdropdown(){
    this.reportservice.getdepartmentdropdown().subscribe(res => {
            this.departmentarray = res.data;
            console.log(this.departmentarray);
          }, error => {
            console.log(error);
          })
    }
    searchdepartment(department){
      console.log(department);
      this.reportservice.searchdepartment(department).subscribe(res => {
        this.departmentsearchdata = res.data;         
        console.log(this.departmentsearchdata);      
        this.dataSource = new MatTableDataSource(this.departmentsearchdata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;      
      }, error => {
        console.log(error);
      })

    }
    getdepartmentreport(){
      this.reportservice.getdepartmentreport().subscribe(res => {
        this.departmentdata = res.data;         
        console.log(this.departmentdata);      
        this.dataSource = new MatTableDataSource(this.departmentdata);
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

  }

}
