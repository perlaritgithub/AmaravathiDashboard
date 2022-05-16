import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdddataService } from './../adddata.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-addinfrastructure',
  templateUrl: './addinfrastructure.component.html',
  styleUrls: ['./addinfrastructure.component.scss']
})
export class AddinfrastructureComponent implements OnInit {

  addinfrastructureForm: FormGroup;
  submitted: boolean = false;
  initialValues;
  displayedColumns: string[] = ['ID', 'InfrastructureName', 'edit', 'delete'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('content', { static: true }) content: ElementRef;
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  edit: boolean = false;
  updateData;
  infraData: any = [];


  constructor(private dataServ: AdddataService, private modalService: NgbModal, private formBuilder: FormBuilder){

    this.addinfrastructureForm = this.formBuilder.group({
    infra_name : ['', [Validators.required]]

    });
    this.submitted = false;
    this.initialValues = this.addinfrastructureForm.value;

  }


  addinfrastructure(addinfrastructureModel: any, type: any) {
    // this.getCategoryData();
    if (type == 0) {
      this.edit = false;
      this.submitted = false;
      this.modalService.open(addinfrastructureModel, { size: 'xl', centered: true });
    } else {
      console.log('edited', type);

      this.edit = true;
      this.updateData = type;
      this.submitted = false;
      this.addinfrastructureForm.setValue({ infra_name: type.infra_name })
      this.modalService.open(addinfrastructureModel, { size: 'xl', centered: true });
    }


  }

  // Filter function for Amngular Materials Table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  modalDismiss() {
    this.addinfrastructureForm.reset(this.initialValues);
    this.modalService.dismissAll()
  }

  get addinfraFormCnt() { return this.addinfrastructureForm.controls; }

  ngOnInit(): void {
    this.getinfrastructuredata();
  }


  addinfrastructureSubmit() {
    this.submitted = true;
    console.log('submitted', this.addinfrastructureForm.value, this.addinfrastructureForm.invalid);
    if (this.addinfrastructureForm.invalid) {
      console.log('returned');

      return;
    } else {
      if (this.edit) {
        console.log(this.updateData);
        console.log(this.infraData);
          this.updateData.infra_name = this.addinfrastructureForm.value.infra_name ,

            console.log('submitted', this.updateData, this.addinfrastructureForm.valid);

          this.dataServ.updateinfrastructuredata(this.updateData).subscribe(
            res => {
              console.log(res);
              this.getinfrastructuredata();
              this.submitted = false;
              this.addinfrastructureForm.reset();
              this.modalService.dismissAll();
            },
            error => {
              this.addinfrastructureForm.reset();
              this.submitted = false;
            });
        }
      
      else {
        this.addinfrastructureForm.value.usr_id = localStorage.getItem('usr_id');
        console.log('submitted', this.addinfrastructureForm.value, this.addinfrastructureForm.invalid);

        var checkData = this.infraData.filter(object => {
          return object.infra_name == this.addinfrastructureForm.value.infra_name
        })
        console.log(checkData);

        if (checkData.length) {
          this.dataServ.errorMessageAlert('Infrastructure Already exists');
          this.modalService.dismissAll();
          return;

        }
        else {

          this.dataServ.addinfrastructuredata(this.addinfrastructureForm.value).subscribe(
            res => {
              console.log(res);
              this.getinfrastructuredata();
            
              this.submitted = false;
              this.addinfrastructureForm.reset();
              this.modalService.dismissAll();
            },
            error => {
              this.addinfrastructureForm.reset();
              this.submitted = false;
            });
        }
      }
    }

  }
  getinfrastructuredata() {
    this.dataServ.getinfrastructuredata().subscribe(res => {
      this.infraData = res.data;
      console.log(this.infraData);
      this.dataSource = new MatTableDataSource(this.infraData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.infraData);
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

        this.deleteinfrastructuredata(index);
      }
    })
  }

  deleteinfrastructuredata(index) {
    this.dataServ.deleteinfrastructuredata(index).subscribe(
      res => {
        this.getinfrastructuredata();
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
