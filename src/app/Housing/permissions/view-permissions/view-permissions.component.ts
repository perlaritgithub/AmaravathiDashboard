import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PermissionService } from '../permission.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { TableUtil } from './../create-user/tableUtil';
import  Swal from 'sweetalert2';
import { FoolDirective } from '../../permissions/view-permissions/fool.directive';

@Component({
  selector: 'app-view-permissions',
  templateUrl: './view-permissions.component.html',
  styleUrls: ['./view-permissions.component.scss']
})
export class ViewPermissionsComponent implements OnInit {

  permissions:any     = [];                                         // All Permisions Data from Data Base
  userPermissions:any = [];                                         // User Permisions Data from Data Base
  dataSources:MatTableDataSource<any>;                        // Data type For Mat Table Data Array
  dataSource: MatTableDataSource<any>;                        // Data type For Mat Table Data Array
  @ViewChild(MatPaginator) paginator : MatPaginator;               // Mat Table Pagination selector
  @ViewChild(MatSort)      sort      : MatSort;                     // Mat Table Sorting selector
  @ViewChild('paginator') userpaginator: MatPaginator;
  @ViewChild(FoolDirective) fc:FoolDirective;
  // @ViewChild(MatPaginator) userpaginator : MatPaginator;            // Mat Table Pagination selector
  @ViewChild(MatSort)      usersort      : MatSort;                 // Mat Table Sorting selector
  @ViewChild('content', {static: true}) content: ElementRef;        // Mat Table content selector
  @ViewChild('TABLE', { static: false }) TABLE : ElementRef;        // Download Excel Data From Mat Table

  displayedColumns:  string[] = ['id', 'usr_nm' , 'usr_phone', 'usr_count', 'view' ];
  permissionColumns: string[] = [];

  constructor(private permissionServ: PermissionService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getPermissionsData();

  }

  // ngAfterViewInit(): void {
  //   this.permissionSource = new MatTableDataSource(this.userPermissions);
  //     this.permissionColumns = [ 'id', 'menu_cat_nm', 'menu_nm', 'delete']
  //     // // this.dataSource.filterPredicate =  (data: any, filterValue: string) => { return data.emp_cat_nm === filterValue;};
  //     this.permissionSource.paginator = this.userpaginator;
  //     this.permissionSource.sort = this.usersort;
  // }

  // Get All users Permissions data  //
  getPermissionsData() {

    this.permissionServ.getAllViewPermissionsData().subscribe(res => {
      this.permissions = res.data;
      this.dataSources = new MatTableDataSource(this.permissions);
      // this.dataSource.filterPredicate =  (data: any, filterValue: string) => { return data.emp_cat_nm === filterValue;};
      this.dataSources.paginator = this.paginator;
      this.dataSources.sort = this.sort;
      console.log(this.permissions );
    }, error => {
      console.log(error);
    })
  }

    // Filter function for Angular Materials Table //
    
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSources.filter = filterValue.trim().toLowerCase();
    }

     // Filter function for Angular Materials Table //


     applyFilterUser(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }


   // copy Table data for clip board
   copyData() {
    // const btnCopyText = document.querySelector('#btn-copy-text');
    const btnCopyTable = document.querySelector('#btn-copy-table');
    const elText       = document.querySelector('p');
    const elTable      = document.querySelector('table');

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


  // Convert Mat Table Data into Pdf file using JSPDF //
  // print(){
  //   const doc = new jsPDF('p', 'pt', 'letter');
  //   doc.canvas.height = 72 * 11;
  //   doc.canvas.width  = 72 * 11;
  //   const specialElementHandlers = {
  //     '#editor': function (element, renderer) {
  //       return true;
  //     }
  //   };

  //   const content = this.content.nativeElement;
  //   console.log(content);


  //   doc.fromHTML(content.innerHTML, 15, 15, {
  //     width: 300,
  //     'elementHandlers': specialElementHandlers
  //   });

  //   doc.save('test.pdf');
  // //   let doc: jsPDF  = new jsPDF("p", "mm", "a4");

  // // let data = [];
  // // const displayedColumns = ['NAme','approved','utilised', 'available','asd','sadadasada','asdas']

  // // this.dataSource.filteredData.forEach(obj => {
  // //   let arr = [];
  // //   this.displayedColumns.forEach(col => {
  // //     arr.push(obj[col]);
  // //   });
  // //   data.push(arr);
  // // });
  // //   doc.autoTable({
  // //     head: [['NAme','approved','utilised', 'available','asd','sadadasada','asdas']],
  // //     body: data
  // //   });
  // //   doc.save('table.pdf')
  // }


  // Print Mat Table Data //
  exportTable(){
    TableUtil.exportToPdf("table-to-copied");
  }


  // Modal Dissmiss Function
  modalDismiss() {
    // this.addUserForm.reset(this.initialValues);
    this.modalService.dismissAll();
  }

  // View Permissions by user wise //
  viewPermissions(viewPermissionsModel, index, cid) {
    console.log(index);

    this.permissionServ.getUserPermissionsData(index).subscribe(res => {

      this.userPermissions = res.data;
      console.log(this.userPermissions);
      
      this.dataSource = new MatTableDataSource(this.userPermissions);
      this.permissionColumns = [ 'id', 'menu_cat_nm', 'menu_nm', 'delete']
      setTimeout(() => this.dataSource.paginator = this.userpaginator);
      // // this.dataSource.filterPredicate =  (data: any, filterValue: string) => { return data.emp_cat_nm === filterValue;};
      this.dataSource.paginator = this.userpaginator;
      this.dataSource.sort = this.usersort;
      console.log(this.userPermissions );
      if (cid) {
        this.modalService.open(viewPermissionsModel , {size: 'xl', centered: true });
      }

    }, error => {
      console.log(error);
    })

  }

  // Delete Permissions From User data //
  deletePermissions(index, userid) {
    this.permissionServ.deletePermissionsData(index).subscribe(res => {
      this.viewPermissions('viewPermissionsModel', userid, 0);
      // this.fc.ngOnInit();
      this.getPermissionsData();
    }, error => {
      console.log(error);
    })
  }


  // Delete Confirmation Alert //
  deleteAlert(index, userid) {
    Swal.fire({
      title: 'Are you sure to Delete User Permissions?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.deletePermissions(index, userid);
      }
    })
  }


}
