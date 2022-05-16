import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdddataService } from './../adddata.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-adddistrict',
  templateUrl: './adddistrict.component.html',
  styleUrls: ['./adddistrict.component.scss']
})
export class AdddistrictComponent implements OnInit {
  adddistrictForm: FormGroup;
  submitted: boolean = false;
  initialValues;
  displayedColumns: string[] = ['ID', 'District', 'edit', 'delete'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('content', { static: true }) content: ElementRef;
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  edit: boolean = false;
  updateData;
  districtData: any = [];

  constructor(private dataServ: AdddataService, private modalService: NgbModal, private formBuilder: FormBuilder) {

    this.adddistrictForm = this.formBuilder.group({
      district: ['', [Validators.required]]

    });
    this.submitted = false;
    this.initialValues = this.adddistrictForm.value;

  }


  adddistrict(adddistrictModel: any, type: any) {
    // this.getCategoryData();
    if (type == 0) {
      this.edit = false;
      this.submitted = false;
      this.modalService.open(adddistrictModel, { size: 'xl', centered: true });
    } else {
      console.log('edited', type);

      this.edit = true;
      this.updateData = type;
      this.submitted = false;
      this.adddistrictForm.setValue({ district: type.district })
      this.modalService.open(adddistrictModel, { size: 'xl', centered: true });
    }


  }

  // Filter function for Amngular Materials Table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  modalDismiss() {
    this.adddistrictForm.reset(this.initialValues);
    this.modalService.dismissAll()
  }

  get adddistrictFormCnt() { return this.adddistrictForm.controls; }

  ngOnInit(): void {
    this.getDistrict();
  }


  adddistrictSubmit() {
    this.submitted = true;
    console.log('submitted', this.adddistrictForm.value, this.adddistrictForm.invalid);
    if (this.adddistrictForm.invalid) {
      console.log('returned');

      return;
    } else {
      if (this.edit) {
        console.log(this.updateData);

        console.log(this.districtData);
        var checkData = this.districtData.filter(object => {
          return object.district == this.adddistrictForm.value.district
        })
        console.log(checkData);

        if (checkData.length) {
          this.dataServ.errorMessageAlert('District Already exists');
          this.modalService.dismissAll();
          return;

        }
        else {
          this.updateData.district = this.adddistrictForm.value.district,

            console.log('submitted', this.updateData, this.adddistrictForm.valid);
            // this.adddistrictForm.setValue({ district: type.district })
          this.dataServ.updateDistrict(this.updateData).subscribe(
            res => {
              console.log(res);
              // this.getUsersData();
              this.getDistrict();
              this.submitted = false;
              this.adddistrictForm.reset();
              this.modalService.dismissAll();
            },
            error => {
              this.adddistrictForm.reset();
              this.submitted = false;
            });
        }
      }
      else {
        this.adddistrictForm.value.usr_id = localStorage.getItem('usr_id');
        console.log('submitted', this.adddistrictForm.value, this.adddistrictForm.invalid);

        var checkData = this.districtData.filter(object => {
          return object.district == this.adddistrictForm.value.district
        })
        console.log(checkData);

        if (checkData.length) {
          this.dataServ.errorMessageAlert('District Already exists');
          this.modalService.dismissAll();
          return;

        }
        else {

          this.dataServ.addDistrict(this.adddistrictForm.value).subscribe(
            res => {
              console.log(res);
              this.getDistrict();
              // this.getUsersData();
              this.submitted = false;
              this.adddistrictForm.reset();
              this.modalService.dismissAll();
            },
            error => {
              this.adddistrictForm.reset();
              this.submitted = false;
            });
        }
      }
    }

  }
  getDistrict() {
    this.dataServ.getDistrict().subscribe(res => {
      this.districtData = res.data;
      
      console.log(this.districtData);
      this.dataSource = new MatTableDataSource(this.districtData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.districtData);
    }, error => {
      console.log(error);
    })


  }
  deleteAlert(index) {
    Swal.fire({
      title: 'Are you sure to Delete ?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.deletedistrict(index);
      }
    })
  }

  deletedistrict(index) {
    this.dataServ.deletedistrict(index).subscribe(
      res => {
        this.getDistrict();
      },
      error => {
      });

  }

  charactersOnly(event): boolean {
    let patt = /^([a-zA-Z])$/;
    let result = patt.test(event.key);
    return result;
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
