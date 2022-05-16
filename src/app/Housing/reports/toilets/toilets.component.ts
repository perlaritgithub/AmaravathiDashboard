import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
// import { AssetsService } from './../services/assets.service';
import {ReportService} from '../services/report.service'
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-toilets',
  templateUrl: './toilets.component.html',
  styleUrls: ['./toilets.component.scss']
})
export class ToiletsComponent implements OnInit {

  displayedColumns: string[] = ['ID','Date','District','Division','ColonyName','Department','HouseNo','PlotNo','toilet_stage','img_toilet','toilet_lat','toilet_long'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('content', { static: true }) content: ElementRef;
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  Toiletdata:any = [];
  image: string;                                                    // Image View Url
  title: string;                                                    // Title View Name
  // constructor(private assetsservice:AssetsService) { }
  constructor( private reportservice:ReportService, private modalService: NgbModal, private formBuilder: FormBuilder) { }
  ngOnInit(): void {

    this.gettoiletdata();

  }
 // Filter function for Amngular Materials Table
 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

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


 gettoiletdata(){
  this.reportservice.gettoiletdata().subscribe(res => {
    this.Toiletdata = res.data;
    console.log(this.Toiletdata);
    this.dataSource = new MatTableDataSource(this.Toiletdata);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.Toiletdata);
  }, error => {
    console.log(error);
  })
 
}
// Show Selected Image in Modal Card //
showimage(image, title){
  this.image = image;
  this.title = title;
  // this.modalService.open(image, {size: 'xl', centered: true });
  // this.modalService.open()
}


}
