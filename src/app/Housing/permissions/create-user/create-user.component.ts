import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PermissionService } from '../permission.service';
import { TableUtil } from "./tableUtil";
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import  Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  allUsersData = [];
  checkData = [];
  updateData;                              // Checking Number For Data
  edit: boolean = false;                   // Edit Value When Form Submit
  addUserForm  : FormGroup;                // Form Group for Login Form
  submitted    : boolean   = false;        // Submitted Value for login form errors validations
  error        : string    = '';           // Error Message Stored value
  public showPassword: boolean = false;    // password toggle for input feild
  initialValues;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['ID', 'Name', 'User Phone', 'Password', 'Gmail', 'edit', 'delete' ];
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort)      sort      : MatSort;
  @ViewChild('content', {static: true}) content: ElementRef;
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;        // Download Excel Data From Table
  copiedData
  constructor(private permissionServ: PermissionService, private modalService: NgbModal, private formBuilder: FormBuilder) {
    this.addUserForm = this.formBuilder.group({
      usr     : ['', [Validators.required]],
      pswd    : ['', [Validators.required]],
      phone   : ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]],
      mail    : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    });
    this.submitted     = false;
    this.initialValues = this.addUserForm.value;
  }

  ngOnInit(): void {
    this.getUsersData();
  }


 // return login form controls for error handling
 get addUserFormCnt() { return this.addUserForm.controls; }


 // copy Table data for clip board
  copyData() {


  // const btnCopyText = document.querySelector('#btn-copy-text');
  const btnCopyTable = document.querySelector('#btn-copy-table');

  const elText = document.querySelector('p');
  const elTable = document.querySelector('table');

  const copyEl = (elToBeCopied) => {
    let range, sel;

    // Ensure that range and selection are supported by the browsers
    if (document.createRange && window.getSelection) {

      range = document.createRange();
      sel = window.getSelection();
      // unselect any element in the page

      sel.removeAllRanges();

      try {
        range.selectNodeContents(elToBeCopied);
        sel.addRange(range);
      } catch (e) {
        range.selectNode(elToBeCopied);
        sel.addRange(range);
      }

      document.execCommand('copy');
    }

    sel.removeAllRanges();

    console.log('Element Copied! Paste it in a file')
  };

  // btnCopyText.addEventListener('click', () => copyEl(elText));
  btnCopyTable.addEventListener('click', () => copyEl(elTable));
    // console.log(this.dataSource.data);
// if (this.dataSource.data.length) {
//   console.log(this.dataSource.data);
//   return JSON.stringify(this.dataSource.data);
// }

  }

  // Get All users data
  getUsersData() {

    this.permissionServ.getAllUsersData().subscribe(res => {
      this.allUsersData = res.data;
      this.dataSource = new MatTableDataSource(this.allUsersData);
      // this.dataSource.filterPredicate =  (data: any, filterValue: string) => { return data.emp_cat_nm === filterValue;};
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.allUsersData );
    }, error => {
      console.log(error);
    })
  }


  // Filter function for Amngular Materials Table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  print(){
    const doc = new jsPDF('p', 'pt', 'letter');
    doc.canvas.height = 72 * 11;
    doc.canvas.width = 72 * 11;
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

  exportTable(){
    TableUtil.exportToPdf("table-to-copied");
  }

// Download Excel Data From Table //
  ExportTOExcel() {
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
  ws['!cols'] = [];
  ws['!cols'][5] = { hidden: true };
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, 'Intra Transfer.xlsx');
 }

 // Add User Model Open Function

 addUser(addEmployeeModel: any, type: any){
  // this.getCategoryData();
  if (type == 0) {
    this.edit = false;
    this.submitted     = false;
    this.modalService.open(addEmployeeModel, { centered: true, backdropClass: 'light-blue-backdrop', size:'xl' });
  }else{
    console.log('edited');

    this.edit = true;

    this.checkData = this.allUsersData.filter( obj => {
     return obj.usr_phone != type.usr_phone;
    })

    this.updateData = type;
    this.submitted     = false;
    this.addUserForm.setValue({mail: type.usr_email ,phone:type.usr_phone, pswd: type.usr_pswd, usr: type.usr_nm})
    this.modalService.open(addEmployeeModel, { centered: true, size:'xl' });
  }


}


 // Accept Input As a Number Only
 numericOnly(event): boolean {
  let patt = /^([0-9])$/;
  let result = patt.test(event.key);
  return result;
}


// Toggle password for showing user
public onPasswordToggle(): void {
  this.showPassword = !this.showPassword;
}


// Modal Dissmiss Function

modalDismiss() {
  this.addUserForm.reset(this.initialValues);
  this.modalService.dismissAll()
}

// Add User Form Submit Data function

addUserSubmit() {
  this.submitted = true;
  console.log('Employee submitted', this.addUserForm.value, this.addUserForm.invalid);
  if (this.addUserForm.invalid) {
    console.log('returned');

    return;
  } else {
    if (this.edit) {
      console.log(this.updateData);
      var checkData =  this.checkData.filter( object => {
        return object.usr_phone == this.addUserForm.value.phone
      })
      console.log(checkData);
      if (checkData.length ) {
        this.permissionServ.errorMessageAlert('phone number already exists');
      }else{
      this.updateData.oldPhoneNumber     =  this.updateData.usr_phone;
      this.updateData.usr_ids     =  localStorage.getItem('usr_id');
      this.updateData.usr_nm     =  this.addUserForm.value.usr
      this.updateData.usr_pswd   =  this.addUserForm.value.pswd
      this.updateData.usr_phone  =  this.addUserForm.value.phone
      this.updateData.usr_email  =  this.addUserForm.value.mail
      console.log('submitted', this.updateData, this.addUserForm.invalid);

      this.permissionServ.updateUserFormData(this.updateData).subscribe(
        res => {
          console.log(res);
          this.getUsersData();
          this.submitted = false;
          this.addUserForm.reset();
          this.modalService.dismissAll();
        },
        error => {
          this.addUserForm.reset();
          this.submitted = false;
        });
      }
    }else{
      this.addUserForm.value.usr_id = localStorage.getItem('usr_id');
      console.log('submitted', this.addUserForm.value, this.addUserForm.invalid);

      this.permissionServ.addUserFormData(this.addUserForm.value).subscribe(
        res => {
          console.log(res);
          this.getUsersData();
          this.submitted = false;
          this.addUserForm.reset();
          this.modalService.dismissAll();
        },
        error => {
          this.addUserForm.reset();
          this.submitted = false;
        });
    }

  }


}

deleteUser(index) {
  this.permissionServ.deleteUser(index).subscribe(
    res => {
      this.getUsersData();
    },
    error => {
    });

}


deleteAlert(index) {
  Swal.fire({
    title: 'Are you sure to Delete User?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {

      this.deleteUser(index);
    }
  })
}

}
