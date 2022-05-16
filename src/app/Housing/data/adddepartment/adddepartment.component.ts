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
  selector: 'app-adddepartment',
  templateUrl: './adddepartment.component.html',
  styleUrls: ['./adddepartment.component.scss']
})
export class AdddepartmentComponent implements OnInit {

  adddepartmentForm: FormGroup;
  submitted: boolean = false;
  initialValues;
  displayedColumns: string[] = ['ID', 'Department', 'edit', 'delete'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('content', { static: true }) content: ElementRef;
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  edit: boolean = false;
  updateData;
  departmentData: any = [];

  constructor(private dataServ: AdddataService, private modalService: NgbModal, private formBuilder: FormBuilder) {

    this.adddepartmentForm = this.formBuilder.group({
      department: ['', [Validators.required]]

    });
    this.submitted = false;
    this.initialValues = this.adddepartmentForm.value;

  }


  adddepartment(adddepartmentModel: any, type: any) {
    // this.getCategoryData();
    if (type == 0) {
      this.edit = false;
      this.submitted = false;
      this.modalService.open(adddepartmentModel, { size: 'xl', centered: true });
    } else {
      console.log('edited', type);

      this.edit = true;
      this.updateData = type;
      this.submitted = false;
      this.adddepartmentForm.setValue({ department: type.department})
      this.modalService.open(adddepartmentModel, { size: 'xl', centered: true });
    }
    
  }

  // Filter function for Amngular Materials Table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  modalDismiss() {
    this.adddepartmentForm.reset(this.initialValues);
    this.modalService.dismissAll()
  }

  get adddistrictFormCnt() { return this.adddepartmentForm.controls; }

  ngOnInit(): void {
    this.getDepartment();
  }


  adddepartmentSubmit() {
    this.submitted = true;
    console.log('submitted', this.adddepartmentForm.value, this.adddepartmentForm.invalid);
    if (this.adddepartmentForm.invalid) {
      console.log('returned');

      return;
    } else {
      if (this.edit) {
        console.log(this.updateData);

        console.log(this.departmentData);
        var checkData = this.departmentData.filter(object => {
          return object.department == this.adddepartmentForm.value.department
        })
        console.log(checkData);

        if (checkData.length) {
          this.dataServ.errorMessageAlert('Department Already exists');
          this.modalService.dismissAll();
          return;

        }
        else {
          this.updateData.department = this.adddepartmentForm.value.department,

            console.log('submitted', this.updateData, this.adddepartmentForm.valid);

          this.dataServ.updateDepartment(this.updateData).subscribe(
            res => {
              console.log(res);
              // this.getUsersData();
              this.getDepartment();
              this.submitted = false;
              this.adddepartmentForm.reset();
              this.modalService.dismissAll();
            },
            error => {
              this.adddepartmentForm.reset();
              this.submitted = false;
            });
        }
      }
      else {
        this.adddepartmentForm.value.usr_id = localStorage.getItem('usr_id');
        console.log('submitted', this.adddepartmentForm.value, this.adddepartmentForm.invalid);

        var checkData = this.departmentData.filter(object => {
          return object.department == this.adddepartmentForm.value.department
        })
        console.log(checkData);

        if (checkData.length) {
          this.dataServ.errorMessageAlert('Department Already exists');
          this.modalService.dismissAll();
          return;

        }
        else {

          this.dataServ.addDepartment(this.adddepartmentForm.value).subscribe(
            res => {
              console.log(res);
              this.getDepartment();
              // this.getUsersData();
              this.submitted = false;
              this.adddepartmentForm.reset();
              this.modalService.dismissAll();
            },
            error => {
              this.adddepartmentForm.reset();
              this.submitted = false;
            });
        }
      }
    }

  }
  getDepartment() {
    this.dataServ.getDepartment().subscribe(res => {
      this.departmentData = res.data;
      console.log(this.departmentData);
      this.dataSource = new MatTableDataSource(this.departmentData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.departmentData);
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

        this.deletedepartment(index);
      }
    })
  }

  deletedepartment(index) {
    this.dataServ.deletedepartment(index).subscribe(
      res => {
        this.getDepartment();
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
