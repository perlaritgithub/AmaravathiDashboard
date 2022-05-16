import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdddataService } from './../adddata.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-addstage',
  templateUrl: './addstage.component.html',
  styleUrls: ['./addstage.component.scss']
})
export class AddstageComponent implements OnInit {

  addstageForm: FormGroup;
  submitted: boolean = false;
  initialValues;
  displayedColumns: string[] = ['ID', 'ShortStageName', 'Stage', 'edit', 'delete'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('content', { static: true }) content: ElementRef;
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  edit: boolean = false;
  updateData;
  stageData: any = [];


  constructor(private dataServ: AdddataService, private modalService: NgbModal, private formBuilder: FormBuilder) {

    this.addstageForm = this.formBuilder.group({
      val: ['', [Validators.required]],
      descd: ['', [Validators.required]]

    });
    this.submitted = false;
    this.initialValues = this.addstageForm.value;

  }


  addstage(addstageModel: any, type: any) {
    // this.getCategoryData();
    if (type == 0) {
      this.edit = false;
      this.submitted = false;
      this.modalService.open(addstageModel, { size: 'xl', centered: true });
    } else {
      console.log('edited', type);

      this.edit = true;
      this.updateData = type;
      this.submitted = false;
      this.addstageForm.setValue({val: type.val,descd:type.descd})
      this.modalService.open(addstageModel, { size: 'xl', centered: true });
    }


  }

  // Filter function for Amngular Materials Table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  modalDismiss() {
    this.addstageForm.reset(this.initialValues);
    this.modalService.dismissAll()
  }

  get addstageFormCnt() { return this.addstageForm.controls; }

  ngOnInit(): void {
    this.getstagedata();
  }


  addstageSubmit() {
    this.submitted = true;
    console.log('submitted', this.addstageForm.value, this.addstageForm.invalid);
    if (this.addstageForm.invalid) {
      console.log('returned');

      return;
    } else {
      if (this.edit) {
        console.log(this.updateData);

        console.log(this.stageData);
        // var checkData = this.stageData.filter(object => {
        //   return object.descd == this.addstageForm.value.descd
        // })
        // console.log(checkData);

        // if (checkData.length) {
        //   this.dataServ.errorMessageAlert('Stage Already exists');
        //   this.modalService.dismissAll();
        //   return;

        // }
        // else {
          this.updateData.val = this.addstageForm.value.val,
          this.updateData.descd = this.addstageForm.value.descd,
          console.log('submitted', this.updateData, this.addstageForm.valid);

          this.dataServ.updatestagedata(this.updateData).subscribe(
            res => {
              console.log(res);
              // this.getUsersData();
              this.getstagedata();
              this.submitted = false;
              this.addstageForm.reset();
              this.modalService.dismissAll();
            },
            error => {
              this.addstageForm.reset();
              this.submitted = false;
            });
        }
      // }
      else {
        this.addstageForm.value.usr_id = localStorage.getItem('usr_id');
        console.log('submitted', this.addstageForm.value, this.addstageForm.invalid);

        // var checkData = this.stageData.filter(object => {
        //   return object.stage == this.addstageForm.value.stage
        // })
        // console.log(checkData);

        // if (checkData.length) {
        //   this.dataServ.errorMessageAlert('Stage Already exists');
        //   this.modalService.dismissAll();
        //   return;

        // }
        // else {

          this.dataServ.addstagedata(this.addstageForm.value).subscribe(
            res => {
              console.log(res);
              this.getstagedata();
              // this.getUsersData();
              this.submitted = false;
              this.addstageForm.reset();
              this.modalService.dismissAll();
            },
            error => {
              this.addstageForm.reset();
              this.submitted = false;
            });
        }
      // }
    }

  }
  getstagedata() {
    this.dataServ.getstagedata().subscribe(res => {
      this.stageData = res.data;
      console.log(this.stageData);
      this.dataSource = new MatTableDataSource(this.stageData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.stageData);
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

        this.deletestagedata(index);
      }
    })
  }

  deletestagedata(index) {
    this.dataServ.deletestagedata(index).subscribe(
      res => {
        this.getstagedata();
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
  pdfMake() {
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
}
